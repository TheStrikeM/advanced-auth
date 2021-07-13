import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.schema';
import { Repository } from 'typeorm';
import { DefaultUserDto } from '../dto/DefaultUserDto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { RegisterUserDto } from '../dto/RegisterUserDto';
import CryptoService from '../../crypto/crypto.service';
import { toUserDto } from '../dto/toUserDto';

@Injectable()
export default class UserRepository {
  constructor(
    private readonly cryptoService: CryptoService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(options?: object): Promise<DefaultUserDto> {
    const user: User = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({
    username,
    password,
  }: LoginUserDto): Promise<DefaultUserDto> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const isValidPassword = await this.cryptoService.comparePassword(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<DefaultUserDto> {
    return await this.findOne({ where: { username } });
  }

  async create(userDto: RegisterUserDto): Promise<DefaultUserDto> {
    const { username, email, password, firstName, lastName } = userDto;

    const isExistUser = await this.userRepo.findOne({ where: { username } });
    if (isExistUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const nowDate = new Date();

    const newUser: User = this.userRepo.create({
      username,
      email,
      password,
      firstName,
      lastName,
      registerDate: nowDate,
    });
    await this.userRepo.save(newUser);
    return toUserDto(newUser);
  }
}
