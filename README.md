# ComplimentDiscordBot
A bot for discord which compliments people
(and also for now insults people)

steps on how i did it ->
1. put token into env file (make sure its in git ignore)
2. npm install dotenv
3. put require('dotenv').config(); at the top of the file which uses it 

to get compliments: npm install grantcodes/complimenter
to get insults: npm install grantcodes/insult
to get sentient analysis: npm install --save vader-sentiment
(I used this one specifically since I needed it to be javascript https://github.com/nimaeskandary/vaderSentiment-js?fbclid=IwAR3vPg23cH3fGz6rSr2VwYaMBKjK9PbpnwTi--TZKI9DSU7NTEUkzlEI4Mc)



commands
To get help: !help \n
To generate an insult for yourself: !insult\n
To insult someone else: !insult @personsName\n
To generate a compliment for yourself: !compliment\n
To compliment someone else: !compliment @personsName\n
To send a heart to yourself: !heart\n
To send hearts to someone else: !heart @personsName\n
If you post a negative message (measured using a sentient analysis tool) it will give you a compliment\n
(Sentient analysis categorises the message between negative, neutral and positive)\n


                     
