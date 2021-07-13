import { Module } from '@nestjs/common';
import UserRepository from './repositories/user.repository';
import CryptoModule from '../crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.schema';

@Module({
  imports: [CryptoModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export default class UserModule {}
