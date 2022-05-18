const { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel, AudioPlayerStatus  } = require('@discordjs/voice');
const { join } = require('node:path')

const connect = (channel) => joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator
})


const play = (connection) => {
    const player = createAudioPlayer();
    const resource = createAudioResource(join(__dirname, 'OhayoOniiChan.mp3'), {
        inlineVolume: true
    });
    resource.volume.setVolume(0.3)
    try {
        player.play(resource);
        connection.subscribe(player)
        player.on(AudioPlayerStatus.Paused, () => {
            player.stop()
            connection.destroy();
        })
    } catch {
        player.stop()
        connection.destroy();
    }
}

module.exports = { connect, play }