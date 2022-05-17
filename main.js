const { Client, Intents } = require('discord.js');
require('dotenv').config(); //initialize dotenv

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
  console.log(`Ready`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    
    const { commandName } = interaction;
    if(commandName === 'ping') await interaction.reply('pong')
    if(commandName === 'test') await interaction.reply('Bruh')

})

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
