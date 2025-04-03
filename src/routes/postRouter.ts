import {Router} from 'express';
import {WithBody, WithParams} from '../utils/ExpressCore';
import {PostCreateDTO, PostCreateResponse} from '../dtos/Post/PostCreateDTO';
import {PostServiceDI} from '../di/services/PostServiceDI';
import { Response } from 'express';
import {PostGetByIdDTO, PostGetByIdResponse} from '../dtos/Post/PostGetByIdDTO';

const postRouter = Router();

postRouter.post('/', async (req: WithBody<PostCreateDTO>, res: Response<PostCreateResponse>) => {
  const post = await PostServiceDI.create({
    title: req.body.title,
    authorId: +req.body.authorId,
  });
  
  res.status(201).json(post);
});

postRouter.get('/:id', async (req: WithParams<PostGetByIdDTO>, res: Response<PostGetByIdResponse>) => {
  const post = await PostServiceDI.getById({
    id: +req.params.id,
  });
  
  res.json(post);
});

export { postRouter };