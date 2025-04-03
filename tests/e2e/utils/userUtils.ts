import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import { NewUser, User } from '../../../src/entities/User';
import { EntityToUser } from '../../../src/utils/mappers/EntityToUser';

export class UserUtils {
  constructor (
    private readonly prisma: PrismaClient,
  ) {}

  async create (data?: Partial<NewUser>): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data?.name ?? 'name',
        username: data?.username ?? randomBytes(4).toString('base64'),
      }
    });

    return EntityToUser(user);
  }

  async getById (id: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { id }
    });

    if (!user) return null;

    return EntityToUser(user);
  }
} 