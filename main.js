const { Client, Intents, MessageEmbed } = require('discord.js');
// const { join } = require('node:path');

const { VoiceConnectionStatus, getVoiceConnection  } = require('@discordjs/voice');

const schedule = require('./scheduleHandler')
const { ohayo, autoOhayo } = require('./voiceHandler')
require('dotenv').config();

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({ intents: myIntents })

let voiceChannel; 

client.once('ready', async () => {
    console.log(`Ready`);
    voiceChannel = client.channels.cache.find(c => c.id === '933913606863589421')
    await autoOhayo(voiceChannel)
    // console.dir(client.channels.cache.find(id => id === '933913606863589421'), {depth: null})
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
        ohayo(interaction.channel) // voiceChannel
        await interaction.reply('test ohayo noise')
    }


})



client.login(process.env.CLIENT_TOKEN);