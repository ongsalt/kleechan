const { Client, Intents, MessageEmbed } = require('discord.js');
// const { join } = require('node:path');

const schedule = require('./scheduleHandler')
const { ohayo, autoOhayo } = require('./voiceHandler')
require('dotenv').config();

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({ intents: myIntents })

let voiceChannel;

client.once('ready', () => {
    console.log(`[main/onceReady] Ready`);
    // voiceChannel = client.channels.cache.find(c => c.id === process.env.CHANNEL_ID)
    // migrate to voiceHandler -> timeBased event later
    autoOhayo(client)
    console.log('[main/onceReady] set up finished')
    if(process.env.device === 'development machine') {
        const presence = client.user.setActivity('code changes - Test build not for use', { type: 'WATCHING' })
        console.log(`Activity set to ${presence.activities[0].name}`)
    }

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    // console.dir(interaction, {depth: null})
    const { commandName } = interaction;
    if (commandName === 'ping') await interaction.reply(`Hello from ${process.env.device || 'Heroku'}`)
    if (commandName === 'test') await interaction.reply('Bruh')
    if (commandName === 's') {
        const option = interaction.options.getString('argument') // เลือกคาบ
        const msg = schedule(option)
        if (msg.isEmbed) await interaction.reply({ embeds: [msg.embed] })
        else await interaction.reply(msg.reply)
    }
    if (commandName === 'h') {
        await interaction.reply('ไม่ทำที')
    }
    if (commandName === 'r') {
        ohayo(interaction.channel) // voiceChannel
        // await interaction.reply('test ohayo noise')
    }
    // console.log('[main/onInteractionCreate] ready')


})

process.on('SIGINT', () => {
    // do something
    client.destroy()
    console.log('destroyed client')
    process.exit();
})



client.login(process.env.CLIENT_TOKEN);