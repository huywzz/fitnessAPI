import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpEmailDto } from './dto/signUpEmail.dto';
import { LoginEmailDto } from './dto/loginEmail.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { LoginSocialDto } from './dto/loginSocial.dto';
import { firebaseAdmin } from '@/shared/firebase/firebase.config';
import { InjectModel } from '@nestjs/mongoose';
import { Goal } from '@/schema/goal.schema';
import { Model } from 'mongoose';
import { Category } from '@/schema/category.schema';
import { Role } from '@/schema/enums/role.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Goal.name) private goalModel: Model<Goal>,
    @InjectModel(Category.name) private cateModel: Model<Category>,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}

  async test() {
    const newUser = new this.cateModel({
      name: 'Co chan',
      image:
        'https://citigym.com.vn/storage/uploads/hoanghh-seo/len-co-chan-hieu-qua-voi-7-bai-tap-chan-moi-ngay-1.jpg',
    });
    return await newUser.save();
  }

  async signUpEmail(signUpEmailDto: SignUpEmailDto) {
    const passwordHashed = await bcrypt.hash(signUpEmailDto.password, 10);
    const user = await this.userService.create(signUpEmailDto.email, passwordHashed);

    return user;
  }

  async loginByEmail(dto: LoginEmailDto) {
    const { email, password } = dto;
    const foundUser = await this.userService.findOneOrThrowByEmail(email);

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new BadRequestException('Email or password is wrong');
    }
    const token = this.getAccessToken(foundUser._id, email);

    return {
      accessToken: token,
      email: foundUser.email,
      role: foundUser.role,
    };
  }

  async loginWithoutUser(dto: LoginEmailDto) {
    const { email, password } = dto;
    const foundUser = await this.userService.findOneOrThrowByEmail(email);

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new BadRequestException('Email or password is wrong');
    }
    if (foundUser.role === Role.USER) {
      throw new ForbiddenException();
    }
    const token = this.getAccessToken(foundUser._id, email);

    return {
      accessToken: token,
      email: foundUser.email,
      role: foundUser.role,
    };
  }

  getAccessToken(userId: any, email: string) {
    const payload = { sub: userId, email: email };
    return this.jwtService.sign(payload);
  }

  async loginSocial(dto: LoginSocialDto) {
    const { idToken, email } = dto;
    const { name, picture } = await firebaseAdmin.auth().verifyIdToken(idToken);
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      const newUser = await this.userService.createBySocial(email, name);
      const token = this.getAccessToken(newUser._id, email);

      return {
        accessToken: token,
        email: newUser.email,
      };
    }
    const token = this.getAccessToken(user._id, email);
    return {
      accessToken: token,
      email: user.email,
    };
  }
}
