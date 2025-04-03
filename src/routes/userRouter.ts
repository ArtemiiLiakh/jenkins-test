import {WithBody, WithParams} from '../utils/ExpressCore';
import {UserCreateDTO, UserCreateResponse} from '../dtos/user/UserCreateDTO';
import express, {Response} from 'express';
import {UserServiceDI} from '../di/services/UserServiceDI';
import {UserGetByIdDTO, UserGetByIdResponse} from '../dtos/user/UserGetByIdDTO';
import {UserUpdateDTO} from '../dtos/user/UserUpdateDTO';
import {UserDeleteDTO, UserDeleteResponse} from '../dtos/user/UserDeleteDTO';
import {OkMessage} from '../dtos/OkMessage';
import {UserGetPostsDTO, UserGetPostsResponse} from '../dtos/user/UserGetPostsDTO';

const userRouter = express.Router();

userRouter.post('/', async  (req: WithBody<UserCreateDTO>, res: Response<UserCreateResponse>) => {
  const user = await UserServiceDI.create({
    name: req.body.name,
    username: req.body.username,
  });
  
  res.status(201).json(user);
});

userRouter.get('/:id', async (req: WithParams<UserGetByIdDTO>, res: Response<UserGetByIdResponse>) => {
  const user = await UserServiceDI.getById({
    id: +req.params.id
  });
  
  res.json(user);
});

userRouter.patch('/', async (req: WithBody<UserUpdateDTO>, res: Response<UserGetByIdResponse>) => {
  const user = await UserServiceDI.update({
    id: +req.body.id,
    name: req.body.name,
    username: req.body.username,
  });
  
  res.json(user);
});

userRouter.delete('/:id', async (req: WithParams<UserDeleteDTO>, res: Response<OkMessage>) => {
  await UserServiceDI.delete({
    id: +req.params.id,
  });
  
  res.send({
    message: 'ok',
  });
});

userRouter.get('/:id/posts', async (req: WithParams<UserGetPostsDTO>, res: Response<UserGetPostsResponse>) => {
  const posts = await UserServiceDI.getPosts({
    id: +req.params.id,
  });
  
  res.json(posts);
});

export { userRouter };