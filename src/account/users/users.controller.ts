import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/validation/ZodPipe';
import { CreateUserSchema } from './dto/create.user.dto';

@Controller('user')
export class UsersController {
  
  @Post('create')
  async create_user(@Body(new ZodValidationPipe(CreateUserSchema)) body: any){
    /* */
  }

  @Get()
  async get_info_user(){}

  @Delete()
  async delete_user(){}

  @Put()
  async edit_user_info(){}

  @Post('check')
  async check_jwt(){}
}