require('dotenv').config();

var complimenter = require("complimenter");

const Discord = require('discord.js');

const botClient = new Discord.Client();

const token = process.env.TOKEN

botClient.on('ready', () => {
    console.log("This bot is now online!");
});

const activationWords = 
["!compliment",
"!complimentMe"

]; 

botClient.on("message", msg => {
    if (msg.author.bot){
        return;
    }

    compliment = complimenter()
    if (activationWords.some(word => msg.content.toLowerCase().includes(word))){
        // x complements y 
        if (msg.mentions.users.first()) { 
            otherPerson = msg.mentions.users.first().id
            msg.reply("wants to tell <@"+otherPerson + "> '" + compliment + "'");
            } 
        // compliment the person who wanted a compliment
        else {
            msg.reply(compliment);
        }
    }

    // maybe do some machine learning here -> if message is a SAD message compliment them
    // if its a happy/neutral message leave it alone - look for API? or make myself?

});

botClient.login(token)



