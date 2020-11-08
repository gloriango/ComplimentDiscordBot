require('dotenv').config();

var complimenter = require("complimenter");

const vader = require('vader-sentiment');

const Discord = require('discord.js');

const botClient = new Discord.Client();

const token = process.env.TOKEN

botClient.on('ready', () => {
    console.log("This bot is now online!");
});

const activationWords = 
["!compliment"
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
        
    // if message is a negative message compliment them
    // if its a happy/neutral message leave it alone
    // TO DO: need to make it have an on or off mode since it can be really spam-y or annoying
    } else {

        intensity = vader.SentimentIntensityAnalyzer.polarity_scores(msg.content);
        // intensity is form {neg: 0.0, neu: 0.299, pos: 0.701, compound: 0.8545}
        // if the message is something negative, slap a compliment to them without consent 
        if (intensity.compound <= -0.05){
            msg.reply("Don't be upset! " + compliment)
        }
    }

});

botClient.login(token)