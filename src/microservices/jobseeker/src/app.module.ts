import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobseekerModule } from './modules/jobseeker/jobseeker.module';
import { JobseekerActivityDateModule } from './modules/jobseeker_activity_date/jobseeker_activity_date.module';
import { JobseekerAddressGPlaceModule } from './modules/jobseeker_address_g_place/jobseeker_address_g_place.module';
import { JobseekerAwardModule } from './modules/jobseeker_award/jobseeker_award.module';
import { JobseekerCareerInterestCardModule } from './modules/jobseeker_career_interest_card/jobseeker_career_interest_card.module';
import { JobseekerCityModule } from './modules/jobseeker_city/jobseeker_city.module';
import { JobseekerCrawlerModule } from './modules/jobseeker_crawler/jobseeker_crawler.module';
import { JobseekerCvModule } from './modules/jobseeker_cv/jobseeker_cv.module';
import { JobseekerCvEmailSegmentModule } from './modules/jobseeker_cv_email_segment/jobseeker_cv_email_segment.module';
import { JobseekerDirectlyApplyModule } from './modules/jobseeker_directly_apply/jobseeker_directly_apply.module';
import { JobseekerDistrictModule } from './modules/jobseeker_district/jobseeker_district.module';
import { JobseekerEducationModule } from './modules/jobseeker_education/jobseeker_education.module';
import { JobseekerEmailSegmentModule } from './modules/jobseeker_email_segment/jobseeker_email_segment.module';
import { JobseekerEntityViewModule } from './modules/jobseeker_entity_view/jobseeker_entity_view.module';
import { JobseekerFollowedOrganizationsModule } from './modules/jobseeker_followed_organizations/jobseeker_followed_organizations.module';
import { JobseekerIndustryModule } from './modules/jobseeker_industry/jobseeker_industry.module';
import { JobseekerInterestModule } from './modules/jobseeker_interest/jobseeker_interest.module';
import { JobseekerJobAlertModule } from './modules/jobseeker_job_alert/jobseeker_job_alert.module';
import { JobseekerJobExpectedModule } from './modules/jobseeker_job_expected/jobseeker_job_expected.module';
import { JobseekerJobFunctionModule } from './modules/jobseeker_job_function/jobseeker_job_function.module';
import { JobseekerJobReferralModule } from './modules/jobseeker_job_referral/jobseeker_job_referral.module';
import { JobseekerJobSavedModule } from './modules/jobseeker_job_saved/jobseeker_job_saved.module';
import { JobseekerJobTypeModule } from './modules/jobseeker_job_type/jobseeker_job_type.module';
import { JobseekerLanguageModule } from './modules/jobseeker_language/jobseeker_language.module';
import { JobseekerLevelExpectedModule } from './modules/jobseeker_level_expected/jobseeker_level_expected.module';
import { JobseekerLocationModule } from './modules/jobseeker_location/jobseeker_location.module';
import { JobseekerMarketValueModule } from './modules/jobseeker_market_value/jobseeker_market_value.module';
import { JobseekerMatchscoreModule } from './modules/jobseeker_matchscore/jobseeker_matchscore.module';
import { JobseekerRecommendationJobsModule } from './modules/jobseeker_recommendation_jobs/jobseeker_recommendation_jobs.module';
import { JobseekerReferenceModule } from './modules/jobseeker_reference/jobseeker_reference.module';
import { JobseekerSegmentRoutineModule } from './modules/jobseeker_segment_routine/jobseeker_segment_routine.module';
import { JobseekerSkillModule } from './modules/jobseeker_skill/jobseeker_skill.module';
import { JobseekerTitlecaseModule } from './modules/jobseeker_titlecase/jobseeker_titlecase.module';
import { JobseekerWorkExperienceModule } from './modules/jobseeker_work_experience/jobseeker_work_experience.module';
import { JobseekerViewProfileModule } from './modules/jobseeker_view_profile/jobseeker_view_profile.module';
import { JobseekerVerifyAccountFileModule } from './modules/jobseeker_verify_account_file/jobseeker_verify_account_file.module';
import { JobseekerVerifyAccountModule } from './modules/jobseeker_verify_account/jobseeker_verify_account.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.JOBSEEKER_SERVICE_MONGODB_URL),
    HealthModule,
    JobseekerModule,
    JobseekerActivityDateModule,
    JobseekerAddressGPlaceModule,
    JobseekerAwardModule,
    JobseekerCareerInterestCardModule,
    JobseekerCityModule,
    JobseekerCrawlerModule,
    JobseekerCvModule,
    JobseekerCvEmailSegmentModule,
    JobseekerDirectlyApplyModule,
    JobseekerDistrictModule,
    JobseekerEducationModule,
    JobseekerEmailSegmentModule,
    JobseekerEntityViewModule,
    JobseekerFollowedOrganizationsModule,
    JobseekerIndustryModule,
    JobseekerInterestModule,
    JobseekerJobAlertModule,
    JobseekerJobExpectedModule,
    JobseekerJobFunctionModule,
    JobseekerJobReferralModule,
    JobseekerJobSavedModule,
    JobseekerJobTypeModule,
    JobseekerLanguageModule,
    JobseekerLevelExpectedModule,
    JobseekerLocationModule,
    JobseekerMarketValueModule,
    JobseekerMatchscoreModule,
    JobseekerRecommendationJobsModule,
    JobseekerReferenceModule,
    JobseekerSegmentRoutineModule,
    JobseekerSkillModule,
    JobseekerTitlecaseModule,
    JobseekerVerifyAccountModule,
    JobseekerVerifyAccountFileModule,
    JobseekerViewProfileModule,
    JobseekerWorkExperienceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
