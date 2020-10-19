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
    "Compliment", 
    "Sad",
    ":("
]; 

botClient.on("message", msg => {
    // if(msg.content == "Compliment me?"){
    //     msg.reply(complimenter());
    // };

    if (activationWords.some(word => msg.content.includes(word))){
        msg.reply(complimenter());
    }
});


botClient.login(token)