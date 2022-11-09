import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule, RedisCacheService } from '@jobhopin/core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './modules/auth';
import { MigrationModule } from './modules/migration/migration.module';
import { BlogModule } from './modules/blog/blog.module';
import { MiscModule } from './modules/misc/misc.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { LocationModule } from './modules/location/location.module';
import { ThumbdownReasonModule } from './modules/thumdown-reason/thumdown-reason.module';
import { CvTemplateModule } from './modules/cv-template/cv-template.module';
import { CommonModule } from './modules/common/common.module';
import { CityModule } from './modules/city/city.module';
import { OrganizationDataloader } from './modules/misc/data-loaders/organization.dataloader';
import { Context } from 'apollo-server-core';
@Module({
  imports: [
    // limit to 500 request per mins
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 500,
    // }),
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [
        AuthModule,
        BlogModule,
        MiscModule,
        CityModule,
        MarketingModule,
        LocationModule,
        ThumbdownReasonModule,
        CvTemplateModule,
        CommonModule,
      ],
      useFactory: (organizationDataLoader: OrganizationDataloader) => {
        return {
          playground: true,
          autoSchemaFile: true,
          introspection: true,
          context: (): Context => {
            return {
              loaders: {
                organization: organizationDataLoader.getLoader(),
              },
            };
          },
        };
      },
      inject: [OrganizationDataloader],
    }),
    HealthModule,
    AuthModule,
    BlogModule,
    MigrationModule,
    MiscModule,
    CityModule,
    MarketingModule,
    LocationModule,
    ThumbdownReasonModule,
    CvTemplateModule,
    CommonModule,
  ],
  controllers: [],
  providers: [RedisCacheService],
})
export class AppModule {}
