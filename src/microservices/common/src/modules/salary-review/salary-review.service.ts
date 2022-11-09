import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BaseService,
  CacheTtlSeconds,
  generateRedisCacheKey,
  ListQuery,
} from '@jobhopin/core';
import {
  SalaryReview,
  SalaryReviewDocument,
} from './schemas/salary-review.schema';
import { forwardRef, Inject } from '@nestjs/common';
import { CityService } from '../city/city.service';
import { LevelService } from '../level/level.service';
import { YearOfExperienceService } from '../year-of-experience/year-of-experience.service';
import { Cacheable } from 'type-cacheable';
import { RedisCacheKey } from '@app/app.constants';

export class SalaryReviewService extends BaseService<SalaryReviewDocument> {
  constructor(
    @InjectModel(SalaryReview.name)
    private salaryReviewModel: Model<SalaryReviewDocument>,
    @Inject(forwardRef(() => CityService))
    private readonly cityService: CityService,
    @Inject(forwardRef(() => LevelService))
    private readonly levelService: LevelService,
    @Inject(forwardRef(() => YearOfExperienceService))
    private readonly yearOfExperienceService: YearOfExperienceService,
  ) {
    super(salaryReviewModel);
  }

  @Cacheable({
    cacheKey: (args: any[]) =>
      generateRedisCacheKey(RedisCacheKey.SALARY_REVIEW_FILTER_DATA_MISC, args),
    ttlSeconds: CacheTtlSeconds.ONE_HOUR,
  })
  async miscFilterData() {
    const cities = await this.cityService.findAll({
      query: { prioritySearch: { $ne: null } } as any,
      limit: 0,
      sort: 'priority',
    } as ListQuery);
    const levels = await this.levelService.findAll({
      limit: 0,
      sort: 'priority',
    } as ListQuery);
    const yearsOfExperience = await this.yearOfExperienceService.findAll({
      limit: 0,
      sort: 'priority',
    } as ListQuery);
    return {
      averageSalaryDetailApi: [
        {
          priority: 1,
          name: 'Location',
          localizedName: {
            en: 'Location',
            vi: 'Vị trí',
          },
          paramKey: 'location',
          isMultiple: true,
          options: cities.map((c) => ({
            priority: c.priority,
            name: c.name,
            localizedName: {
              vi: c.name,
              en: c.nameEng,
            },
            value: `${c.sqlId}`,
            isDefault: false,
          })),
          children: [],
        },
        {
          priority: 2,
          name: 'Employment type',
          localizedName: {
            en: 'Employment type',
            vi: 'Loại công việc',
          },
          paramKey: 'jobTypeId',
          isMultiple: true,
          options: [].map((j) => ({
            priority: 1,
            name: j.name,
            localizedName: {
              vi: j.name,
              en: j.nameEng,
            },
            value: `${j.sqlId}`,
            isDefault: false,
          })),
          children: [],
        },
        {
          priority: 3,
          name: 'View as',
          localizedName: {
            en: 'View as',
            vi: 'Xem dưới dạng',
          },
          paramKey: null,
          isMultiple: false,
          options: [],
          children: [
            {
              priority: 1,
              name: 'Salary period',
              localizedName: {
                en: 'Salary period',
                vi: 'Kỳ lương',
              },
              paramKey: 'sort-typePeriod',
              isMultiple: false,
              options: [
                {
                  priority: 1,
                  name: 'Annual pay period',
                  localizedName: {
                    en: 'Annual pay period',
                    vi: 'Lương theo năm',
                  },
                  value: 'YEAR',
                  isDefault: true,
                },
                {
                  priority: 2,
                  name: 'Monthly pay period',
                  localizedName: {
                    en: 'Monthly pay period',
                    vi: 'Lương theo tháng',
                  },
                  value: 'MONTH',
                  isDefault: false,
                },
                {
                  priority: 3,
                  name: 'Hourly pay period',
                  localizedName: {
                    en: 'Hourly pay period',
                    vi: 'Lương theo giờ',
                  },
                  value: 'HOUR',
                  isDefault: false,
                },
              ],
            },
            {
              priority: 2,
              name: 'Currency',
              localizedName: {
                en: 'Currency',
                vi: 'Loại tiền tệ',
              },
              paramKey: 'sort-typeCurrency',
              isMultiple: false,
              options: [
                {
                  priority: 1,
                  name: 'USD',
                  localizedName: {
                    en: 'USD',
                    vi: 'USD',
                  },
                  value: 'USD',
                  isDefault: true,
                },
                {
                  priority: 2,
                  name: 'VND',
                  localizedName: {
                    en: 'VND',
                    vi: 'VND',
                  },
                  value: 'VND',
                  isDefault: false,
                },
              ],
            },
          ],
        },
        {
          priority: 4,
          name: 'Sort by',
          localizedName: {
            en: 'Sort by',
            vi: 'Sắp xếp theo',
          },
          paramKey: 'orderBy',
          isMultiple: false,
          options: [
            {
              priority: 1,
              name: 'Most reviews',
              localizedName: {
                en: 'Most reviews',
                vi: 'Nhiều đánh giá nhất',
              },
              value: 'mostReport',
              isDefault: true,
            },
            {
              priority: 2,
              name: 'Highest to lowest sort-type',
              localizedName: {
                en: 'Highest to lowest sort-type',
                vi: 'Mức lương cao nhất đến thấp nhất',
              },
              value: 'highestToLowest',
              isDefault: false,
            },
            {
              priority: 3,
              name: 'Lowest to highest sort-type',
              localizedName: {
                en: 'Lowest to highest sort-type',
                vi: 'Mức lương thấp nhất đến cao nhất',
              },
              value: 'lowestToHighest',
              isDefault: false,
            },
          ],
          children: [],
        },
      ],
      topAverageApi: [
        {
          priority: 1,
          name: 'Level',
          localizedName: {
            en: 'Level',
            vi: 'Cấp bậc',
          },
          paramKey: 'levelId',
          isMultiple: false,
          options: [
            {
              priority: 0,
              name: 'All',
              localizedName: {
                en: 'All',
                vi: 'Tất cả',
              },
              value: 'all',
              isDefault: true,
            },
            ...levels.map((l) => ({
              priority: l.priority,
              name: l.name,
              localizedName: {
                vi: l.name,
                en: l.nameEng,
              },
              value: l.sqlId,
              isDefault: false,
            })),
          ],
          children: [],
        },
        {
          priority: 2,
          name: 'Year of Experience',
          localizedName: {
            en: 'Year of Experience',
            vi: 'Số năm kinh nghiệm',
          },
          paramKey: 'yearOfExperienceId',
          isMultiple: false,
          options: [
            {
              priority: 0,
              name: 'All',
              localizedName: {
                en: 'All',
                vi: 'Tất cả',
              },
              value: 'all',
              isDefault: true,
            },
            ...yearsOfExperience.map((yoe) => ({
              priority: yoe.priority,
              name: yoe.name,
              localizedName: {
                vi: yoe.name,
                en: yoe.nameEn,
              },
              value: `${yoe.sqlId}`,
              isDefault: false,
            })),
          ],
          children: [],
        },
      ],
    };
  }
}
