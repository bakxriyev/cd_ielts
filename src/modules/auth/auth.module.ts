import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminService } from '../admin/admin.service';
import { ClientService } from '../client/client.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../admin/model/admin.entity';
import { Client } from '../client/model/client.entity';
import { Otp } from '../otp/otp.entity';
import { OtpService } from '../otp/otp.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET') || 'secret',
        signOptions: { expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m' },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([Admin, Client,Otp]), // ← shu qatorda modeli import qilinishi shart
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminService, ClientService,OtpService],
  exports: [AuthService],
})
export class AuthModule {}
