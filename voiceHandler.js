const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config()

const connect = (channel) => {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    })
    // connection.subscribe(audioPlayer);
}

module.exports = { connect }