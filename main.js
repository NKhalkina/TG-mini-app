//импортируем конструктор Telegraf и Markup, чтобы работать в дальнейшем на клавиатуре
import { Telegraf, Markup } from "telegraf"
import { message } from "telegraf/filters"


const token = '7388951322:AAGufsUl0WV_ulfPqD-YMV3Vu0AmsI2PuFg'
const webAppUrl = 'https://tg-angular-app-be394.web.app/'

//создаем бота
const bot = new Telegraf(token)
//обработаем одну команду с помощью метода .command - метод start, далее получаем контекст, с помощью которого мы можем ответить
bot.command('start', (ctx) => {
    //вызовем метод .reply()
    ctx.reply(
        'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.keyboard([
            //создаем кнопку, которая будет запускать web-приложение
            Markup.button.webApp('Отправить сообщение', `${webAppUrl}/feedback`)])
    )
})
//дастаем данные, которые прилетели
bot.on(message('web_app_data'), async (ctx) => {
    const data = ctx.webAppData.data.json()
    ctx.reply(`Ваше сообщение: ${data?.feedback}` ?? 'empty message')
})
//запускаем бот
bot.launch()