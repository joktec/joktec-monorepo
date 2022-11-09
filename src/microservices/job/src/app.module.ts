import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule, RedisCacheService } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './modules/job/job.module';
import { JobAiLysisModule } from './modules/job-ai-lysis/job-ai-lysis.module';
import { JobBoardApplyLogModule } from './modules/job-board-apply-log/job-board-apply-log.module';
import { JobBountyModule } from './modules/job-bounty/job-bounty.module';
import { JobBountyHistoryModule } from './modules/job-bounty-history/job-bounty-history.module';
import { JobBudgetModule } from './modules/job-budget/job-budget.module';
import { JobBudgetHistoryModule } from './modules/job-budget-history/job-budget-history.module';
import { JobBudgetLogModule } from './modules/job-budget-log/job-budget-log.module';
import { JobBudgetRequestModule } from './modules/job-budget-request/job-budget-request.module';
import { JobBudgetRequestAddedModule } from './modules/job-budget-request-added/job-budget-request-added.module';
import { JobBudgetSuggestInfoModule } from './modules/job-budget-suggest-info/job-budget-suggest-info.module';
import { JobCategoryModule } from './modules/job-category/job-category.module';
import { JobFavoriteModule } from './modules/job-favorite/job-favorite.module';
import { JobInterviewModule } from './modules/job-interview/job-interview.module';
import { JobInterviewCategoryModule } from './modules/job-interview-category/job-interview-category.module';
import { JobInterviewCsInChargeModule } from './modules/job-interview-cs-in-charge/job-interview-cs-in-charge.module';
import { JobLikeModule } from './modules/job-like/job-like.module';
import { JobLinkModule } from './modules/job-link/job-link.module';
import { JobSalaryTemplateModule } from './modules/job-salary-template/job-salary-template.module';
import { JobScoreModule } from './modules/job-score/job-score.module';
import { JobSearchModule } from './modules/job-search/job-search.module';
import { JobSearchQuotaModule } from './modules/job-search-quota/job-search-quota.module';
import { JobStatsModule } from './modules/job-stats/job-stats.module';
import { JobStatsDetailModule } from './modules/job-stats-detail/job-stats-detail.module';
import { JobSubscriptionHistoryModule } from './modules/job-subscription-history/job-subscription-history.module';
import { JobTemplateModule } from './modules/job-template/job-template.module';
import { JobTemplatesModule } from './modules/job-templates/job-templates.module';
import { JobThumdownReasonModule } from './modules/job-thumdown-reason/job-thumdown-reason.module';
import { JobTitleModule } from './modules/job-title/job-title.module';
import { JobTitleSalaryRangeModule } from './modules/job-title-salary-range/job-title-salary-range.module';
import { JobTypeModule } from './modules/job-type/job-type.module';
import { JobVersionModule } from './modules/job-version/job-version.module';
import { JobViewModule } from './modules/job-view/job-view.module';
import { JobViewRawModule } from './modules/job-view-raw/job-view-raw.module';
import { JobGroupModule } from './modules/jobgroup/jobgroup.module';
import { JobGroupBurntCreditsModule } from './modules/jobgroup-burnt-credits/jobgroup-burnt-credits.module';
import { JobGroupJobsModule } from './modules/jobgroup-jobs/jobgroup-jobs.module';
import { JobhopBlacklistDomainModule } from './modules/jobhop-blacklistdomain/jobhop-blacklistdomain.module';
import { JobhopEmailHistoryModule } from './modules/jobhop-emailhistory/jobhop-emailhistory.module';
import { JobhopFptoLadipageLogModule } from './modules/jobhop-fptoladipagelog/jobhop-fptoladipagelog.module';
import { JobhopGenericDomainModule } from './modules/jobhop-genericdomain/jobhop-genericdomain.module';
import { JobhopInternalUserEmailModule } from './modules/jobhop-internaluseremail/jobhop-internaluseremail.module';
import { JobhopJobAtsActivityModule } from './modules/jobhop-jobatsactivity/jobhop-jobatsactivity.module';
import { JobhopJobCategoryModule } from './modules/jobhop-jobcategory/jobhop-jobcategory.module';
import { JobhopJobDefaultImageModule } from './modules/jobhop-jobdefaultimage/jobhop-jobdefaultimage.module';
import { JobhopJobLocationModule } from './modules/jobhop-joblocation/jobhop-joblocation.module';
import { JobhopJobMatchCounterModule } from './modules/jobhop-jobmatchcounter/jobhop-jobmatchcounter.module';
import { JobhopJobSettingModule } from './modules/jobhop-jobsetting/jobhop-jobsetting.module';
import { JobhopNotiMessageDetailModule } from './modules/jobhop-notimessagedetail/jobhop-notimessagedetail.module';
import { JobhopOrganizationBenefitModule } from './modules/jobhop-organizationbenefit/jobhop-organizationbenefit.module';
import { JobhopPaymentLinkModule } from './modules/jobhop-paymentlink/jobhop-paymentlink.module';
import { JobhopScoreNotificationModule } from './modules/jobhop-scorenotification/jobhop-scorenotification.module';
import { JobhopScoreNotificationMissingFieldsModule } from './modules/jobhop-scorenotification-missing-fields/jobhop-scorenotification-missing-fields.module';
import { JobhopScoreNotificationGroupModule } from './modules/jobhop-scorenotificationgroup/jobhop-scorenotificationgroup.module';
import { JobhopScoreNotificationMissingFieldModule } from './modules/jobhop-scorenotificationmissingfield/jobhop-scorenotificationmissingfield.module';
import { JobhopSuggestedKeywordModule } from './modules/jobhop-suggestedkeyword/jobhop-suggestedkeyword.module';
import { JobhopUserActivityModule } from './modules/jobhop-useractivity/jobhop-useractivity.module';
import { JobhopUserAttemptLoginModule } from './modules/jobhop-userattemptlogin/jobhop-userattemptlogin.module';
import { JobhopUserJobSentreccModule } from './modules/jobhop-userjobsentrecc/jobhop-userjobsentrecc.module';
import { JobhopUserManualModule } from './modules/jobhop-usermanual/jobhop-usermanual.module';
import { JobhopUserScoreNotificationModule } from './modules/jobhop-userscorenotification/jobhop-userscorenotification.module';
import { JobhopUserScoreSentNotificationModule } from './modules/jobhop-userscoresentnotification/jobhop-userscoresentnotification.module';
import { JobInterviewHistoryModule } from './modules/jobinterview-history/jobinterview-history.module';
import { JobMatchModule } from './modules/jobmatch/jobmatch.module';
import { JobMatchBudgetSentModule } from './modules/jobmatch-budget-sent/jobmatch-budget-sent.module';
import { JobMatchPageTestimonialModule } from './modules/jobmatch-page-testimonial/jobmatch-page-testimonial.module';
import { JobMatchPageTestimonialContentModule } from './modules/jobmatch-page-testimonialcontent/jobmatch-page-testimonialcontent.module';
import { JobMatchPageVideolinkModule } from './modules/jobmatch-page-videolink/jobmatch-page-videolink.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.JOB_SERVICE_MONGODB_URL),
    HealthModule,
    JobModule,
    JobAiLysisModule,
    JobBoardApplyLogModule,
    JobBountyModule,
    JobBountyHistoryModule,
    JobBudgetModule,
    JobBudgetHistoryModule,
    JobBudgetLogModule,
    JobBudgetRequestModule,
    JobBudgetRequestAddedModule,
    JobBudgetSuggestInfoModule,
    JobCategoryModule,
    JobFavoriteModule,
    JobInterviewModule,
    JobInterviewCategoryModule,
    JobInterviewCsInChargeModule,
    JobLikeModule,
    JobLinkModule,
    JobSalaryTemplateModule,
    JobScoreModule,
    JobSearchModule,
    JobSearchQuotaModule,
    JobStatsModule,
    JobStatsDetailModule,
    JobSubscriptionHistoryModule,
    JobTemplateModule,
    JobTemplatesModule,
    JobThumdownReasonModule,
    JobTitleModule,
    JobTitleSalaryRangeModule,
    JobTypeModule,
    JobVersionModule,
    JobViewModule,
    JobViewRawModule,
    JobGroupModule,
    JobGroupBurntCreditsModule,
    JobGroupJobsModule,
    JobhopBlacklistDomainModule,
    JobhopEmailHistoryModule,
    JobhopFptoLadipageLogModule,
    JobhopGenericDomainModule,
    JobhopInternalUserEmailModule,
    JobhopJobAtsActivityModule,
    JobhopJobCategoryModule,
    JobhopJobDefaultImageModule,
    JobhopJobLocationModule,
    JobhopJobMatchCounterModule,
    JobhopJobSettingModule,
    JobhopNotiMessageDetailModule,
    JobhopOrganizationBenefitModule,
    JobhopPaymentLinkModule,
    JobhopScoreNotificationModule,
    JobhopScoreNotificationMissingFieldsModule,
    JobhopScoreNotificationGroupModule,
    JobhopScoreNotificationMissingFieldModule,
    JobhopSuggestedKeywordModule,
    JobhopUserActivityModule,
    JobhopUserAttemptLoginModule,
    JobhopUserJobSentreccModule,
    JobhopUserManualModule,
    JobhopUserScoreNotificationModule,
    JobhopUserScoreSentNotificationModule,
    JobInterviewHistoryModule,
    JobMatchModule,
    JobMatchBudgetSentModule,
    JobMatchPageTestimonialModule,
    JobMatchPageTestimonialContentModule,
    JobMatchPageVideolinkModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisCacheService],
})
export class AppModule {}
