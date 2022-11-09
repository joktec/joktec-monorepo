import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CandidateModule } from './modules/candidate/candidate.module';
import { RecruiterModule } from './modules/recruiter/recruiter.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule, RedisCacheService } from '@jobhopin/core';
import { AuthenticationContext } from './authentication';
import { Context } from 'apollo-server-core';
import { AuthenticationError } from 'apollo-server-express';
import { GoogleAPIModule } from './modules/google-api/google-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [CandidateModule, RecruiterModule],
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
      inject: [],
    }),
    ConfigModule.forRoot(),
    HealthModule,
    CandidateModule,
    RecruiterModule,
    GoogleAPIModule,
  ],
  controllers: [AppController],
  providers: [RedisCacheService],
})
export class AppModule {}
