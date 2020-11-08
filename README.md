# ComplimentDiscordBot
A bot for discord which compliments people
(and also for now insults people)

steps on how i did it ->
1. put token into env file (make sure its in git ignore)
2. npm install dotenv
3. put require('dotenv').config(); at the top of the file which uses it 

to get compliments: npm install grantcodes/complimenter


commands
To get help: !help
To generate an insult for yourself: !insult
To insult someone else: !insult @personsName
To generate a compliment for yourself: !compliment
To compliment someone else: !compliment @personsName
If you post a negative message (measured using a sentient analysis tool) it will give you a compliment
(Sentient analysis categorieses the message betwen negative, neutral and positive)
