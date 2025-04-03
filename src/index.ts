import { app } from './app';
import { config } from './config';
import {prisma} from './db/Prisma';

(async () => {
  await prisma.$connect();
  
  app.listen(config.PORT, () => {
    console.log(`Listen on http://localhost:${config.PORT}`)
  });
})()

