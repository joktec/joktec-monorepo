import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  firstName: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  lastName: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  phoneNumber: string;

  @Field(() => Int, {
    nullable: false,
  })
  @IsNotEmpty()
  gender: number;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  title: string;

  @Field(() => String, {
    nullable: false,
  })
  address: string;

  @Field(() => String, {
    nullable: false,
  })
  socialLink: string;
}
