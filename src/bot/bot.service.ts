import {Injectable} from '@nestjs/common';
import {Context, Telegraf} from 'telegraf';
import * as process from "process";

@Injectable()
export class BotService {
    private bot: Telegraf;

    constructor(
    ) {
    }


    initializeBot() {
        this.bot = new Telegraf(`${process.env.BOT_TOKEN}`);
        this.setupCommands();
    }

    private setupCommands() {
        this.bot.start(async (ctx) => {
            await ctx.replyWithPhoto('https://gateway.btfs.io/btfs/QmaZMBLAzn5imJZ77mF1TPie6p7gwPsdqS2suhUCepuA42', {
                caption: '👇 Choose an item from the menu',
                parse_mode: 'MarkdownV2',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🕹Play',
                                url: 'https://t.me/MiningOdysseyBot/Game',
                            },
                            {
                                text: 'Channel',
                                url: 'https://t.me/MINING_ODYSSEY',
                            },
                            {
                                text: 'FAQ',
                                url: "https://mining-odyssey.gitbook.io/mining_odyssey",
                            },
                        ],
                    ],
                },
            });
        });
    }

    startBot() {
        setTimeout(() =>
        {
            if (!this.bot) {
                this.initializeBot();
            }
            this.bot.launch()
        }, 30000)
    }
}