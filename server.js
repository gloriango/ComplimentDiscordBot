const express = require('express')
const app = express()
const port = 3000

require('dotenv').config();

function getMessage(){

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
        console.log("GAVE A COMPLIMENT")
        // maybe do some machine learning here -> if message is a SAD message compliment them
        // if its a happy/neutral message leave it alone - look for API? or make myself?

    });

    botClient.login(token)

}


app.get('/', (req, res) => {
   getMessage()
  res.send('THIS BOT IS ONLINE NOW')
})

app.listen(port, () => {
  console.log("Example app listening at http://localhost:${port}")
})