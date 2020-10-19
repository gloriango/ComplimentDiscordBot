require('dotenv').config();

var complimenter = require("complimenter");


const Discord = require('discord.js');

const botClient = new Discord.Client();

const token = process.env.TOKEN
botClient.on('ready', () => {
    console.log("This bot is now online!");
});
 
botClient.on("message", msg => {
    if(msg.content == "compliment me?"){
        msg.reply(complimenter());
    };
});

botClient.login(token)