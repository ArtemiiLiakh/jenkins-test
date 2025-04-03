import {prisma} from '../src/db/Prisma';

beforeAll(async () => {
  await prisma.$connect();
  
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.$disconnect();
});