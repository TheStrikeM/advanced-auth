import { Injectable } from '@nestjs/common';
import { IUser, User } from './user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create({ firstName, lastName }: IUser) {
    const newUser = await this.usersRepository.create({ firstName, lastName });
    return newUser;
  }
}
