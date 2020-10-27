const TelegramBot = require('node-telegram-bot-api');
const token = 'bot token here';
const bot = new TelegramBot(token, {polling:true});

const mysql = require('mysql'); // for future development
const dbn = 'your db name here';
const dbp = 'your db password here';

console.log("Reporting for duty");

function test(){console.log("You don't test me, I test you!");}

// ************************************** BOT CODE ********************************************************

/*
bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	// send a message to the chat acknowledging receipt of their message
	bot.sendMessage(chatId, 'Received your message');
});
*/

bot.onText(/\/price/, (msg) => {
	console.log("Entered price function at "+Date.now());
	var id=msg.chat.id;
	var axios = require('axios');
	var p="PRV price update failed";
	var config = {method: 'get', url: 'https://api.incscan.io/pdex/market', headers: {}};

	axios(config).then(function (response) {console.log(JSON.stringify(response.data));
		bot.sendMessage(id,"Average PRV price: $"+ JSON.parse(response.data.lastPRVPrice));
	})
	.catch(function (error) {console.log(error);bot.sendMessage(id, "Request failed, sorry...")});
});

bot.onText(/\/test/, (msg) => {
        const id=msg.chat.id;
        test();
        bot.sendMessage(id, "You don' test me, I test you!");
});

