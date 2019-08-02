import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/websockets';
import * as socketio from 'socket.io';
import * as expressSession from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add websocket on your server
  app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
  // Connecting sockets to the server and adding them to the request
  // so that we can access them later in the controller
  const io = socketio(app.getHttpServer());
  app.set('io', io);

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(expressSession({
    secret: 'TWC_2018',
    resave: true,
    saveUninitialized: true,
  }));

  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('auth project')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
