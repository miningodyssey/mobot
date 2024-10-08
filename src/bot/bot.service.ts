import {Injectable} from '@nestjs/common';
import {Context, Telegraf} from 'telegraf';
import * as process from "process";
import {I18nService} from "nestjs-i18n";
import {menuMessage} from "../../locales/menuMessage";


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
            const message = () => {
                if (languageCode == 'ru') {
                    return menuMessage.welcomemessageru
                } else {
                    return menuMessage.welcomemessageen
                }
            }
            await ctx.replyWithPhoto('https://gateway.btfs.io/btfs/QmaZMBLAzn5imJZ77mF1TPie6p7gwPsdqS2suhUCepuA42', {
                caption: message(),
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
                            {
                                text: 'Chat',
                                url: "https://t.me/+kQLC5vQitXsxNTcy",
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
        }, 5000)
    }
}