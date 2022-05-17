const { Client, Intents, MessageEmbed } = require('discord.js');
const schedule = require('./scheduleHandler')
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
  console.log(`Ready`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    // console.dir(interaction, {depth: null})
    const { commandName } = interaction;
    if(commandName === 'ping') await interaction.reply('pong')
    if(commandName === 'test') await interaction.reply('Bruh')
    if(commandName === 's') {
        const option = interaction.options.getString('เลือกคาบ')
        if(option === 'f') {
            const embed = new MessageEmbed().setTitle('Attachment').setImage('attachment://IMG_0962.jpg');           
            await interaction.reply({ embeds: [embed], files: ['./IMG_0962.jpg'] })
        } else await interaction.reply(schedule(option))
    }
    if(commandName === 'h') {
        
    }

})


client.login(process.env.CLIENT_TOKEN);
