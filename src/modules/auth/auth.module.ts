import { Module } from '@nestjs/common';
import UserModule from '../user/user.module';
import JwtStrategy from './strategies/jwt.strategy';
import AuthService from './services/auth.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, JwtModule],
})
export default class AuthModule {}
