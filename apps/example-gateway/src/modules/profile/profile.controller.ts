import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  BaseValidationPipe,
  Body,
  Controller,
  Delete,
  Get,
  Jwt,
  JwtPayload,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import {
  UserFcmDto,
  UserLogoutDto,
  UserPasswordDto,
  UserProfileDto,
  UserProfileResponse,
  UserRevokeDto,
  UserSetPasswordDto,
} from './models';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/')
  @ApiOperation({ summary: `Get Profile` })
  @ApiOkResponse({ type: UserProfileResponse })
  async getProfile(@Jwt() payload: JwtPayload): Promise<any> {
    return this.profileService.getProfile(payload);
  }

  @Put('/')
  @ApiOperation({ summary: `Update Profile` })
  @ApiBody({ type: UserProfileDto })
  @ApiOkResponse({ type: UserProfileResponse })
  @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }))
  async updateProfile(@Body() input: UserProfileDto, @Jwt() payload: JwtPayload): Promise<UserProfileResponse> {
    return this.profileService.updateProfile(input, payload);
  }

  @Post('/password')
  @ApiOperation({ summary: `Set Password` })
  @ApiBody({ type: UserSetPasswordDto })
  @ApiOkResponse({ type: UserProfileResponse })
  @UsePipes(new BaseValidationPipe())
  async setPassword(@Body() input: UserSetPasswordDto, @Jwt() payload: JwtPayload): Promise<UserProfileResponse> {
    return this.profileService.setPassword(input, payload);
  }

  @Put('/password')
  @ApiOperation({ summary: `Change Password` })
  @ApiBody({ type: UserPasswordDto })
  @ApiOkResponse({ type: UserProfileResponse })
  @UsePipes(new BaseValidationPipe())
  async changePassword(@Body() input: UserPasswordDto, @Jwt() payload: JwtPayload): Promise<UserProfileResponse> {
    return this.profileService.changePassword(input, payload);
  }

  @Put('/fcm')
  @ApiOperation({ summary: `Update FCM Token` })
  @ApiBody({ type: UserFcmDto })
  @ApiOkResponse({ type: UserProfileResponse })
  @UsePipes(new BaseValidationPipe())
  async updateFcmToken(@Body() input: UserFcmDto, @Jwt() payload: JwtPayload): Promise<UserProfileResponse> {
    return this.profileService.updateFcmToken(input, payload);
  }

  @Delete('/')
  @ApiOperation({ summary: `Logout` })
  @ApiOkResponse({ type: UserLogoutDto })
  async logout(@Jwt() payload: JwtPayload): Promise<UserLogoutDto> {
    return this.profileService.revokedMe(payload);
  }

  @Delete('/revoke')
  @ApiOperation({ summary: `Revoke session` })
  @ApiBody({ type: UserRevokeDto })
  @ApiOkResponse({ type: UserLogoutDto })
  @UsePipes(new BaseValidationPipe())
  async revoke(@Body() input: UserRevokeDto, @Jwt() payload: JwtPayload): Promise<UserLogoutDto> {
    return this.profileService.revokedOther(input.tokenIds, payload);
  }
}
