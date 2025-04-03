import supertest from 'supertest';
import {app} from '../../src/app';
import {prisma} from '../../src/db/Prisma';
import {UserCreateDTO} from '../../src/dtos/user/UserCreateDTO';
import {UserUpdateDTO} from '../../src/dtos/user/UserUpdateDTO';
import {User} from '../../src/entities/User';
import {PostUtils} from './utils/postUtils';
import {UserUtils} from './utils/userUtils';

describe('User router tests', () => {
  let user: User;
  let userUtils: UserUtils;

  beforeAll(async () => {
    userUtils = new UserUtils(prisma);
    user = await userUtils.create();
  });

  // test('Test user creation', async () => {
  //   const dto = {
  //     name: 'name',
  //     username: 'username',
  //   } as UserCreateDTO;
    
  //   const res = await supertest(app)
  //     .post('/api/users')
  //     .send(dto)
  //     .expect(201);
    
  //   expect(res.body.user.name).toEqual(dto.name);
  //   expect(res.body.user.username).toEqual(dto.username);
  // });

  // test('Test getting user by id', async () => {
  //   const res = await supertest(app)
  //     .get(`/api/users/${user.id}`)
  //     .expect(200);

  //   expect(res.body.user.id).toEqual(user.id);
  //   expect(res.body.user.name).toEqual(user.name);
  //   expect(res.body.user.username).toEqual(user.username);
  // });

  test('Test user updating', async () => {
    const dto = {
      id: user.id,
      name: 'new name',
    } as UserUpdateDTO;

    const res = await supertest(app)
      .patch('/api/users')
      .send(dto)
      .expect(200);

    expect(res.body.user.id).toEqual(dto.id);
    expect(res.body.user.name).toEqual(dto.name);
    expect(res.body.user.username).toEqual(user.username);
  });

  test('Test getting user posts', async () => {
    const postUtils = new PostUtils(prisma);
    const post = await postUtils.create(user.id);

    const res = await supertest(app)
      .get(`/api/users/${user.id}/posts`)
      .expect(200);

    expect(res.body.posts[0].id).toEqual(post.id);
    expect(res.body.posts[0].authorId).toEqual(post.authorId);
    expect(res.body.posts[0].title).toEqual(post.title);
  });

  test('Test user deleting', async () => {
    const user = await userUtils.create();

    const testUser = await userUtils.getById(user.id);
    expect(testUser).not.toBeNull();

    await supertest(app)
      .delete(`/api/users/${user.id}`)
      .expect(200);

    const userEntity = await userUtils.getById(user.id);
    expect(userEntity).toBeNull();
  });
});