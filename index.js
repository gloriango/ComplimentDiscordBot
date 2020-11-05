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
    compliment = complimenter()

    // compliment the person who was typing since theyre sad/want a compliment
    if (activationWords.some(word => msg.content.toLowerCase().includes(word))){
        msg.reply(compliment);
    }

    // x compliments y 
    // if (){
    //     otherPerson = "me"
    //     msg.reply("wants to tell " + otherPerson + "'" + compliment + "'");
    // }

});


botClient.login(token)