import { JobMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { JobResolver } from './resolvers/job.resolver';
import { JobUserResolver } from './resolvers/job-user.resolver';
import { JobVersionResolver } from './resolvers/job-version.resolver';
import { JobTypeResolver } from './resolvers/job-type.resolver';
import { JobRecruiterResolver } from './resolvers/job-recruiter.resolver';
import { JobLocationResolver } from './resolvers/job-location.resolver';
import { JobLevelResolver } from './resolvers/job-level.resolver';
import { JobLanguageResolver } from './resolvers/job-language.resolver';
import { JobIndustryResolver } from './resolvers/job-industry.resolver';
import { JobDistrictResolver } from './resolvers/job-district.resolver';
import { JobCountryResolver } from './resolvers/job-country.resolver';
import { JobCityResolver } from './resolvers/job-city.resolver';
import { JobAiLysisResolver } from './resolvers/job-ai-lysis.resolver';
import { JobBoardApplyLogResolver } from './resolvers/job-board-apply-log.resolver';
import { JobBountyHistoryResolver } from './resolvers/job-bounty-history.resolver';
import { JobBountyResolver } from './resolvers/job-bounty.resolver';
import { JobBudgetHistoryResolver } from './resolvers/job-budget-history.resolver';
import { JobMatchResolver } from './resolvers/jobmatch.resolver';
import { JobMatchPageTestimonialResolver } from './resolvers/jobmatch-page-testimonial.resolver';
import { JobMatchPageTestimonialContentResolver } from './resolvers/jobmatch-page-testimonial-content.resolver';
import { JobMatchPageVideoLinkResolver } from './resolvers/jobmatch-page-videolink.resolver';
import { JobBudgetRequestResolver } from './resolvers/job-budget-request.resolver';
import { JobBudgetRequestAddedResolver } from './resolvers/job-budget-request-added.resolver';
import { JobBudgetLogResolver } from './resolvers/job-budget-log.resolver';
import { JobCategoryResolver } from './resolvers/job-category.resolver';
import { JobFavoriteResolver } from './resolvers/job-favorite.resolver';
import { JobInterviewResolver } from './resolvers/job-interview.resolver';
import { JobInterviewCategoryResolver } from './resolvers/job-interview-category.resolver';
import { JobInterviewCsInChargeResolver } from './resolvers/job-interview-cs-in-charge.resolver';
import { JobLikeResolver } from './resolvers/job-like.resolver';
import { JobLinkResolver } from './resolvers/job-link.resolver';
import { JobSalaryTemplateResolver } from './resolvers/job-salary-template.resolver';
import { JobScoreResolver } from './resolvers/job-score.resolver';
import { JobSearchResolver } from './resolvers/job-search.resolver';
import { JobStatsDetailResolver } from './resolvers/job-stats-detail.resolver';
import { JobStatsResolver } from './resolvers/job-stats.resolver';
import { JobSubscriptionHistoryResolver } from './resolvers/job-subscription-history.resolver';
import { JobTemplateResolver } from './resolvers/job-template.resolver';
import { JobTemplatesResolver } from './resolvers/job-templates.resolver';
import { JobThumdownReasonResolver } from './resolvers/job-thumdown-reason.resolver';
import { JobTitleSalaryRangeResolver } from './resolvers/job-title-salary-range.resolver';
import { JobTitleResolver } from './resolvers/job-title.resolver';
import { JobViewRawResolver } from './resolvers/job-view-raw.resolver';
import { JobGroupBurntCreditsResolver } from './resolvers/jobgroup-burnt-credits.resolver';
import { JobGroupJobsResolver } from './resolvers/jobgroup-jobs.resolver';
import { JobGroupResolver } from './resolvers/jobgroup.resolver';
import { JobhopBlackListDomainResolver } from './resolvers/jobhop-black-list-domain.resolver';
import { JobhopEmailHistoryResolver } from './resolvers/jobhop-email-history.resolver';
import { JobhopFptoLadiPageLogResolver } from './resolvers/jobhop-fpto-ladi-page-log.resolver';
import { JobhopGenericDomainResolver } from './resolvers/jobhop-generic-domain.resolver';
import { JobhopInternalUserEmailResolver } from './resolvers/jobhop-internal-user-email.resolver';
import { JobhopJobAtsActivityResolver } from './resolvers/jobhop-job-ats-activity.resolver';
import { JobhopJobCategoryResolver } from './resolvers/jobhop-job-category.resolver';
import { JobhopJobDefaultImageResolver } from './resolvers/jobhop-job-default-image.resolver';
import { JobhopJobLocationResolver } from './resolvers/jobhop-job-location.resolver';
import { JobhopJobMatchCounterResolver } from './resolvers/jobhop-job-match-counter.resolver';
import { JobhopJobSettingResolver } from './resolvers/jobhop-job-setting.resolver';
import { JobhopNotiMessageDetailResolver } from './resolvers/jobhop-noti-message-detail.resolver';
import { JobhopOrganizationBenefitResolver } from './resolvers/jobhop-organization-benefit.resolver';
import { JobhopPaymentLinkResolver } from './resolvers/jobhop-payment-link.resolver';
import { JobhopScoreNotificationResolver } from './resolvers/jobhop-score-notification.resolver';
import { JobhopScoreNotificationMissingFieldsResolver } from './resolvers/jobhop-score-notification-missing-fields.resolver';
import { JobhopScoreNotificationGroupResolver } from './resolvers/jobhop-score-notification-group.resolver';
import { JobhopSuggestedKeywordResolver } from './resolvers/jobhop-suggested-keyword.resolver';
import { JobhopUserActivityResolver } from './resolvers/jobhop-user-activity.resolver';
import { JobhopUserAttemptLoginResolver } from './resolvers/jobhop-user-attemp-login.resolver';
import { JobhopUserJobSentreccResolver } from './resolvers/jobhop-user-job-sent-recc.resolver';
import { JobhopUserManualResolver } from './resolvers/jobhop-user-manual.resolver';
import { JobhopScoreNotificationMissingFieldResolver } from './resolvers/jobhop-score-notification-missing-field.resolver';
import { JobhopUserScoreSentNotificationResolver } from './resolvers/jobhop-user-score-sent-notification.resolver';
import { JobInterviewHistoryResolver } from './resolvers/jobinterview-history.resolver';
import { JobhopUserScoreNotificationResolver } from './resolvers/jobhop-user-score-notification.resolver';
import { JobSearchQuotaResolver } from './resolvers/job-search-quota.resolver';
import { JobViewResolver } from './resolvers/job-view.resolver';

const jobMicroserviceConfig = new JobMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: jobMicroserviceConfig.name,
        ...jobMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],

  providers: [
    JobResolver,
    JobVersionResolver,
    JobUserResolver,
    JobTypeResolver,
    JobRecruiterResolver,
    JobLocationResolver,
    JobLevelResolver,
    JobLanguageResolver,
    JobIndustryResolver,
    JobDistrictResolver,
    JobCountryResolver,
    JobCityResolver,
    JobAiLysisResolver,
    JobBoardApplyLogResolver,
    JobBountyHistoryResolver,
    JobBountyResolver,
    JobBudgetHistoryResolver,
    JobMatchResolver,
    JobMatchPageTestimonialResolver,
    JobMatchPageTestimonialContentResolver,
    JobMatchPageVideoLinkResolver,
    JobMatchResolver,
    JobBudgetRequestResolver,
    JobBudgetRequestAddedResolver,
    JobBudgetLogResolver,
    JobCategoryResolver,
    JobFavoriteResolver,
    JobInterviewResolver,
    JobInterviewCategoryResolver,
    JobInterviewCsInChargeResolver,
    JobLikeResolver,
    JobLinkResolver,
    JobSalaryTemplateResolver,
    JobScoreResolver,
    JobSearchResolver,
    JobSearchQuotaResolver,
    JobStatsDetailResolver,
    JobStatsResolver,
    JobSubscriptionHistoryResolver,
    JobTemplateResolver,
    JobTemplatesResolver,
    JobThumdownReasonResolver,
    JobTitleSalaryRangeResolver,
    JobTitleResolver,
    JobViewRawResolver,
    JobViewResolver,
    JobGroupBurntCreditsResolver,
    JobGroupJobsResolver,
    JobGroupResolver,
    JobhopBlackListDomainResolver,
    JobhopEmailHistoryResolver,
    JobhopFptoLadiPageLogResolver,
    JobhopGenericDomainResolver,
    JobhopInternalUserEmailResolver,
    JobhopJobAtsActivityResolver,
    JobhopJobCategoryResolver,
    JobhopJobDefaultImageResolver,
    JobhopJobLocationResolver,
    JobhopJobMatchCounterResolver,
    JobhopJobSettingResolver,
    JobhopNotiMessageDetailResolver,
    JobhopOrganizationBenefitResolver,
    JobhopPaymentLinkResolver,
    JobhopScoreNotificationResolver,
    JobhopScoreNotificationGroupResolver,
    JobhopScoreNotificationMissingFieldResolver,
    JobhopScoreNotificationMissingFieldsResolver,
    JobhopSuggestedKeywordResolver,
    JobhopUserActivityResolver,
    JobhopUserAttemptLoginResolver,
    JobhopUserJobSentreccResolver,
    JobhopUserManualResolver,
    JobhopUserScoreNotificationResolver,
    JobhopUserScoreSentNotificationResolver,
    JobInterviewHistoryResolver,
  ],
  controllers: [],
})
export class JobModule {}
