require('dotenv').config();
const Discord = require('discord.js');

var complimenter = require("complimenter");
var insulter = require("insult");
const vader = require('vader-sentiment');

const botClient = new Discord.Client();

const token = process.env.TOKEN

botClient.on('ready', () => {
    console.log("This bot is now online!");
});

// const activationWords =  ["!compliment" ]; 

botClient.on("message", msg => {
    if (msg.author.bot){
        return;
    }

    compliment = complimenter()
    insult = insulter.Insult()

    // if (activationWords.some(word => msg.content.toLowerCase().includes(word))){
    if (msg.content.toLowerCase().includes("!help")){
        msg.channel.send("To generate a compliment for yourself: !compliment \n To compliment someone else: !compliment @personsName \n To generate an insult for yourself: !insult \n To insult someone else: !insult @personsName \n To get help: !help \n if you post a negative message (measured using sentient analysis) it will give you a compliment")

    } else if (msg.content.toLowerCase().includes("!compliment")) { 
        generateReply(compliment, msg)

    }  else if (msg.content.toLowerCase().includes("!insult")) { 
        generateReply(insult, msg)
        
    // if message is a negative message compliment them - if its a happy/neutral message leave it alone
    // TO DO: need to make it have an on or off mode since it can be really spam-y or annoying
    } else {
        intensity = vader.SentimentIntensityAnalyzer.polarity_scores(msg.content);
        // intensity is form {neg: x, neu: y, pos: z, compound: w} where x,y,z are floats that add to 1
        // and w is the rating overall of the negative
        // if the message is something negative, slap a compliment to them without consent 
        if (intensity.compound <= -0.05){
            msg.reply("Don't be upset! " + compliment)
        }
    }
});

function generateReply(replyType, msg){
    // x replyTypes to @mentions
    if (msg.mentions.users.first()) { 
        otherPerson = msg.mentions.users.first().id
        msg.reply("wants to tell <@"+otherPerson + "> '" + replyType + "'");
        } 
    // replyType to the person who typed the activation word
    else {
        msg.reply(replyType);
    }
}
    

botClient.login(token)