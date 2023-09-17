import {
  ApiConsumes,
  ApiFile,
  ApiFiles,
  ApiOkResponse,
  ApiOperation,
  BaseController,
  Controller,
  FileFilter,
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
import { head } from 'lodash';
import { AssetService } from './asset.service';
import { Asset, AssetResponseDto } from './models';

const MAX_TOTAL_FILE = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const fileFilter = FileFilter({ fileTypes: ['image/*'], maxSize: MAX_FILE_SIZE });

const props: IControllerProps<Asset> = {
  dto: Asset,
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
    const { success } = await this.assetService.bulkUpload(file, payload);
    return head(success);
  }

  @Post('/multiple')
  @ApiOperation({ summary: 'Upload files' })
  @ApiConsumes('multipart/form-data')
  @ApiFiles('files')
  @ApiOkResponse({ description: 'Assets successfully uploaded', type: [AssetResponseDto] })
  @UseInterceptors(FilesInterceptor('files', MAX_TOTAL_FILE, { fileFilter }))
  async uploadMultiple(@UploadedFiles() files: MulterFile[], @Jwt() payload: JwtPayload): Promise<AssetResponseDto> {
    const { success, failed } = await this.assetService.bulkUpload(files, payload);
    return { success, failed };
  }
}
