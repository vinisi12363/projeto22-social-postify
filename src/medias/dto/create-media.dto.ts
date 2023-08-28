import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
    @IsNotEmpty({ message: 'All filed are required!' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'All filed are required!' })
    @IsString()
    username: string;

}
