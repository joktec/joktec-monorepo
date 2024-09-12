import path from 'path';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import Queue from 'bull';
import csurf from 'csurf';
import { NextFunction } from 'express';
import basicAuth from 'express-basic-auth';
import { lookup } from 'geoip-lite';
import helmet from 'helmet';
import requestIp from 'request-ip';
import UAParser from 'ua-parser-js';
import { ApplicationMiddlewareFactory, resolveMiddleware } from '../../base';
import { SwaggerConfig, SwaggerSecurity } from '../../decorators';
import { ExpressRequest, ExpressResponse, HttpRequestHeader } from '../../models';
import { BullConfig, ConfigService, LogService } from '../../modules';
import { joinUrl } from '../../utils';
import { GatewayConfig } from './gateway.config';

export class GatewayFactory {
  static async bootstrap(app: NestExpressApplication, middlewares: ApplicationMiddlewareFactory = {}): Promise<void> {
    const configService = app.get(ConfigService);
    const logService = await app.resolve(LogService);
    logService.setContext(GatewayFactory.name);

    const gatewayConfig = configService.parseOrThrow(GatewayConfig, 'gateway');
    const { port, contextPath } = gatewayConfig;

    app.setGlobalPrefix(contextPath);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use((req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      const ipAddress = requestIp.getClientIp(req);
      req.geoIp = { ipAddress, ...lookup(ipAddress) };
      req.userAgent = new UAParser(req.headers['user-agent'] || '').getResult();
      next();
    });

    app.useGlobalGuards(...(await resolveMiddleware(app, middlewares?.guards)));
    app.useGlobalPipes(...(await resolveMiddleware(app, middlewares?.pipes)));
    app.useGlobalInterceptors(...(await resolveMiddleware(app, middlewares?.interceptors)));
    app.useGlobalFilters(...(await resolveMiddleware(app, middlewares?.filters)));

    const useSwagger = GatewayFactory.setupSwagger(app);
    const useBullBoard = GatewayFactory.setUpBullBoard(app);
    GatewayFactory.setUpViewEngine(app);
    GatewayFactory.setupSecurity(app);

    if (middlewares.beforeInit) await middlewares.beforeInit(app);

    const gatewayName = configService.get('description', 'Gateway');
    await app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      logService.info(`🚀 Application %s is running on %s`, gatewayName, joinUrl(baseUrl, { paths: [contextPath] }));

      if (useSwagger) {
        const swagger = configService.parse(SwaggerConfig, 'gateway.swagger');
        logService.info(`📕️ Access API Document at %s`, joinUrl(baseUrl, { paths: [contextPath, swagger.path] }));
      }

      if (useBullBoard) {
        const bull = configService.parse(BullConfig, 'bull');
        logService.info(
          `🎯 Access bull dashboard at %s. Make sure Redis is running by default`,
          joinUrl(baseUrl, { paths: [contextPath, bull.board.path] }),
        );
      }
    });

    if (middlewares.afterInit) await middlewares.afterInit(app);
  }

  private static setupSwagger(app: NestExpressApplication): boolean {
    const configService = app.get(ConfigService);
    const gatewayConfig = configService.parse(GatewayConfig, 'gateway');
    if (!gatewayConfig.swagger.enable) return false;

    const { swagger } = gatewayConfig;
    const options = new DocumentBuilder()
      .setTitle(swagger.title || configService.get('name'))
      .setDescription(swagger.description || configService.get('description'))
      .setVersion(swagger.version || configService.get('version'))
      .setLicense(swagger.license?.name, swagger.license?.url)
      .addServer(swagger.server || `http://localhost:${gatewayConfig.port}`);

    swagger.security?.map(security => {
      if (security === SwaggerSecurity.BASIC) options.addBasicAuth();
      if (security === SwaggerSecurity.BEARER) options.addBearerAuth();
      if (security === SwaggerSecurity.OAUTH2) options.addOAuth2();
      if (security === SwaggerSecurity.COOKIE) options.addCookieAuth('optional-session-id');
      if (security === SwaggerSecurity.APIKEY) {
        options.addApiKey(
          { type: 'apiKey', in: 'header', name: HttpRequestHeader.X_API_KEY },
          HttpRequestHeader.X_API_KEY,
        );
      }
    });

    const { enable, username, password } = swagger.auth;
    if (enable && username && password) {
      app.use(`/${swagger.path}`, basicAuth({ challenge: true, users: { [username]: password } }));
    }

    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup(swagger.path, app, document, {
      swaggerUrl: swagger.path,
      swaggerOptions: {
        ...swagger.options,
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });

    return true;
  }

  private static setUpBullBoard(app: NestExpressApplication): boolean {
    const configService = app.get(ConfigService);
    const bull = configService.parse(BullConfig, 'bull');

    const queues = bull.queue?.map(q => {
      const { host, port, password } = bull;
      return new BullMQAdapter(new Queue(q, { redis: { host, port, password } }));
    });

    if (bull.board?.enable && queues?.length) {
      const { path, username, password } = bull.board;
      if (username && password) {
        app.use(path, basicAuth({ challenge: true, users: { [username]: password } }));
      }

      const serverAdapter = new ExpressAdapter();
      serverAdapter.setBasePath(path);
      createBullBoard({ queues, serverAdapter });
      app.use(path, serverAdapter.getRouter());

      return true;
    }

    return false;
  }

  private static setUpViewEngine(app: NestExpressApplication) {
    const configService = app.get(ConfigService);
    const gatewayConfig = configService.parse(GatewayConfig, 'gateway');
    if (!gatewayConfig?.static) return false;

    const { staticPath, viewPath } = gatewayConfig.static;
    app.useStaticAssets(path.resolve(staticPath), { prefix: 'public' });
    app.setBaseViewsDir(path.resolve(viewPath));
    app.setViewEngine('hbs');
    return true;
  }

  /**
   * Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious exploit of a website
   * where unauthorized commands are transmitted from a user that the web application trusts.
   * To mitigate this kind of attack you can use the csurf package.
   * @private
   */
  private static setupSecurity(app: NestExpressApplication) {
    const configService = app.get(ConfigService);
    const gatewayConfig = configService.parse(GatewayConfig, 'gateway');
    if (gatewayConfig?.csrf) app.use(csurf());
    if (gatewayConfig?.cors) app.enableCors(gatewayConfig.cors);
    if (gatewayConfig?.helmet) app.use(helmet(gatewayConfig.helmet));
    return true;
  }
}
