const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule-tz');
var keyFile = "";
try{
    keyFile = require('./key.js');
} catch(err) {

}

// replace the value below with the Telegram token you receive from @BotFather
const token = keyFile.token || process.env.token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

var init = 0;
var globalChatId = "";
var floorListEnv = process.env.floorList;
if (floorListEnv) {
    floorListEnv = floorListEnv.split(' ');
}
var floorList = keyFile.floorList || floorListEnv;

console.log(token, floorList);

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  globalChatId = chatId;
  bot.sendMessage(globalChatId, 'This bot tells you who will mark the day\'s attendance at exactly 9 PM everyday. Thanks.');
});

var rule = new schedule.RecurrenceRule();
rule.hour = 15;
rule.minute = 30;
// rule.second = 5;
rule.tz = 'Asia/Kolkata';

schedule.scheduleJob(rule, function(){
    if (globalChatId != ""){
        if (init == floorList.length){
            init = 0;
        }
        bot.sendMessage(globalChatId, floorList[init] + ' will mark today\'s attendance.');
        init++;
    }
});

setInterval(()=> {
    console.log(globalChatId, init, floorList[init]);
},10000);