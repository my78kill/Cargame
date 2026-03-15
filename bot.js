const TelegramBot = require("node-telegram-bot-api");

const token = "8646018924:AAHl6hZac-rEtZu46eKRVGiV_e951KcJqKk";

const bot = new TelegramBot(token,{polling:true});

bot.on("inline_query",(query)=>{

bot.answerInlineQuery(query.id,[

{
type:"game",
id:"1",
game_short_name:"car_race"
}

]);

});