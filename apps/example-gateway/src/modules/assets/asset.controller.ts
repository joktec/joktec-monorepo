import {
  ApiBody,
  ApiConsumes,
  ApiFiles,
  ApiOkResponse,
  ApiOperation,
  BaseController,
  BaseValidationPipe,
  Body,
  Controller,
  FilesInterceptor,
  IControllerProps,
  Jwt,
  JwtPayload,
  linkTransform,
  MulterFile,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@joktec/core';
import { orderBy } from 'lodash';
import { appConfig } from '../../app.config';
import { Asset } from '../../models/schemas';
import { AssetService } from './asset.service';
import {
  AssetFromUrlDto,
  AssetPresigned,
  AssetPresignedDto,
  AssetUpdateDto,
  fileFilter,
  MAX_TOTAL_FILE,
} from './models';

const props: IControllerProps<Asset> = {
  dto: Asset,
  customDto: { updatedDto: AssetUpdateDto },
  // guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
};

@Controller('assets')
export class AssetController extends BaseController<Asset, string>(props) {
  constructor(protected assetService: AssetService) {
    super(assetService);
  }

  @Post('/direct')
  @ApiOperation({ summary: 'Upload files' })
  @ApiConsumes('multipart/form-data')
  @ApiFiles('files')
  @ApiOkResponse({ description: 'Assets successfully uploaded', type: Asset, isArray: true })
  @UseInterceptors(FilesInterceptor('files', MAX_TOTAL_FILE, { fileFilter }))
  async bulkCreate(@UploadedFiles() files: MulterFile[], @Jwt() payload: JwtPayload): Promise<Asset[]> {
    const result = await Promise.all(files.map((file, idx) => this.assetService.upload(file, payload, idx)));
    return orderBy(result, 'idx', 'asc').map(res => {
      const asset = res.data;
      asset['url'] = linkTransform(asset.key, appConfig.misc.cdnUrl, 'absolute');
      return res.data;
    });
  }

  @Post('/presigned')
  @ApiOperation({ summary: 'Presigned URL' })
  @ApiBody({ type: [AssetPresignedDto] })
  @ApiOkResponse({ description: 'Successfully', type: AssetPresigned, isArray: true })
  @UsePipes(new BaseValidationPipe())
  async presigned(@Body() files: AssetPresignedDto[], @Jwt() payload: JwtPayload): Promise<AssetPresigned[]> {
    const result = await Promise.all(files.map((file, idx) => this.assetService.presigned(file, payload, idx)));
    return orderBy(result, 'idx', 'asc').map(res => {
      const asset = res.data;
      asset['url'] = linkTransform(asset.key, appConfig.misc.cdnUrl, 'absolute');
      return res.data;
    });
  }

  @Post('/from-url')
  @ApiOperation({ summary: 'Upload from URL' })
  @ApiBody({ type: AssetFromUrlDto })
  @ApiOkResponse({ description: 'Assets successfully uploaded', type: Asset, isArray: true })
  @UsePipes(new BaseValidationPipe())
  async uploadFromUrl(@Body() dto: AssetFromUrlDto, @Jwt() payload: JwtPayload): Promise<AssetPresigned[]> {
    const result = await Promise.all(dto.urls.map((url, idx) => this.assetService.uploadFromUrl(url, payload, idx)));
    return orderBy(result, 'idx', 'asc').map(res => {
      const asset = res.data;
      asset['url'] = linkTransform(asset.key, appConfig.misc.cdnUrl, 'absolute');
      return res.data;
    });
  }
}
