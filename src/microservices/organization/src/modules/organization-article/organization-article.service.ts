import { Model } from 'mongoose';
import { OrganizationArticle, OrganizationArticleDocument } from './schemas/organization-article.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {BaseService} from '@jobhopin/core';

@Injectable()
export class OrganizationArticleService extends BaseService<OrganizationArticleDocument> {
  constructor(
    @InjectModel(OrganizationArticle.name) private organizationArticleModel: Model<OrganizationArticleDocument>,
  ) {
    super(organizationArticleModel)
  }
}
