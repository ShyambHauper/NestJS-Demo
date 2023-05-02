/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${process.env.PORT}`);
  });

  app.enableCors();

}
bootstrap();
