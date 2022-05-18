const { Client, Intents, MessageEmbed } = require('discord.js');
// const { join } = require('node:path');

const { VoiceConnectionStatus, getVoiceConnection  } = require('@discordjs/voice');

const schedule = require('./scheduleHandler')
const { connect, play } = require('./voiceHandler')
require('dotenv').config();

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({ intents: myIntents })

client.once('ready', () => {
  console.log(`Ready`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    // console.dir(interaction, {depth: null})
    const { commandName } = interaction;
    if(commandName === 'ping') await interaction.reply(`Hello from ${process.env.device || 'Heroku'}`)
    if(commandName === 'test') await interaction.reply('Bruh')
    if(commandName === 's') {
        const option = interaction.options.getString('argument') // เลือกคาบ
        if(option === 'f') {
            const embed = new MessageEmbed().setTitle('Attachment').setImage('attachment://img/IMG_0962.jpg');           
            await interaction.reply({ embeds: [embed], files: ['./img/IMG_0962.jpg'] })
        } else if(option === null) await interaction.reply(schedule()) 
        else await interaction.reply(schedule(option))
    }
    if(commandName === 'h') {
        await interaction.reply('ไม่ทำที')
    }
    if(commandName === 'r') {

        connect(interaction.channel)
        const connection = getVoiceConnection(interaction.channel.guild.id)
        connection.on(VoiceConnectionStatus.Ready, () => play(connection))

        await interaction.reply('test ohayo noise')
    }

})


client.login(process.env.CLIENT_TOKEN);
