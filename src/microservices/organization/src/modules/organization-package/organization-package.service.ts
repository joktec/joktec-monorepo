import { Model } from 'mongoose';
import { OrganizationPackage, OrganizationPackageDocument } from './schemas/organization-package.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService, CacheTtlSeconds, generateRedisCacheKey, ListQuery } from '@jobhopin/core';
import { RedisCacheKey } from 'src/app.constants';
import { Cacheable } from 'type-cacheable';

@Injectable()
export class OrganizationPackageService extends BaseService<OrganizationPackageDocument> {
  constructor(
    @InjectModel(OrganizationPackage.name) private organizationPackageModel: Model<OrganizationPackageDocument>,
  ) {
    super(organizationPackageModel)
  }
}
