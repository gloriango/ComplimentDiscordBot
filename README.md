# ComplimentDiscordBot (and also insults)
A bot for discord which compliments people
(also insults people and send hearts)

<h2> Commands </h2>
* To get help: !help 
* To generate an insult for yourself: !insult
* To insult someone else: !insult @personsName
* To generate a compliment for yourself: !compliment
* To compliment someone else: !compliment @personsName
* To send a heart to yourself: !heart
* To send hearts to someone else: !heart @personsName
* If you post a negative message (measured using a sentient analysis tool) it will give you a compliment (Sentient analysis categorises the message between negative, neutral and positive)

<h2> How to use it </h2>
Make sure to 

1. Put token into env file (make sure its in git ignore)
2. ``` npm install ```
   * "complimenter": "github:grantcodes/complimenter",
   * "discord.js": "^12.3.1",
   * "dotenv": "^8.2.0",
   * "insult": "0.0.3",
   * "node-fetch": "^2.6.1",
   * "vader-sentiment": "^1.1.3"
3. ```  npm start ``` to run the discord bot (after adding it to the server)

