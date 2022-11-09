import { Context } from 'apollo-server-core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule } from '@baotg/core';

import {
  SourceModule,
  CountryModule,
  CityModule,
  DistrictModule,
  DegreeModule,
  UniversityModule,
  DepartmentModule,
  SettingModule,
  SkillModule,
  BannerModule,
  IndustryModule,
  PlatformModule,
  MarketingBannerModule,
  MarketingKeywordModule,
  MarketingSeoKeywordModule,
  UserModule,
} from '@app/modules';
import { AuthenticationContext } from './authentication';
import { AuthenticationError } from 'apollo-server-express';

@Module({
  imports: [
    // * Graphql
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,

      imports: [
        BannerModule,
        CountryModule,
        CityModule,
        DegreeModule,
        DepartmentModule,
        DistrictModule,
        IndustryModule,
        MarketingBannerModule,
        MarketingKeywordModule,
        MarketingSeoKeywordModule,
        PlatformModule,
        SettingModule,
        SkillModule,
        SourceModule,
        UniversityModule,
      ],
      useFactory: () => {
        return {
          playground: true,
          autoSchemaFile: true,
          introspection: true,
          context: ({ req, connection }): Context => {
            const context = connection ? connection.context : req;
            try {
              AuthenticationContext(context);
            } catch (error) {
              throw new AuthenticationError(error);
            }
            return {};
          },
        };
      },
    }),

    // * Restful API
    HealthModule,
    SourceModule,
    CountryModule,
    CityModule,
    DistrictModule,
    DegreeModule,
    UniversityModule,
    DepartmentModule,
    SettingModule,
    SkillModule,
    BannerModule,
    IndustryModule,
    PlatformModule,
    MarketingBannerModule,
    MarketingKeywordModule,
    MarketingSeoKeywordModule,

    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
