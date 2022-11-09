const PARAM_OVERALL_EXPERIENCE = 'overallExperience';
const PARAM_OFFER_STATUS = 'offerStatus';
const PARAM_ORDER_BY = 'orderBy';

const PARAM_OVERALL_EXPERIENCE_NAME = 'Overall Experience';
const PARAM_OVERALL_EXPERIENCE_POSITIVE_NAME = 'Positive';
const PARAM_OVERALL_EXPERIENCE_POSITIVE_NAME_VI = 'Tích cực';
const PARAM_OVERALL_EXPERIENCE_NEGATIVE_NAME = 'Negative';
const PARAM_OVERALL_EXPERIENCE_NEGATIVE_NAME_VI = 'Tiêu cực';
const PARAM_OVERALL_EXPERIENCE_NEUTRAL_NAME = 'Neutral';
const PARAM_OVERALL_EXPERIENCE_NEUTRAL_NAME_VI = 'Trung lập';

const PARAM_OFFER_STATUS_NAME = 'Interview Outcome';
const PARAM_OFFER_STATUS_ACCEPTED_NAME = 'Offer Accepted';
const PARAM_OFFER_STATUS_ACCEPTED_NAME_VI = 'Đã nhận việc';
const PARAM_OFFER_STATUS_DECLINED_NAME = 'Từ chối';
const PARAM_OFFER_STATUS_DECLINED_NAME_VI = 'Offer Declined';
const PARAM_OFFER_STATUS_NO_OFFER_NAME = 'No Offer';
const PARAM_OFFER_STATUS_NO_OFFER_NAME_VI =
  'No OfferKhông có lời mời nhận việc';

const PARAM_ORDER_BY_NAME = 'Sort interview by';
const PARAM_ORDER_BY_PUBLISH_DATE_NAME = 'Latest publish date';
const PARAM_ORDER_BY_PUBLISH_DATE_NAME_VI = 'Latest publish date';
const PARAM_ORDER_BY_INTERVIEW_DATE_NAME = 'Latest interview date';
const PARAM_ORDER_BY_INTERVIEW_DATE_NAME_VI = 'Latest interview date';
const PARAM_ORDER_BY_HELPFUL_NAME = 'Most helpful review';
const PARAM_ORDER_BY_HELPFUL_NAME_VI = 'Most helpful review';

const OVERALL_EXPERIENCE_NEUTRAL = 'NEUTRAL';
const OVERALL_EXPERIENCE_POSITIVE = 'POSITIVE';
const OVERALL_EXPERIENCE_NEGATIVE = 'NEGATIVE';

const OFFER_STATUS_ACCEPTED = 'ACCEPTED';
const OFFER_STATUS_DECLINED = 'DECLINE';
const OFFER_STATUS_NO_OFFER = 'NO_OFFER';

const ORDER_BY_PUBLIC_DATE = 'publicDate';
const ORDER_BY_INTERVIEW_DATE = 'interviewDate';
const ORDER_BY_HELPFUL = 'helpful';

const PARAM_OVERALL_EXPERIENCE_NAME_VI = 'Trải nghiệm tổng quan';
const PARAM_OFFER_STATUS_NAME_VI = 'Kết quả phỏng vấn';
const PARAM_ORDER_BY_NAME_VI = 'Sắp xếp theo';

export const INTERVIEW_REVIEW_FILTERS = [
  {
    name: PARAM_OVERALL_EXPERIENCE_NAME,
    priority: 1,
    paramKey: PARAM_OVERALL_EXPERIENCE,
    isMultiple: true,
    localizedName: {
      vi: PARAM_OVERALL_EXPERIENCE_NAME_VI,
      en: PARAM_OVERALL_EXPERIENCE_NAME,
    },
    options: [
      {
        isDefault: false,
        name: PARAM_OVERALL_EXPERIENCE_POSITIVE_NAME,
        priority: 1,
        value: OVERALL_EXPERIENCE_POSITIVE,
        localizedName: {
          vi: PARAM_OVERALL_EXPERIENCE_POSITIVE_NAME_VI,
          en: PARAM_OVERALL_EXPERIENCE_POSITIVE_NAME,
        },
      },
      {
        isDefault: false,
        name: PARAM_OVERALL_EXPERIENCE_NEUTRAL_NAME,
        priority: 2,
        value: OVERALL_EXPERIENCE_NEUTRAL,
        localizedName: {
          vi: PARAM_OVERALL_EXPERIENCE_NEUTRAL_NAME_VI,
          en: PARAM_OVERALL_EXPERIENCE_NEUTRAL_NAME,
        },
      },
      {
        isDefault: false,
        name: PARAM_OVERALL_EXPERIENCE_NEGATIVE_NAME,
        priority: 3,
        value: OVERALL_EXPERIENCE_NEGATIVE,
        localizedName: {
          vi: PARAM_OVERALL_EXPERIENCE_NEGATIVE_NAME_VI,
          en: PARAM_OVERALL_EXPERIENCE_NEGATIVE_NAME,
        },
      },
    ],
  },
  {
    name: PARAM_OFFER_STATUS_NAME,
    priority: 2,
    paramKey: PARAM_OFFER_STATUS,
    isMultiple: true,
    localizedName: {
      vi: PARAM_OFFER_STATUS_NAME_VI,
      en: PARAM_OFFER_STATUS_NAME,
    },
    options: [
      {
        isDefault: false,
        name: PARAM_OFFER_STATUS_ACCEPTED_NAME,
        priority: 1,
        value: OFFER_STATUS_ACCEPTED,
        localizedName: {
          vi: PARAM_OFFER_STATUS_ACCEPTED_NAME_VI,
          en: PARAM_OFFER_STATUS_ACCEPTED_NAME,
        },
      },
      {
        isDefault: false,
        name: PARAM_OFFER_STATUS_DECLINED_NAME,
        priority: 2,
        value: OFFER_STATUS_DECLINED,
        localizedName: {
          vi: PARAM_OFFER_STATUS_DECLINED_NAME_VI,
          en: PARAM_OFFER_STATUS_DECLINED_NAME,
        },
      },
      {
        isDefault: false,
        name: PARAM_OFFER_STATUS_NO_OFFER_NAME,
        priority: 3,
        value: OFFER_STATUS_NO_OFFER,
        localizedName: {
          vi: PARAM_OFFER_STATUS_NO_OFFER_NAME_VI,
          en: PARAM_OFFER_STATUS_NO_OFFER_NAME,
        },
      },
    ],
  },
  {
    name: PARAM_ORDER_BY_NAME,
    priority: 3,
    paramKey: PARAM_ORDER_BY,
    isMultiple: false,
    localizedName: {
      vi: PARAM_ORDER_BY_NAME_VI,
      en: PARAM_ORDER_BY_NAME,
    },
    options: [
      {
        isDefault: false,
        name: PARAM_ORDER_BY_HELPFUL_NAME,
        priority: 1,
        value: '-' + ORDER_BY_HELPFUL,
        localizedName: {
          vi: PARAM_ORDER_BY_HELPFUL_NAME_VI,
          en: PARAM_ORDER_BY_HELPFUL_NAME,
        },
      },
      {
        name: PARAM_ORDER_BY_PUBLISH_DATE_NAME,
        priority: 2,
        value: '-' + ORDER_BY_PUBLIC_DATE,
        isDefault: true,
        localizedName: {
          vi: PARAM_ORDER_BY_PUBLISH_DATE_NAME_VI,
          en: PARAM_ORDER_BY_PUBLISH_DATE_NAME,
        },
      },
      {
        isDefault: false,
        name: PARAM_ORDER_BY_INTERVIEW_DATE_NAME,
        priority: 3,
        value: '-' + ORDER_BY_INTERVIEW_DATE,
        localizedName: {
          vi: PARAM_ORDER_BY_INTERVIEW_DATE_NAME_VI,
          en: PARAM_ORDER_BY_INTERVIEW_DATE_NAME,
        },
      },
    ],
  },
];
