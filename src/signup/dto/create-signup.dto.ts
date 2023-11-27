import { ApiProperty } from "@nestjs/swagger";

export class CreateSignupDto {
    @ApiProperty()
    username:string;

    @ApiProperty()
    password:string;
}
