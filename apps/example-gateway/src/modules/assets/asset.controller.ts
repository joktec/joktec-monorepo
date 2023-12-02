import {
  ApiBody,
  ApiConsumes,
  ApiFile,
  ApiFiles,
  ApiOkResponse,
  ApiOperation,
  BaseController,
  Body,
  Controller,
  FileInterceptor,
  FilesInterceptor,
  IControllerProps,
  Jwt,
  JwtPayload,
  MulterFile,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@joktec/core';
import { AssetService } from './asset.service';
import { fileFilter, MAX_TOTAL_FILE } from './asset.utils';
import { Asset, AssetPresigned, AssetPresignedDto } from './models';

const props: IControllerProps<Asset> = {
  dto: Asset,
  // bearer: AuthGuard,
  // guards: RoleGuard,
};

@Controller('assets')
export class AssetController extends BaseController<Asset, string>(props) {
  constructor(protected assetService: AssetService) {
    super(assetService);
  }

  @Post('/')
  @ApiOperation({ summary: 'Upload single file' })
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiOkResponse({ description: 'File successfully uploaded', type: Asset })
  @UseInterceptors(FileInterceptor('file', { fileFilter }))
  async create(@UploadedFile() file: MulterFile, @Jwt() payload: JwtPayload): Promise<Asset> {
    return this.assetService.upload(file, payload);
  }

  @Post('/multiple')
  @ApiOperation({ summary: 'Upload files' })
  @ApiConsumes('multipart/form-data')
  @ApiFiles('files')
  @ApiOkResponse({ description: 'Assets successfully uploaded', type: Asset, isArray: true })
  @UseInterceptors(FilesInterceptor('files', MAX_TOTAL_FILE, { fileFilter }))
  async bulkCreate(@UploadedFiles() files: MulterFile[], @Jwt() payload: JwtPayload): Promise<Asset[]> {
    return Promise.all(files.map(file => this.assetService.upload(file, payload)));
  }

  @Post('/presigned')
  @ApiOperation({ summary: 'Presigned URL' })
  @ApiBody({ type: AssetPresignedDto })
  @ApiOkResponse({ description: 'Successfully', type: AssetPresigned })
  async presigned(@Body() file: AssetPresignedDto, @Jwt() payload: JwtPayload): Promise<AssetPresigned> {
    return this.assetService.presigned(file, payload);
  }

  @Post('/bulkPresigned')
  @ApiOperation({ summary: 'Presigned URL' })
  @ApiBody({ type: AssetPresignedDto, isArray: true })
  @ApiOkResponse({ description: 'Successfully', type: AssetPresigned, isArray: true })
  async bulkPresigned(@Body() files: AssetPresignedDto[], @Jwt() payload: JwtPayload): Promise<AssetPresigned[]> {
    return Promise.all(files.map(file => this.assetService.presigned(file, payload)));
  }
}
