import { Inject } from '@nestjs/common';
import {
  BenefitMessagePattern,
  CacheTtlSeconds,
  CommonMicroserviceConfig,
  CompanyTypeMessagePattern,
  CvMicroserviceConfig,
  CvTemplateMessagePattern,
  DegreeMessagePattern,
  DepartmentMessagePattern,
  generateRedisCacheKey,
  HeadcountMessagePattern,
  HighlightCompanyMessagePattern,
  IndustryMessagePattern,
  JobCategoryMessagePattern,
  JobhopSuggestedKeywordMessagePattern,
  JobMessagePattern,
  JobMicroserviceConfig,
  JobTitleMessagePattern,
  JobTypeMessagePattern,
  KeywordMessagePattern,
  LanguageMessagePattern,
  LevelMessagePattern,
  LocationMessagePattern,
  OrganizationMicroserviceConfig,
  OrganizationPackageMessagePattern,
  OrganizationSizeMessagePattern,
  SalaryMessagePattern,
  SalaryReviewMessagePattern,
  SortTypeMessagePattern,
  TagFunctionMessagePattern,
  UniversityMessagePattern,
  YearOfExperienceMessagePattern,
} from '@jobhopin/core';
import {
  IndustryQueryInput,
  Misc,
  MiscQueryInput,
  MiscWorkingTimeConversion,
  MiscWorkplaceType,
  JobTitleQueryInput,
  JobTypeQueryInput,
  OrganizationSizeQueryInput,
  OrganizationPackageQueryInput,
  CityQueryInput,
  CompanyQueryInput,
} from '@jobhopin/graphql';
import { Args, ResolveField, Resolver, Query } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MiscRedisCacheKey } from '@app/constants';
import { ACCOUNT_DELETION_REASONS } from '@app/constants/account-deletion-reason';
import { CURRENCY_CONVERSION } from '@app/constants/currency-conversion';
import { INTERVIEW_REVIEW_FILTERS } from '@app/constants/interview-review-filters';
import { JOB_BADGES } from '@app/constants/job-badge';
import { COMPANY_TAGS } from '@app/constants/company-tag';
import { shuffleArray } from '@app/utils';
import { Cacheable } from 'type-cacheable';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
const jobMicroserviceConfig = new JobMicroserviceConfig();
const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
const cvMicroserviceConfig = new CvMicroserviceConfig();

@Resolver(Misc)
export class MiscResolver {
  constructor(
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
    @Inject(cvMicroserviceConfig.name)
    private readonly cvMicroservice: ClientProxy,
  ) {}

  @Query(() => Misc, { name: 'misc' })
  async findAll() {
    return {};
  }

  @ResolveField()
  async accountDeletionReason() {
    return ACCOUNT_DELETION_REASONS;
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_BENEFIT, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async benefits(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(BenefitMessagePattern.LIST, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_CITY, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async cities(
    @Args('query', {
      type: () => CityQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: CityQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(LocationMessagePattern.LIST, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_COMPANY, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async companies(
    @Args('query', {
      type: () => CompanyQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: CompanyQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.jobMicroservice.send(JobMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  async companyTags() {
    return COMPANY_TAGS;
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_COMPANY_TYPE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async companyTypes(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(CompanyTypeMessagePattern.LIST, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  async currencyConversion() {
    return CURRENCY_CONVERSION;
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_DEGREE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async degrees(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(DegreeMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_DEPARTMENT, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async departments(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(DepartmentMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_FUNCTION, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async functions(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { condition } = query;
      let newCondition = { ...condition };

      newCondition = { ...newCondition, priority: { $ne: null } };

      const { items } = await firstValueFrom(
        this.jobMicroservice.send(JobCategoryMessagePattern.LIST, {
          ...query,
          condition: newCondition,
        }),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_HEADCOUNT, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async headcounts(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(HeadcountMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_INDUSTRY, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async industries(
    @Args('query', {
      type: () => IndustryQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: IndustryQueryInput,
  ) {
    try {
      const { condition } = query;
      let newCondition = { ...condition };
      if (condition?.hasPriority === false) {
        newCondition = { ...newCondition, priority: { $ne: null } };
      }

      const { items } = await firstValueFrom(
        this.commonMicroservice.send(IndustryMessagePattern.LIST, {
          ...query,
          condition: newCondition,
        }),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  async interviewReviewFilters() {
    return INTERVIEW_REVIEW_FILTERS;
  }

  @ResolveField()
  async jobBadges() {
    return JOB_BADGES;
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_JOB_TITLE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async jobTitles(
    @Args('query', {
      type: () => JobTitleQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: JobTitleQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.jobMicroservice.send(JobTitleMessagePattern.LIST, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_JOB_TYPE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async jobTypes(
    @Args('query', {
      type: () => JobTypeQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: JobTypeQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.jobMicroservice.send(JobTypeMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_LANGUAGE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async languages(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(LanguageMessagePattern.LIST, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_LEVEL, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async levels(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(LevelMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_ORGANIZATION_SIZE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async organizationSizes(
    @Args('query', {
      type: () => OrganizationSizeQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: OrganizationSizeQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.organizationMicroservice.send(
          OrganizationSizeMessagePattern.LIST,
          query,
        ),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_PACKAGE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async packages(
    @Args('query', {
      type: () => OrganizationPackageQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: OrganizationPackageQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.organizationMicroservice.send(
          OrganizationPackageMessagePattern.LIST,
          query,
        ),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_SALARY, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async salaries(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(SalaryMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(
        MiscRedisCacheKey.MISC_SALARY_REVIEW_FILTER_DATA,
        args,
      ),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async salaryReviewFilterData() {
    try {
      return await firstValueFrom(
        this.commonMicroservice.send(
          SalaryReviewMessagePattern.MISC_FILTER_DATA,
          {},
        ),
      );
    } catch (error) {
      return null;
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_SORT_TYPE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async sortTypes(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(SortTypeMessagePattern.LIST, query),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_TAG_FUNCTION, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async tagFunction(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(TagFunctionMessagePattern.MISC, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_UNIVERSITY, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async universities(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(UniversityMessagePattern.LIST, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField('workingTimeConversion', () => MiscWorkingTimeConversion)
  async workingTimeConversion() {
    return {
      YEAR: {
        QUARTER: 4,
        MONTH: 12,
        DAY: 260.4,
        HOUR: 2083.2,
      },
      QUARTER: {
        MONTH: 3,
        DAY: 65.1,
        HOUR: 520.8,
      },
      MONTH: {
        DAY: 21.7,
        HOUR: 173.6,
      },
      DAY: {
        HOUR: 8,
      },
    };
  }

  @ResolveField('workplaceTypes', () => [MiscWorkplaceType])
  async workplaceTypes() {
    return [
      {
        id: '0',
        isDefault: true,
        value: 'ON_SITE',
        name: 'Làm tại văn phòng',
        localizedName: {
          vi: 'Làm tại văn phòng',
          en: 'On-site',
        },
      },
      {
        id: '1',
        isDefault: false,
        value: 'REMOTE',
        name: 'Làm việc từ xa ',
        localizedName: {
          vi: 'Làm việc từ xa ',
          en: 'Remote',
        },
      },
      {
        id: '2',
        isDefault: false,
        value: 'HYBRID',
        name: 'Văn phòng/Từ xa',
        localizedName: {
          vi: 'Văn phòng/Từ xa',
          en: 'Hybrid',
        },
      },
    ];
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_YEAR_OF_EXPERIENCE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async yearOfExperience(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(
          YearOfExperienceMessagePattern.LIST,
          query,
        ),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField('yearsWorking', () => [String])
  async yearsWorking() {
    return Array(6)
      .fill(new Date().getFullYear())
      .map((currentYear, idx) => `${currentYear - idx}`);
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_KEYWORD, args),
    ttlSeconds: CacheTtlSeconds.ONE_MINUTE / 2,
  })
  async keywords(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(KeywordMessagePattern.LIST, query),
      );

      shuffleArray(items);

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_CV_TEMPLATE, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async cvTemplates(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.cvMicroservice.send(CvTemplateMessagePattern.LIST, query),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(MiscRedisCacheKey.MISC_SUGGESTED_KEYWORD, args),
    ttlSeconds: CacheTtlSeconds.ONE_MINUTE * 10,
  })
  async suggestedKeyword(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.jobMicroservice.send(
          JobhopSuggestedKeywordMessagePattern.LIST,
          query,
        ),
      );

      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(
        MiscRedisCacheKey.MISC_HIGHLIGHT_ORGANIZATION,
        args,
      ),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async highlightOrganizations(
    @Args('query', {
      type: () => MiscQueryInput,
      nullable: true,
      defaultValue: {},
    })
    query: MiscQueryInput,
  ) {
    try {
      const { items } = await firstValueFrom(
        this.commonMicroservice.send(
          HighlightCompanyMessagePattern.LIST,
          query,
        ),
      );
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
