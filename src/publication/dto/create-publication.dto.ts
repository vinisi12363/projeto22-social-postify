import { IsDateString, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
export class CreatePublicationDto {
    @IsOptional()
    @IsNumber()
    id? : number;

    @IsNotEmpty( { message:'All fields are required' } )
    @IsNumber()
    @Min(1)
    mediaId: number;

    @IsNotEmpty( { message:'All fields are required' } )
    @IsNumber()
    @Min(1)
    postId: number;

    @IsNotEmpty({ message:'All fields are required' })
    @IsDateString()
    date: Date;

}
