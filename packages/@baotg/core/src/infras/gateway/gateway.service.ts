import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import Queue from 'bull';
import * as bodyParser from 'body-parser';
import { DEFAULT_GATEWAY_PORT, GatewayConfig } from './gateway.config';
import { join } from 'path';
import * as csurf from 'csurf';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export class GatewayService {
  static async bootstrap(app: NestExpressApplication) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (!gatewayConfig) return;

    const logger = new Logger('GatewayService');

    app.setGlobalPrefix(gatewayConfig.contextPath);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    GatewayService.setupSecurity(app);
    GatewayService.setupSwagger(app);
    GatewayService.setupValidationPipe(app);
    GatewayService.setUpBullBoard(app);
    GatewayService.setUpViewEngine(app);

    const port = gatewayConfig.port ?? DEFAULT_GATEWAY_PORT;
    await app.listen(port, () => logger.log(`Gateway is listening on port ${port}`));
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
    if (gatewayConfig.csrf) {
      app.use(csurf());
    }
    app.enableCors();
  }

  private static setupSwagger(app: NestExpressApplication) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig.swagger === 'off') {
      return;
    }

    const { description } = config.get('swagger') ?? {};
    const _description = description ?? config.get('description');
    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(`${config.get('description')} API`)
      .setDescription(_description)
      .setVersion(`${config.get('version')}`)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document, { swaggerUrl: 'swagger' });
  }

  private static setUpViewEngine(app: NestExpressApplication) {
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
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

  private static setupValidationPipe(app: NestExpressApplication) {
    const config = app.get(ConfigService);
    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig?.pipes && gatewayConfig?.pipes !== 'off') {
      const defaultPipe: ValidationPipeOptions = { transform: true, whitelist: true, forbidNonWhitelisted: true };
      app.useGlobalPipes(new ValidationPipe({ ...defaultPipe, ...gatewayConfig.pipes }));
    }
  }
}
