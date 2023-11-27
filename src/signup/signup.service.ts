import { Injectable } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { Signup } from './entities/signup.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SignupService {
  apidata: any;
  constructor(
    @InjectRepository(Signup) private userRepository: Repository<Signup>
){}
  // getAllUsers() {
  //   throw new Error('Method not implemented.');
  // }
  // deleteUser(id: number) {
  //   throw new Error('Method not implemented.');
  // }
  // updateUser(id: number, data: UpdateSampleDto) {
  //   throw new Error('Method not implemented.');
  // }
  // createUser(data: CreateSignupDto) {
  //   throw new Error('Method not implemented.');
  // }
  // create(createSignupDto: CreateSignupDto) {
  //   return 'This action adds a new signup';
  // }

  // findAll() {
  //   return `This action returns all signup`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} signup`;
  // }

  // update(id: number, updateSignupDto: UpdateSignupDto) {
  //   return `This action updates a #${id} signup`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} signup`;
  // }
  async createUser(obj:any){
    // console.log('service',createUserDto);
    return await this.userRepository.save(obj);
  }

  async getAllUsers(){
    return await this.userRepository.find({
      select:['id','username','password','createdAt','deletedAt']
    });
    // return await
  }
  async editUser(id:number) {
    try {
      const options: FindOneOptions<Signup> = {
        where: {id:id},
      };
      const data = await this.userRepository.findOne(options);
      return data;
    } catch (error) {
      console.error('Error in getByID:', error);
      throw new Error(`Unable to fetch student.${error.message}`);
    }
  }
  async updateUser(id:number, updateSampleDto:any){
    return await this.userRepository.update(id,updateSampleDto)
  }
  async deleteUser(id:number){
    try{
      return await this.userRepository.softDelete({id});
    }
    catch (error) {
      console.error('Error deleting user:', error);
      throw new Error(`Unable to delete user. ${error.message}`);
  }
  }  
}
