export enum CityEnum {
  LOCATION_TYPE_LEVEL = 1,
  SORT_BY_PRIORITY = 'priority',
  NAME = 'city',
  PLURAL_NAME = 'cities',
}

export enum LocationEnum {
  NAME = 'location',
  PLURAL_NAME = 'locations',
}

export enum ThumbdownReasonEnum {
  NAME = 'thumbdownReason',
  PLURAL_NAME = 'thumbdownReasons',
  SORT_BY_ID = 'sqlId',
  ACTIVE = 1,
  NOT_DELETED = 0,
}

export enum CVTemplateEnum {
  CV_TEMPLATE_NAME = 'cvTemplate',
  CV_TEMPLATE_PLURAL_NAME = 'cvTemplates',
}

export enum IndustryEnum {
  INDUSTRY_NAME = 'industry',
  INDUSTRY_PLURAL_NAME = 'industries',
}

export enum SuggestedSkillEnum {
  SUGGESTED_SKILL_NAME = 'suggestedSkill',
  SUGGESTED_SKILL_PLURAL_NAME = 'suggestedSkills',
}

export const enum MiscRedisCacheKey {
  MISC_MARKET_INSIGHT_INDUSTRY = 'misc_market-insight-industry',
  MISC_LANGUAGE = 'misc_language',
  MISC_LEVEL = 'misc_level',
  MISC_FUNCTION = 'misc_function',
  MISC_MARKET_INSIGHT_LEVEL = 'misc_market-insight-level',
  MISC_LOCATION_SELECTION = 'misc_location-selection',
  MISC_SALARY = 'misc_salary',
  MISC_SALARY_REVIEW_FILTER_DATA = 'misc_salary-review-filter-data',
  MISC_SORT_TYPE = 'misc_sort-type',
  MISC_TAG_FUNCTION = 'misc_tag-function',
  MISC_UNIVERSITY = 'misc_university',
  MISC_YEAR_OF_EXPERIENCE = 'misc_year-of-experience',
  MISC_LOCATION = 'misc_location',
  MISC_CITY = 'misc_city',
  MISC_DEPARTMENT = 'misc_department',
  MISC_DEGREE = 'misc_degree',
  MISC_INDUSTRY = 'misc_industry',
  MISC_HEADCOUNT = 'misc_headcount',
  MISC_DISTRICT = 'misc_district',
  MISC_BENEFIT = 'misc_benefit',
  MISC_COMPANY_TYPE = 'misc_company',
  MISC_LOCATION_TYPE = 'misc_location-type',
  MISC_BANNER = 'misc_banner',
  MISC_KEYWORD = 'misc_keyword',
  MISC_JOB_TITLE = 'misc_job-title',
  MISC_JOB_TYPE = 'misc_job-type',
  MISC_ORGANIZATION_SIZE = 'misc_organization-size',
  MISC_PACKAGE = 'misc_package',
  MISC_CV_TEMPLATE = 'misc_cv-template',
  MISC_SUGGESTED_KEYWORD = 'misc_suggested-keyword',
  MISC_HIGHLIGHT_ORGANIZATION = 'misc_highlight-organization',
  MISC_COMPANY = 'misc_company',
}
