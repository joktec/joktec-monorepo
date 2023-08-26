import { faker } from '@faker-js/faker';
import { Injectable } from '@joktec/core';
import { omit } from 'lodash';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Setting, SettingStatus, SettingType } from './models';
import { SettingRepo } from './setting.repo';

export const DummySettings = [
  {
    code: 'VN_79',
    title: 'Thành phố Hồ Chí Minh',
    order: 1,
    type: SettingType.AREA,
    status: SettingStatus.ACTIVATED,
    children: [
      {
        code: 'VN_760',
        title: 'Quận 1',
        order: 1,
        type: SettingType.AREA,
        status: SettingStatus.ACTIVATED,
        children: [
          {
            code: 'VN_26734',
            title: 'Phường Tân Định',
            order: 1,
            type: SettingType.AREA,
            status: SettingStatus.ACTIVATED,
          },
        ],
      },
    ],
  },
];

@Injectable()
export class SettingSeeder implements Seeder {
  constructor(private settingRepo: SettingRepo) {}

  async seed(): Promise<any> {
    await this.seedArea();
    const settings = DataFactory.createForClass(Setting).generate(5, {
      code: faker.word.noun({ strategy: 'shortest' }),
    });
    return Promise.all(settings.map(u => this.settingRepo.create(u)));
  }

  async drop(): Promise<any> {
    return this.settingRepo.deleteMany({});
  }

  private async seedArea() {
    const settingDummy = [...DummySettings];
    for (const cityDummy of settingDummy) {
      const cityData = omit(cityDummy, ['children']);
      const city = await this.settingRepo.create(cityData);

      for (const districtDummy of cityDummy.children) {
        const districtData = omit(districtDummy, ['children']);
        const district = await this.settingRepo.create({
          ...districtData,
          parentId: city._id,
        });

        for (const wardDummy of districtDummy.children) {
          await this.settingRepo.create({ ...wardDummy, parentId: district._id });
        }
      }
    }
  }
}
