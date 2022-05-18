const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel  } = require('@discordjs/voice');


if(!connection){
    const connectionConfig = Object.assign({}, {
        channelId: interaction.channel.id,
        guildId: interaction.channel.guild.id,
        adapterCreator: interaction.channel.guild.voiceAdapterCreator
    })
    const connection = joinVoiceChannel({
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

await interaction.reply('set event interval: Ohayo ')

module.exports = { connect }