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

bot.onText(/\/ping/, (msg) => {
	const id=msg.chat.id;
	var axios = require('axios');
	var data = JSON.stringify({"id":1,"jsonrpc":"2.0","method":"getblockchaininfo","params":[]});
	var config = {
  		method: 'get',
  		url: 'https://lb-fullnode.incognito.org/fullnode',
  		headers: { 'Content-Type': 'application/json', 'Cookie': '__cfduid=d3e0ee5cd503ae6a446f48e7e071559911606139640'},
  		data : data
		};
	var startTime = new Date();
	
	axios(config)
	.then(function (response) {
		var time = new Date() - startTime;
  		console.log(JSON.stringify(response.data));
		var c=responce.getResponseCode();
		if (c==200)
			{bot.sendMessage(id, "The full node that the incognito app uses has a response code of " +c+" and response time of " + time + "ms, all appears normal.");
		})
		else {bot.sendMessage(id, "The full node that the incognito app uses has a response code of " +c+" and response time of " + time + "ms, that's not normal, I recommend going to we.incognito.org.");
		})
	.catch(function (error) {console.log(error);});
	
}
