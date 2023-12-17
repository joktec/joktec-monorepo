import {
  ApiBody,
  ApiConsumes,
  ApiFiles,
  ApiOkResponse,
  ApiOperation,
  BaseController,
  Body,
  Controller,
  ControllerExclude,
  FilesInterceptor,
  IControllerProps,
  Jwt,
  JwtPayload,
  MulterFile,
  BaseListResponse,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { AssetService } from './asset.service';
import { fileFilter, MAX_TOTAL_FILE } from './asset.utils';
import { Asset, AssetPresigned, AssetPresignedDto } from './models';

const props: IControllerProps<Asset> = {
  dto: Asset,
  excludes: [ControllerExclude.CREATE],
  bearer: AuthGuard,
  guards: RoleGuard,
};

@Controller('assets')
export class AssetController extends BaseController<Asset, string>(props) {
  constructor(protected assetService: AssetService) {
    super(assetService);
  }

  @Post('/multiple')
  @ApiOperation({ summary: 'Upload files' })
  @ApiConsumes('multipart/form-data')
  @ApiFiles('files')
  @ApiOkResponse({ description: 'Assets successfully uploaded', type: BaseListResponse(Asset) })
  @UseInterceptors(FilesInterceptor('files', MAX_TOTAL_FILE, { fileFilter }))
  async bulkCreate(@UploadedFiles() files: MulterFile[], @Jwt() payload: JwtPayload): Promise<Asset[]> {
    return Promise.all(files.map(file => this.assetService.upload(file, payload)));
  }

  @Post('/presigned')
  @ApiOperation({ summary: 'Presigned URL' })
  @ApiBody({ type: [AssetPresignedDto] })
  @ApiOkResponse({ description: 'Successfully', type: BaseListResponse(AssetPresigned) })
  async presigned(@Body() files: AssetPresignedDto[], @Jwt() payload: JwtPayload): Promise<AssetPresigned[]> {
    return Promise.all(files.map(file => this.assetService.presigned(file, payload)));
  }
}
