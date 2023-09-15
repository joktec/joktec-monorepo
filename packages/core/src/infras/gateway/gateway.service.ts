import path from 'path';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import Queue from 'bull';
import csurf from 'csurf';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { ExpressRequest, ExpressResponse, GlobalOptions } from '../../base';
import { BullConfig } from '../../bull';
import { ConfigService } from '../../config';
import { LogService } from '../../log';
import { SwaggerConfig } from '../../swagger';
import { joinUrl, parseUA, toArray, toInt } from '../../utils';
import { DEFAULT_GATEWAY_PORT, GatewayConfig } from './gateway.config';
import { NextFunction } from 'express';
import { lookup } from 'geoip-lite';
import requestIp from 'request-ip';

export class GatewayService {
  static async bootstrap(app: NestExpressApplication, opts?: GlobalOptions) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (!gatewayConfig) return;

    const logger = await app.resolve(LogService);
    logger.setContext(GatewayService.name);

    const contextPath = gatewayConfig.contextPath || '';
    app.setGlobalPrefix(contextPath);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use((req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      const ipAddress = requestIp.getClientIp(req);
      req.userAgent = parseUA(req.headers['user-agent'] || '');
      req.geoIp = { ipAddress, ...lookup(ipAddress) };
      next();
    });

    app.useGlobalGuards(...toArray(opts?.guards));
    app.useGlobalPipes(...toArray(opts?.pipes));
    app.useGlobalInterceptors(...toArray(opts?.interceptors));
    app.useGlobalFilters(...toArray(opts?.filters));

    const useSwagger = GatewayService.setupSwagger(app);
    const useBullBoard = GatewayService.setUpBullBoard(app);
    GatewayService.setUpViewEngine(app);
    GatewayService.setupSecurity(app);

    const gatewayName = config.get('description') || 'Gateway';
    const port = toInt(gatewayConfig.port, DEFAULT_GATEWAY_PORT);
    await app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      logger.info(`🚀 Application %s is running on %s`, gatewayName, joinUrl(baseUrl, { paths: [contextPath] }));

      if (useSwagger) {
        const swagger = config.parse(SwaggerConfig, 'gateway.swagger');
        logger.info(`📕️ Access API Document at %s`, joinUrl(baseUrl, { paths: [contextPath, swagger.path] }));
      }

      if (useBullBoard) {
        const bull = config.parse(BullConfig, 'bull');
        logger.info(
          `🎯 Access bull dashboard at %s. Make sure Redis is running by default`,
          joinUrl(baseUrl, { paths: [contextPath, bull.board.path] }),
        );
      }
    });
  }

  private static setupSwagger(app: NestExpressApplication): boolean {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig.swagger === 'off') return false;

    const swagger = new SwaggerConfig(gatewayConfig.swagger);
    const port = toInt(gatewayConfig.port, DEFAULT_GATEWAY_PORT);
    const options = new DocumentBuilder()
      .setTitle(swagger.title || config.get('name'))
      .setDescription(swagger.description || config.get('description'))
      .setVersion(swagger.version || config.get('version'))
      .setLicense(swagger.license?.name, swagger.license?.url)
      .addServer(swagger.server || `http://localhost:${port}`)
      .addBearerAuth();

    const { username, password } = swagger.auth;
    if (username && password) {
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
    const config = app.get(ConfigService);
    const bull = config.parse(BullConfig, 'bull');

    const queues = bull.queue?.map(q => {
      const { host, port, password } = bull;
      return new BullMQAdapter(new Queue(q, { redis: { host, port, password } }));
    });

    if (bull.board && queues?.length) {
      const { path, username, password } = bull.board;
      if (username && password) {
        app.use(`/${path}`, basicAuth({ challenge: true, users: { [username]: password } }));
      }

      const serverAdapter = new ExpressAdapter();
      serverAdapter.setBasePath(`/${path}`);
      createBullBoard({ queues, serverAdapter });
      app.use(`/${path}`, serverAdapter.getRouter());

      return true;
    }

    return false;
  }

  private static setUpViewEngine(app: NestExpressApplication) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    const { staticPath = './public', viewPath = './views' } = gatewayConfig.static || {};
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
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig.csrf) app.use(csurf());
    if (gatewayConfig.cors) app.enableCors(gatewayConfig.cors);
    if (gatewayConfig.helmet) app.use(helmet(gatewayConfig.helmet));
    return true;
  }
}
