import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { encrypt } from '../common/helpers/crypto';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserInput) {
    const exists = await this.prisma.user.findUnique({
      where: { email: user.email }
    });

    if (exists) {
      throw new BadRequestException(
        'An user with the provided email already exists.'
      );
    }

    return this.prisma.user.create({
      data: {
        ...user,
        password: encrypt(user.password)
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        status: true,
        role: true,
        created_at: true,
        updated_at: true,
        removed_at: false
      },
      where: {
        NOT: {
          status: 'REMOVED'
        }
      }
    });
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}
