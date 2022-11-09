import { JobSeekerCareerInterestCardResolver } from './resolvers/jobseeker-career-interest-card.resolver';
import { JobseekerMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { JobSeekerController } from './controllers/jobseeker.controller';
import { JobSeekerActivityDateResolver } from './resolvers/jobseeker-activity-date.resolver';
import { JobSeekerAddressGPlaceResolver } from './resolvers/jobseeker-address-g-place.resolver';
import { JobSeekerAwardResolver } from './resolvers/jobseeker-award.resolver';
import { JobSeekerResolver } from './resolvers/jobseeker.resolver';
import { JobSeekerCrawlerResolver } from './resolvers/jobseeker-crawler.resolver';
import { JobSeekerCvEmailSegmentResolver } from './resolvers/jobseeker-cv-email-segment.resolver';
import { JobSeekerCvResolver } from './resolvers/jobseeker-cv.resolver';
import { JobSeekerDirectlyApplyResolver } from './resolvers/jobseeker-directly-apply.resolver';
import { JobSeekerDistrictResolver } from './resolvers/jobseeker-district.resolver';
import { JobSeekerEducationResolver } from './resolvers/jobseeker-education.resolver';
import { JobSeekerEmailSegmentResolver } from './resolvers/jobseeker-email-segment.resolver';
import { JobSeekerEntityViewResolver } from './resolvers/jobseeker-entity-view.resolver';
import { JobSeekerFollowedOrganizationResolver } from './resolvers/jobseeker-followed-organizations.resolver';
import { JobSeekerIndustryResolver } from './resolvers/jobseeker-industry.resolver';
import { JobSeekerInterestResolver } from './resolvers/jobseeker-interest.resolver';
import { JobSeekerJobAlertResolver } from './resolvers/jobseeker-job-alert.resolver';
import { JobSeekerJobExpectedResolver } from './resolvers/jobseeker-job-expected.resolver';
import { JobSeekerJobFunctionResolver } from './resolvers/jobseeker-job-function.resolver';
import { JobSeekerJobReferralResolver } from './resolvers/jobseeker-job-referral.resolver';
import { JobSeekerJobSavedResolver } from './resolvers/jobseeker-job-saved.resolver';
import { JobSeekerJobTypeResolver } from './resolvers/jobseeker-job-type.resolver';
import { JobSeekerLanguageResolver } from './resolvers/jobseeker-language.resolver';
import { JobSeekerLevelExpectedResolver } from './resolvers/jobseeker-level-expected.resolver';
import { JobSeekerLocationResolver } from './resolvers/jobseeker-location.resolver';
import { JobSeekerMarketValueResolver } from './resolvers/jobseeker-market-value.resolver';
import { JobSeekerMatchScoreResolver } from './resolvers/jobseeker-match-score.resolver';
import { JobSeekerRecommendationJobsResolver } from './resolvers/jobseeker-recommendation-jobs.resolver';
import { JobSeekerReferenceResolver } from './resolvers/jobseeker-reference.resolver';
import { JobSeekerSegmentRoutineResolver } from './resolvers/jobseeker-segment-routine.resolver';
import { JobSeekerSkillResolver } from './resolvers/jobseeker-skill.resolver';
import { JobSeekerTitleCaseResolver } from './resolvers/jobseeker-title-case.resolver';
import { JobSeekerVerifyAccountFileResolver } from './resolvers/jobseeker-verify-account-file.resolver';
import { JobSeekerVerifyAccountResolver } from './resolvers/jobseeker-verify-account.resolver';
import { JobSeekerViewProfileResolver } from './resolvers/jobseeker-view-profile.resolver';
import { JobSeekerWorkExperienceResolver } from './resolvers/jobseeker-work-experience.resolver';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: jobSeekerMicroserviceConfig.name,
        ...jobSeekerMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],

  providers: [
    JobSeekerResolver,
    JobSeekerActivityDateResolver,
    JobSeekerAddressGPlaceResolver,
    JobSeekerAwardResolver,
    JobSeekerCareerInterestCardResolver,
    JobSeekerCrawlerResolver,
    JobSeekerCvEmailSegmentResolver,
    JobSeekerCvResolver,
    JobSeekerDirectlyApplyResolver,
    JobSeekerDistrictResolver,
    JobSeekerEducationResolver,
    JobSeekerEmailSegmentResolver,
    JobSeekerEntityViewResolver,
    JobSeekerFollowedOrganizationResolver,
    JobSeekerIndustryResolver,
    JobSeekerInterestResolver,
    JobSeekerJobAlertResolver,
    JobSeekerJobExpectedResolver,
    JobSeekerJobFunctionResolver,
    JobSeekerJobReferralResolver,
    JobSeekerJobSavedResolver,
    JobSeekerJobTypeResolver,
    JobSeekerLanguageResolver,
    JobSeekerLevelExpectedResolver,
    JobSeekerLocationResolver,
    JobSeekerMarketValueResolver,
    JobSeekerMatchScoreResolver,
    JobSeekerRecommendationJobsResolver,
    JobSeekerReferenceResolver,
    JobSeekerSegmentRoutineResolver,
    JobSeekerSkillResolver,
    JobSeekerTitleCaseResolver,
    JobSeekerVerifyAccountFileResolver,
    JobSeekerVerifyAccountResolver,
    JobSeekerViewProfileResolver,
    JobSeekerWorkExperienceResolver,
  ],
  controllers: [JobSeekerController],
})
export class JobSeekerModule {}
