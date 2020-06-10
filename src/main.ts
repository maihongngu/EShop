import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');
  const option = new DocumentBuilder()
    .setTitle('Eshop API')
    .setDescription('Eshop API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, option)

  SwaggerModule.setup('v1/api', app, document)
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
