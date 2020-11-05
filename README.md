# ComplimentDiscordBot
A bot for discord which compliments people

steps on how i did it ->
1. put token into env file (make sure its in git ignore)
2. npm install dotenv
3. put require('dotenv').config(); at the top of the file which uses it 

to get compliments: npm install grantcodes/complimenter


For now this will automatically send a compliment if you type !compliment or !complimentMe
    if someone is mentioned, it will compliment that person and say that the typer complimeneted the mentioned person
    eg me: !compliment @you
    bot: @me wants to tell @you "compliment"

    if no one is mentioned, it will compliment the author of the message


