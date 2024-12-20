const {Bot, GrammyError, HttpError} = require('grammy')
require('dotenv').config()

const bot = new Bot(process.env.BOT_TOKEN)

bot.api.setMyCommands([
    {command: 'hello', description: 'Приветствие'},
    {command: 'start', description: 'Запустить бота'}
])

bot.command('start', async (ctx) => {
    await ctx.reply('Привет, я бот!')
})

bot.command(['hello', 'hi'], async (ctx) => {
    await ctx.reply('Привет!')
})

bot.on('message:voice', async (ctx) => {
    await ctx.reply('Получил гс!')
})

bot.hears('HTML', async (ctx) => {
    await ctx.reply('Что такое HTML?')
})

bot.catch((err) => {
    const ctx=err.ctx;
    console.log(`Error while handling update ${ctx.update.update_id}`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Could not contact Telegram:', e);
    } else {
        console.error('Unknown error:', e);
    }
})

bot.start()