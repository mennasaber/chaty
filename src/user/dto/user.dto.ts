import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  firstName: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  lastName: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  phoneNumber: string;
}
