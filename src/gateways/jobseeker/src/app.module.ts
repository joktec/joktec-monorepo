import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GamificationLuckySpinModule } from './modules/gamification-lucky-spin/gamification-lucky-spin.module';
import { GamificationQuizzModule } from './modules/gamification-quizz/gamification-quizz.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule, QuizzMicroserviceConfig } from '@jobhopin/core';
import { JobSeekerModule } from './modules/jobseeker/jobseeker.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { JobModule } from './modules/job/job.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CvModule } from './modules/cv/cv.module';
import { InterviewModule } from './modules/interview/interview.module';
import { MarketInsightModule } from './modules/market-insight/MarketInsight.module';
import { QuizzCategoryDataloader } from './modules/gamification-quizz/data-loaders/quizz-category.dataloader';
import { ClientsModule } from '@nestjs/microservices';
import { AuthenticationContext } from './authentication';
import { Context } from 'apollo-server-core';
import { AuthenticationError } from 'apollo-server-express';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: quizzMicroserviceConfig.name,
        ...quizzMicroserviceConfig.microserviceOptions,
      },
    ]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [
        GamificationQuizzModule,
        GamificationLuckySpinModule,
        JobModule,
        JobSeekerModule,
        OrganizationModule,
        CandidateModule,
        NotificationModule,
        CvModule,
        InterviewModule,
        MarketInsightModule,
      ],
      useFactory: (quizzCategoryDataLoader: QuizzCategoryDataloader) => {
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
            return {
              loaders: {
                quizzCategory: quizzCategoryDataLoader.getLoader(),
              },
            };
          },
        };
      },
      inject: [QuizzCategoryDataloader],
    }),
    HealthModule,
    GamificationQuizzModule,
    GamificationLuckySpinModule,
    JobSeekerModule,
    OrganizationModule,
    JobModule,
    CandidateModule,
    NotificationModule,
    CvModule,
    InterviewModule,
    MarketInsightModule,
  ],
  controllers: [AppController],
  providers: [QuizzCategoryDataloader],
})
export class AppModule { }
