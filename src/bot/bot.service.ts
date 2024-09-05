import {Injectable} from '@nestjs/common';
import {Context, Telegraf} from 'telegraf';
import * as process from "process";
import * as i18n from 'i18n';

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
            const languageCode = ctx.from?.language_code || 'en';
            i18n.setLocale(languageCode);

            await ctx.replyWithPhoto('https://gateway.btfs.io/btfs/QmaZMBLAzn5imJZ77mF1TPie6p7gwPsdqS2suhUCepuA42', {
                caption: i18n.__('welcome_message'),
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