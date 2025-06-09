import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CreateUserDto, SigninDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SessionsService } from '../sessions/sessions.service';
import { lookup } from 'geoip-lite';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ApiResponse } from 'src/utils/api-response/api-response';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
    private sessionsService: SessionsService,
    @Inject(REQUEST) private request: Request,
  ) { }



  async create(createUserDto: CreateUserDto) {

    let user = this.repo.create(createUserDto)
    let savedUser = await this.repo.save(user)
    return savedUser
  }




  async signup(createUserDto: CreateUserDto) {
    if ((await this.repo.findOne({ where: { email: createUserDto.email } }))) {
      throw new ConflictException('User already exist');
    }
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashedPassword

    let user = this.repo.create(createUserDto)
    let savedUser = await this.repo.save(user)
    if (user) {
      let { id } = await this.findOne(createUserDto.email)
    }
    return savedUser

  }

  async validateUser(signinDto: SigninDto): Promise<any> {
    let { email, password } = signinDto
    const user = await this.signin(email, password);
    if (user.email) {
      const { password, ...result } = user;
      const token = this.jwtService.sign(result)
      let device = this.request.headers['user-agent']
      let ip: any = this.request.ip

      await this.sessionsService.create({ user_id: user.id, device, ip })

      return {
        Authorization: "Bearer " + token,
        ...result
      };
    }
    return null;
  }


  async singWithoutEmail(request = this.request) {

    const ip: any = request.headers['clientIp'] ?? request.ip
    const device: any = request.headers['fingerprint'] ?? request.headers['user-agent']
    const ipInfo = lookup(ip)
    let user
    // console.log("______ip", ipInfo);

    user = await this.findOneBySession(device, ip)
    // console.log("_______user", user);

    if (!user) {

      user = await this.create({ country: (ipInfo?.country.toLowerCase() || ""), sessions: [{ device, ip }] })
      await this.sessionsService.create({ user_id: user.id, device, ip })
    }
    user = await this.findOneBySession(device, ip)

    const token = this.jwtService.sign(JSON.parse(JSON.stringify(user)))

    return {
      Authorization: "Bearer " + token,
      ...user
    };



  }
  async findOneBySession(device: string, ip: string) {
    return await this.repo.findOne({ where: { sessions: { ip: Equal(ip), device: Equal(device) } }, relations: { sessions: true } })

  }
  async findOneByOauthId(OauthId: string) {

  }
  findAll() {
    return this.repo.find()
  }

  async findOne(email: string) {

    let user = await this.repo.findOne({ where: { email } })
    if (!user) throw new NotFoundException('not Found user')
    return user
  }

  async findById(id: number) {
    let user = await this.repo.findOne({ where: { id } })
    if (!user) ApiResponse.notFoundResponse("en", "NOTFOUND")

    return ApiResponse.successResponse("en", "success", "OK", user)

  }

  async signin(email: string, password: string) {

    let user = await this.repo.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException('not Found user')
    }
    let isMatch = await bcrypt.compare(password, user.password);



    if (!isMatch) {
      throw new UnauthorizedException(' invalid password')
    }


    return user
  }

  async update(id: number, updateUserDto: any) {
    updateUserDto["id"] = id
    const savedUser = await this.repo.save(updateUserDto)
    const user = await this.findById(id)
    return ApiResponse.successResponse("en", "success", "OK", user.data)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
