import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiQuery({
    name: 'name',
    description: 'search all users with name',
    required: false,
  })
  @ApiOkResponse({ type: [User] })
  @ApiNotFoundResponse()
  findAll(@Query('name') name: string): User[] {
    const users = this.userService.findAll(name);
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id') id: string): User {
    return this.userService.findOneById(Number(id));
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBody({ type: CreateUserDTO })
  createUser(@Body('body') body: CreateUserDTO): User {
    return this.userService.addUser(body);
  }
}
