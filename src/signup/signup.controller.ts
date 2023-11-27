import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { Response,Request } from 'express';
import { UpdateSignupDto } from './dto/update-signup.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  // @Post()
  // create(@Body() createSignupDto: CreateSignupDto) {
  //   return this.signupService.create(createSignupDto);
  // }

  // @Get()
  // findAll() {
  //   return this.signupService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.signupService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSignupDto: UpdateSignupDto) {
  //   return this.signupService.update(+id, updateSignupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.signupService.remove(+id);
  // }
  @Post('createUser')
  async createUser(@Req() req:Request, @Res() res:Response, @Body() data:any){
    try{
      console.log('data', data);
      data['createdBy']=1;
      const user = await this.signupService.createUser(data);
      console.log('user',user);
      res.status(HttpStatus.OK).json({
        message:'user created successfully',
        data:user
      });
    }
    catch(error){
      console.log(error);  
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'something went wrong'
      });
    }
  }
  @Get('getUsers')
  async getuser(@Req() req:Request, @Res() res: Response){
    try{
      const user =await this.signupService.getAllUsers();
      res.status(HttpStatus.OK).json({
        message:'Users fetched successfully',
        data:user
      });
    }
    catch(error){
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'something went wrong'
      });
    }
  }
  @Get('getUsers/:id')
  async editUser(@Param('id') id: number, @Res() res: Response) {
    console.log('??',id)
    try {
      const data = await this.signupService.editUser(id);
      res
        .status(HttpStatus.OK)
        .json({ message: `id:${id} was succussfully`, data: data });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
  @Put('updateUser/:id')
  async updateuser(@Req() req:Request, @Res() res: Response, @Param('id') id:number, @Body() data:UpdateSignupDto){
    try{
      data['updatedBy']=1;
      const user =await this.signupService.updateUser(id,data);
      res.status(HttpStatus.OK).json({
        message:'Users updated successfully',
        data:user
      });
    }
    catch(error){
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:'something went wrong'
      });
    }
  }
  @Delete('delete/:id')
  async deteleUser(@Req() req:Request,@Res() res:Response,@Param('id') id:number)
  {
    try {
      console.log(id);
      let user=await this.signupService.deleteUser(id);
      res.status(HttpStatus.OK).json({
          message:'deleted successfully',
          data:user
      })
    }
    catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"the data was not deleted"
      });
    }
  }
}
