import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: any = [{ id: 1, name: 'test' }];

  findAll() {
    return this.users;
  }

  findOneById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  addUser(body: CreateUserDTO): User {
    const newUser = { id: Date.now(), ...body };
    this.users.push(newUser);
    return newUser;
  }
}
