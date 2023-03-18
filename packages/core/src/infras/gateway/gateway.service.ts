import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import Queue from 'bull';
import * as bodyParser from 'body-parser';
import { DEFAULT_GATEWAY_PORT, GatewayConfig } from './gateway.config';
import { join } from 'path';
import csurf from 'csurf';
import { GatewayExceptionsFilter } from '../../exceptions';
import { LogService } from '../../log';
import { toBool, toInt } from '../../utils';
import { BaseValidationPipe } from '../../validation';
import { ResponseInterceptor } from '../../interceptors';
import { GlobalOptions } from '../../base';

export class GatewayService {
  static async bootstrap(app: NestExpressApplication, opts?: GlobalOptions) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (!gatewayConfig) return;

    const logger = await app.resolve(LogService);
    logger.setContext(GatewayService.name);

    app.useGlobalInterceptors(new ResponseInterceptor(), ...opts?.interceptors);
    app.useGlobalFilters(new GatewayExceptionsFilter(logger), ...opts?.filters);
    app.useGlobalPipes(new BaseValidationPipe(gatewayConfig.pipes), ...opts?.pipes);

    app.setGlobalPrefix(gatewayConfig.contextPath);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    GatewayService.setupSwagger(app);
    GatewayService.setUpBullBoard(app);
    GatewayService.setUpViewEngine(app);
    GatewayService.setupSecurity(app);

    const gatewayName = config.get('description') || 'Gateway';
    const port = toInt(gatewayConfig.port, DEFAULT_GATEWAY_PORT);
    await app.listen(port, () => logger.info(`%s is listening on port %s`, gatewayName, port));
  }

  private static setupSwagger(app: NestExpressApplication) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig.swagger === 'off') return;

    const port = toInt(gatewayConfig.port, DEFAULT_GATEWAY_PORT);
    const swagger = {
      description: gatewayConfig.swagger?.description || config.get('description'),
      version: gatewayConfig.swagger?.version || config.get('version'),
      baseHost: gatewayConfig.swagger?.baseHost || `localhost:${port}`,
      useSSL: toBool(gatewayConfig.swagger?.useSSL, false),
    };

    const options = new DocumentBuilder()
      .setTitle(`${swagger.description} API`)
      .setDescription(swagger.description)
      .setVersion(`${swagger.version}`)
      .addServer(`http://${swagger.baseHost}`)
      .addBearerAuth();

    if (swagger.useSSL) options.addServer(`https://${swagger.baseHost}`);

    const document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('swagger', app, document, {
      swaggerUrl: 'swagger',
      swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }

  private static setUpBullBoard(app: NestExpressApplication) {
    const config = app.get(ConfigService);
    const { host, port, queue, password } = config.get('bull') ?? {};

    const queues = queue?.map(q => {
      return new BullMQAdapter(new Queue(q, { redis: { host, port, password } }));
    });

    if (host && queues?.length) {
      const serverAdapter = new ExpressAdapter();
      serverAdapter.setBasePath('/bulls');
      createBullBoard({ queues, serverAdapter });
      app.use('/bulls', serverAdapter.getRouter());
    }
  }

  private static setUpViewEngine(app: NestExpressApplication) {
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
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
  }
}
