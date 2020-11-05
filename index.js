require('dotenv').config();
 
// import activationWords from "./activationWords.js"

var complimenter = require("complimenter");

const Discord = require('discord.js');

const botClient = new Discord.Client();

const token = process.env.TOKEN

botClient.on('ready', () => {
    console.log("This bot is now online!");
});

const activationWords = 
["compliment", 
   "sad", 
   ":("
]; 


botClient.on("message", msg => {
    if (msg.author.bot){
        return;
    }

    compliment = complimenter()

    // x compliments y 
    // check if an user is mentionned
    if (msg.mentions.users.first()) { 
        if (msg.content.includes("!compliment")){
        otherPerson = msg.mentions.users.first().id
        msg.reply("wants to tell <@"+otherPerson + "> '" + compliment + "'");
        } 
    }
    
    // compliment the person who was typing since theyre sad/want a compliment
    else if (activationWords.some(word => msg.content.toLowerCase().includes(word))){
        msg.reply(compliment);
    }

});


botClient.login(token)