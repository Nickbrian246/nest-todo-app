import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import {
  SigninDto,
  CreateUserDto,
  UserDto,
  JwtDto,
  ReplacePasswordDto,
} from './dto-for-auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async signup(createUserData: CreateUserDto) {
    try {
      const addClient = { ...createUserData, client: uuidv4() };
      const hashPassword = await hash(addClient.password);
      const addHashedPassword = { ...addClient, password: hashPassword };

      await this.userModel.create(addHashedPassword);
      return await this.signToken(addClient.client, addClient.email);
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException('Email duplicated');
      }
      throw new ForbiddenException(`${error}`);
    }
  }

  async signin(signinDto: SigninDto) {
    try {
      const { email, password } = signinDto;
      const user = await this.userModel.findOne<UserDto>({ email });
      const userPassword = user.password;

      const verifyPassword = await verify(userPassword, password);
      if (!verifyPassword) {
        throw new ForbiddenException('Contraseña incorrecta');
      }
      return await this.signToken(user.client, email);
    } catch (error) {
      throw new ForbiddenException(`${error}`);
    }
  }

  async replacePassword(passwordData: ReplacePasswordDto, userJwt: JwtDto) {
    try {
      const { client } = userJwt;
      const { currentPassword, newPassword } = passwordData;

      const user = await this.userModel.findOne<UserDto>({ client });

      const verifyPassword = await verify(user.password, currentPassword);
      if (!verifyPassword) {
        throw new ForbiddenException('Contraseña incorrecta');
      }

      const hashNewPassword = hash(newPassword);
      await this.userModel.findOneAndUpdate(
        { client },
        { $set: { password: hashNewPassword } },
        { new: true },
      );
      return HttpStatus.ACCEPTED;
    } catch (error) {
      throw new ForbiddenException(`${error}`);
    }
  }

  async signToken(client: string, email: string) {
    try {
      const payload = { client, email };
      const token = await this.jwt.signAsync(payload, {
        secret: `${process.env.JWT_SECRET_KEY}`,
      });
      return { token };
    } catch (error) {}
  }
}
