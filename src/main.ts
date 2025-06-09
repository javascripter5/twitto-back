import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.set('trust proxy', 1);
  // app.setGlobalPrefix('twitto');
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      }, 'ApiKeyAuth')
    // .addSecurity('ApiKeyAuth', {
    //   type: 'apiKey',
    //   in: 'header',
    //   name: 'Authorization',
    // })
    .addSecurityRequirements('ApiKeyAuth')
    .setTitle('TWITTO example')
    .setDescription('The TWITTO API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // if (config.NODE_ENV != 'dev')
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(config.port);
  console.log(`app listen on port http://localhost:${config.port}/api`);

  const ticTacToe = [
    ["X", null, null, null, null],
    ["X", null, null, null, null],
    ["X", null, null, null, null],
    ["X", null, null, null, null],
    ["X", null, null, null, null]
  ]

  function Winner(tictactoeArray) {
    let winner = null // X or O
    let rowChoosesn // index location of that winning row
    let columnChoosen // index location of that winning column
    let isRowWon = true
    let isColumnWon = true
    let intersect1st = true // check the first intersection line e.g [0][0] , [1][1] , [2][2]
    let intersect2nd = true // check the second intersection line e.g [0][2] , [1][1] , [2][0]
    for (let index = 0; index < tictactoeArray.length; index++) {
      isRowWon = true
      isColumnWon = true
      if (index != 0) {
        intersect1st = tictactoeArray[index][index] === tictactoeArray[index - 1][index - 1] && intersect1st
        intersect2nd = tictactoeArray[index][(tictactoeArray.length - 1) - index] === tictactoeArray[index - 1][(tictactoeArray.length - 1) - (index - 1)] && intersect2nd
      }

      for (let index2 = 0; index2 < tictactoeArray.length; index2++) {
        if (index2 != 0) {
          isRowWon = tictactoeArray[index][index2] == tictactoeArray[index][index2 - 1] && isRowWon
          if (isRowWon && (tictactoeArray.length - 1) === index2) {

            winner = tictactoeArray[index][index2]
            break;
          }

          isColumnWon = tictactoeArray[index2][index] == tictactoeArray[index2 - 1][index] && isColumnWon

          if (isColumnWon && (tictactoeArray.length - 1) === index2) {
            winner = tictactoeArray[index2][index]

            break;
          }
        }

      }
      if (isRowWon) rowChoosesn = index
      if (isColumnWon) columnChoosen = index
      console.log(winner);

      const intersectPoint = Math.ceil((tictactoeArray.length - 1) / 2)
      if ((intersect1st || intersect2nd) && (tictactoeArray.length - 1) === index) winner = tictactoeArray[intersectPoint][intersectPoint]
      if (winner) break;

    }

    return { winner, columnChoosen, rawChoosesn: rowChoosesn, intersect1st, intersect2nd }
  }

  console.log(Winner(ticTacToe));


}
bootstrap();
