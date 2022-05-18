const { Client, Intents, MessageEmbed } = require('discord.js');
const { join } = require('node:path');

const { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel  } = require('@discordjs/voice');

const schedule = require('./scheduleHandler')
const { connect, play } = require('./voiceHandler')
require('dotenv').config();

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({ intents: myIntents })

let connection=null;

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
        if(!connection){
            connection = joinVoiceChannel({
                channelId: interaction.channel.id,
                guildId: interaction.channel.guild.id,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator
            })
        }
        const player = createAudioPlayer();
        const resource = createAudioResource(join(__dirname, 'OhayoOniiChan.mp3'));
        try {
            player.play(resource);
            connection.subscribe(player)
            setTimeout(() => {
                player.stop()
                connection.destroy();
            }, 25000)
        } catch {
            player.stop()
            connection.destroy();
        }
        await interaction.reply('test ohayo noise')
    }

})


client.login(process.env.CLIENT_TOKEN);
