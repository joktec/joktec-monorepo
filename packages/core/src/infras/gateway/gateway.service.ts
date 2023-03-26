import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import Queue from 'bull';
import * as bodyParser from 'body-parser';
import { DEFAULT_GATEWAY_PORT, GatewayConfig } from './gateway.config';
import path from 'path';
import csurf from 'csurf';
import { ConfigService } from '../../config';
import { GatewayExceptionsFilter } from '../../exceptions';
import { LogService } from '../../log';
import { joinUrl, toArray, toInt } from '../../utils';
import { BaseValidationPipe } from '../../validation';
import { ResponseInterceptor, TrackInterceptor } from '../../interceptors';
import { GlobalOptions } from '../../base';

export class GatewayService {
  static async bootstrap(app: NestExpressApplication, opts?: GlobalOptions) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (!gatewayConfig) return;

    const logger = await app.resolve(LogService);
    logger.setContext(GatewayService.name);

    app.useGlobalInterceptors(new TrackInterceptor(), new ResponseInterceptor(), ...toArray(opts?.interceptors));
    app.useGlobalFilters(new GatewayExceptionsFilter(logger), ...toArray(opts?.filters));
    app.useGlobalPipes(new BaseValidationPipe(gatewayConfig.pipes), ...toArray(opts?.pipes));

    const contextPath = gatewayConfig.contextPath || '';
    app.setGlobalPrefix(contextPath);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    GatewayService.setupSwagger(app);
    GatewayService.setUpBullBoard(app);
    GatewayService.setUpViewEngine(app);
    GatewayService.setupSecurity(app);

    const gatewayName = config.get('description') || 'Gateway';
    const port = toInt(gatewayConfig.port, DEFAULT_GATEWAY_PORT);
    await app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      logger.info(`🚀 Application %s is running on %s`, gatewayName, joinUrl(baseUrl, contextPath));
      if (gatewayConfig.swagger !== 'off') {
        logger.info(`🗒️ Access API Document at %s`, joinUrl(baseUrl, contextPath, 'swagger'));
      }
    });
  }

  private static setupSwagger(app: NestExpressApplication): boolean {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig.swagger === 'off') return false;

    const port = toInt(gatewayConfig.port, DEFAULT_GATEWAY_PORT);
    const options = new DocumentBuilder()
      .setTitle(gatewayConfig.swagger?.title || config.get('name'))
      .setDescription(gatewayConfig.swagger?.description || config.get('description'))
      .setVersion(gatewayConfig.swagger?.version || config.get('version'))
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .setContact('JokTec', 'https://github.com/joktec/joktec-monorepo.git', 'trangiabao1203@gmail.com')
      .addServer(gatewayConfig.swagger?.server || `http://localhost:${port}`)
      .addBearerAuth();

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
    return true;
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
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    app.useStaticAssets(path.resolve(gatewayConfig.staticPath || './public'), { prefix: 'public' });
    app.setBaseViewsDir(path.resolve(gatewayConfig.viewPath || './views'));
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
