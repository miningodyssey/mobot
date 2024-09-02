import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BotService} from "./bot/bot.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get(BotService)
  try {
    bot.startBot()
  } catch (err) {
    console.log(err)
    bot.startBot()
  }
  await app.listen(3000);
}
bootstrap();
