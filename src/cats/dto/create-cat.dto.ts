import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator'

export class CreateCatDto {
  @IsString()
  @MinLength(1)
  name: string

  @IsInt()
  @IsPositive()
  age: number

  @IsString()
  @IsOptional() //debe ser optional en la Entity sino da error
  breed?: string
}
