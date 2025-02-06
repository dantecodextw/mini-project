import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedExceptionFilter } from './error-handlers/query-failed-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new QueryFailedExceptionFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
