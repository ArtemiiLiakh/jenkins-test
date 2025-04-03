import { PrismaClient } from '@prisma/client';
import { NewUser, User } from '../entities/User';
import { EntityToUser } from '../utils/mappers/EntityToUser';

export class UserRepository {
  constructor (
    private readonly prisma: PrismaClient,
  ) {}
  
  async getByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { username },
    });

    if (!user) return null;

    return EntityToUser(user);
  }

  async create (user: NewUser): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
      }
    });
    
    return EntityToUser(newUser);
  }

  async findById (id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id }
    });

    if (!user) {
      throw new Error('User with this id not found')
    }

    return EntityToUser(user);
  }

  async update (id: number, data: Partial<NewUser>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        username: data.username,
      }
    });

    return EntityToUser(user);
  }

  async delete (id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

