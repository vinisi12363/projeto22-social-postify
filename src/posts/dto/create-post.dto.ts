import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
export class CreatePostDto {
    @IsOptional()
    @IsNumber()
    id: number;
    
    
    @IsNotEmpty({ message: 'All filed are required!' })
    @IsString()
    title: string;


    @IsNotEmpty({ message: 'All filed are required!' })
    @IsString()
    text: string;

    @IsUrl()
    @IsOptional ()
    image?: string;
}
