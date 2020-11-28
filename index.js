require('dotenv').config();
const Discord = require('discord.js');
var complimenter = require("complimenter");
var insulter = require("insult");
const vader = require('vader-sentiment');

const botClient = new Discord.Client();

const token = process.env.TOKEN
const fetch = require("node-fetch");
botClient.on('ready', () => {
    console.log("This bot is now online!");
});

//****************************************************************************//
var wantsToTellMessages = ["you told me to tell ",
                                    "wants to tell "]

var loveMessages = ["I love you ❤️ "
                    , "I have a present for you "
                    , "Here is a present! "]

var wantsToTellLoveMessages = [" ❤️ ",
                               "Love you! "]

var dontBeUpset = ["Don't be sad! "
                  ,"Turn that frown upside down! "
                 ,"HEYHEY GUESS WHAT "
                , "HEYYYY "]

//****************************************************************************//
var evilInsult = "https://evilinsult.com/generate_insult.php?lang=en&type=json"

const getLinkContent = async (link) => {
    const response = await fetch(link, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch(() => {
        return ""
      })
        .then(data => {return data.insult})

      .catch(() => {
        return ""
      })

      return response
  }

//****************************************************************************//

botClient.on("message", msg => {
    if (msg.author.bot){
        return;
    }

    compliment = complimenter()
    insult = insulter.Insult()

    if (msg.content.startsWith("!help")){
        msg.channel.send("To get help: !help \n" +
                         "To generate an insult for yourself: !insult \n" +
                         "To insult someone else: !insult @personsName \n" +
                         "To generate a compliment for yourself: !compliment \n" +
                         "To compliment someone else: !compliment @personsName \n" + 
                         "To send a heart to yourself: !heart \n" +
                         "To send hearts to someone else: !heart @personsName \n" +
                         "If you post a negative message (measured using a sentient analysis tool) it will give you a compliment\n"+
                         "(Sentient analysis categorises the message between negative, neutral and positive")

    } else if (msg.content.startsWith("!compliment")) { 
        generateReply(compliment, msg)

    } else if (msg.content.startsWith("!insult")) {
        randomInsultTypeNumber = Math.floor(Math.random() * Math.floor(2))
        
        if (randomInsultTypeNumber == 0){
            generateReply(insult, msg)
            
        } else {            

            if (msg.mentions.users.first()) { 
                otherPerson = msg.mentions.users.first().id     
                wantsToTellComplimentInsult = getRandomElement(wantsToTellComplimentsInsults)
                specialInsult = getLinkContent(evilInsult).then(response=> {
                    msg.reply(wantsToTellComplimentInsult + "<@"+ otherPerson + "> '" + response + "'")
                    
                })
            } else {
                specialInsult = getLinkContent(evilInsult).then(response=> {
                  msg.reply(response)
                })
            }
        }

    } else if (msg.content.startsWith("!heart")) {

        if (msg.mentions.users.first()) { 
            otherPerson = msg.mentions.users.first().id   
            loveMessageConnector = getRandomElement(wantsToTellLoveMessages)
            msg.reply(loveMessageConnector +"<@"+otherPerson + "> \n" + makeHeart(15));

        } 
        else {
            loveMessage = getRandomElement(loveMessages)
            msg.reply(loveMessage + makeHeart(15))
        }
    }   
    
    // if message is a negative message compliment them - if its a happy/neutral message leave it alone
    // TO DO: need to make it have an on or off mode since it can be really spam-y or annoying
    else {
        intensity = vader.SentimentIntensityAnalyzer.polarity_scores(msg.content);
        // intensity is form {neg: x, neu: y, pos: z, compound: w} where x,y,z are floats that add to 1
        // w is float -> sums scores for each word in lexicon and noramlises them btween -1 and 1
        // + nsentiment: compound score >= 0.05
        // 0 sentiment: (compound score > -0.05) and (compound score < 0.05)
        // - sentiment: compound score <= -0.05

        // if the message is something negative, slap them with a compliment
        if (intensity.compound <= -0.05){
            dontBeUpsetMessage = getRandomElement(dontBeUpset)

            msg.reply(dontBeUpsetMessage + compliment)
        }
    }
});

//****************************************************************************//

// This will generate a reply message when used. 
// replyType is the type of response (insult or compliment) 
// msg is the message which activated the function
function generateReply(replyType, msg){
    // x replyTypes to @mentions
    if (msg.mentions.users.first()) { 
        otherPerson = msg.mentions.users.first().id
        wantsToTellConnector = getRandomElement(wantsToTellMessages)

        msg.reply(wantsToTellConnector + "<@" + otherPerson + "> '" + replyType + "'");
        } 
    // replyType to the person who typed the activation word
    else {
        msg.reply(replyType);
    }
}

//****************************************************************************//

function makeHeart (size){
    // making the top part
    string = "\n"
    symbol = ".."
    spacing = "  "
    for (a = (size/2); a < size + 1; a += 2){
        // making the space before the first peak
        for (firstSpace = 1; firstSpace < size - a; firstSpace +=2 ){
            string += spacing
        }
        // making the first peak
        for (firstPeak = 1; firstPeak< a+1; firstPeak +=1){
            string +=symbol
        }
        // space between peak
        for (space =1; space <size-a+1;space +=1){
            string += spacing

        }

        // second peak
        for (secondPeak = 1; secondPeak<a; secondPeak +=1){
            string += symbol
        }
        string += "\n"
    }

    // making the bottom half
    for (bottom = size; bottom >= -1; bottom = bottom - 2){
        // space before triangle 
        for (spaceBefore = bottom; spaceBefore < size; spaceBefore += 1){
            string += spacing 
        }

        for (triangleBase = 1; triangleBase <= (bottom*2+1);triangleBase +=1 ){
            string +=  symbol
        }
        string += "\n"
    }
    return string
}

//****************************************************************************//

function getRandomElement (array){
    let arrayLength = array.length
    let index = Math.floor(Math.random() * Math.floor(arrayLength))
    return array[index] 
}

//****************************************************************************//

botClient.login(token)