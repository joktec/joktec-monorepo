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
  GatewayMetric,
  Get,
  JwtPayload,
  JwtPayloadData,
  Put,
  UseInterceptors,
  UsePipes,
} from '@joktec/core';
import { UserFcmDto, UserLogoutDto, UserPasswordDto, UserProfile, UserProfileDto, UserRevokeDto } from './models';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('profile')
@ApiBearerAuth()
@UseInterceptors(GatewayMetric)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/')
  @ApiOperation({ summary: `Get Profile` })
  @ApiOkResponse({ type: UserProfile })
  async getProfile(@JwtPayloadData() payload: JwtPayload): Promise<any> {
    return this.profileService.getProfile(payload);
  }

  @Put('/')
  @ApiOperation({ summary: `Update Profile` })
  @ApiBody({ type: UserProfileDto })
  @ApiOkResponse({ type: UserProfile })
  @UsePipes(new BaseValidationPipe({ skipMissingProperties: true }))
  async updateProfile(@Body() input: UserProfileDto, @JwtPayloadData() payload: JwtPayload): Promise<UserProfile> {
    return this.profileService.updateProfile(input, payload);
  }

  @Put('/password')
  @ApiOperation({ summary: `Change Password` })
  @ApiBody({ type: UserPasswordDto })
  @ApiOkResponse({ type: UserProfile })
  @UsePipes(new BaseValidationPipe())
  async changePassword(@Body() input: UserPasswordDto, @JwtPayloadData() payload: JwtPayload): Promise<UserProfile> {
    return this.profileService.changePassword(input, payload);
  }

  @Put('/fcm')
  @ApiOperation({ summary: `Update Registration ID` })
  @ApiBody({ type: UserFcmDto })
  @ApiOkResponse({ type: UserProfile })
  @UsePipes(new BaseValidationPipe())
  async updateRegistrationID(@Body() input: UserFcmDto, @JwtPayloadData() payload: JwtPayload): Promise<UserProfile> {
    return this.profileService.updateRegistrationID(input, payload);
  }

  @Delete('/')
  @ApiOperation({ summary: `Logout` })
  @ApiOkResponse({ type: UserLogoutDto })
  async logout(@JwtPayloadData() payload: JwtPayload): Promise<UserLogoutDto> {
    return this.profileService.revokedMe(payload);
  }

  @Delete('/revoke')
  @ApiOperation({ summary: `Revoke session` })
  @ApiBody({ type: UserRevokeDto })
  @ApiOkResponse({ type: UserLogoutDto })
  @UsePipes(new BaseValidationPipe())
  async revoke(@Body() input: UserRevokeDto, @JwtPayloadData() payload: JwtPayload): Promise<UserLogoutDto> {
    return this.profileService.revokedOther(input.tokenIds, payload);
  }
}
