import supertest from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/db/Prisma';
import { PostCreateDTO } from '../../src/dtos/Post/PostCreateDTO';
import { User } from '../../src/entities/User';
import { PostUtils } from './utils/postUtils';
import { UserUtils } from './utils/userUtils';

describe('Post router tests', () => {
  let postUtils: PostUtils;
  let author: User;

  beforeAll(async () => {
    const userUtils = new UserUtils(prisma);
    postUtils = new PostUtils(prisma);

    author = await userUtils.create();
  });
  
  test('Test post creation', async () => {
    const dto = {
      title: 'title',
      authorId: author.id,
    } as PostCreateDTO;
    
    const res = await supertest(app)
      .post('/api/posts')
      .send(dto)
      .expect(201);
    
    expect(res.body.post.title).toEqual(dto.title);
    expect(res.body.post.authorId).toEqual(dto.authorId);
  });

  test('Test post getting', async () => {
    const post = await postUtils.create(author.id);
    
    const res = await supertest(app)
      .get(`/api/posts/${post.id}`)
      .expect(200);
    
    expect(res.body.post.id).toEqual(post.id);
    expect(res.body.post.title).toEqual(post.title);
    expect(res.body.post.authorId).toEqual(post.authorId);
  });
});