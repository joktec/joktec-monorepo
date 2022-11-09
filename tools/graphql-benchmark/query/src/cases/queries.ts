/**
 * Declare some queries
 */

const queries = {
  miscData: `query miscData {
    misc {
      accountDeletionReason {
        id
        isOther
        localizedReason
        reason
        value
      }
      benefits {
        _id
        code
        name
        localizedName
        image
        value
      }
      cities {
        _id
        code
        name
        localizedName
        image
        imageKyc
        imageHighlight
        priority
        type
        value
      }
      companyTags {
        id
        name
        localizedName
        value
      }
      companyTypes {
        _id
        name
        nameEng
        localizedName
        priority
        value
      }
      currencyConversion {
        USD {
          VND
        }
      }
      degrees {
        _id
        name
        value
        localizedName
      }
      departments {
        _id
        code
        name
        localizedName
      }
      functions {
        id
        code
        name
        nameEng
        active
        priority
        localizedName
      }
      headcounts {
        _id
        value
        localizedName
      }
     
      interviewReviewFilters {
        isMultiple
        name
        paramKey
        priority
        localizedName
        options {
          priority
          value
          localizedName
          name
          isDefault
        }
      }
      jobFunctions {
        id
        code
        name
        name_eng
        localizedName
        value
        priority
      }
      jobTitles {
      	_id
        localizedName
      }
      jobTypes {
        _id
        name
        code
        priority
        localizedName
        value:sqlId
      }
      languages {
        id
        name
        code
        localizedName
        value
      }
      levels {
        id
        name
        level_id
        priority
        code
        localizedName
        value
      }
      locationSelection {
        id
        name
        type
        askLocationSelectionImage
        priority
        code
        localizedName
        value
      }
      organizationSizes {
        _id
        name
        localizedName
        value:sqlId
      }
      packages {
        bonusCreditPerentage
        credits
        enabled
        expiryMonth
        id
        name
        name_eng
        localizedName
        localizedPrice
        maxJob
        maxUser
        maxAdmin
        maxHrMember
        maxCandidate
        maxHiringManager
        maxJobInterview
        maxTiAssistedJob
        price
        priceUsd
        value
      }
      salaries {
        _id
        relatedId
        salaryMax
        salaryMin
        salaryCurrency
        localizedName
      }
      sortTypes {
        _id
        isDefault
        value
        localizedName
      }
      tagFunction {
        id
        code
        name
        name
        tag_sub_function
        priority
        value
        localizedName
      }
      universities {
        _id
        nameEng
        name
        value
      }
      workingTimeConversion {
        DAY
        MONTH
        QUARTER
        YEAR
      }
      workplaceTypes {
        id
        isDefault
        name
        value
        localizedName
      }
      yearOfExperience {
        id
        name
        value
        priority
        localizedName
      }
      yearsWorking
    }
  }
  `,
};

export default queries;
