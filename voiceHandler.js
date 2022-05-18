const { 
    createAudioPlayer, 
    createAudioResource, 
    getVoiceConnection, 
    joinVoiceChannel, 
    AudioPlayerStatus,
    VoiceConnectionStatus 
} = require('@discordjs/voice');
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
        player.on(AudioPlayerStatus.Idle, () => {
            player.stop()
            // connection.disconnect();
            connection.destroy();
        })
    } catch {
        player.stop()
        // connection.disconnect();
        connection.destroy();
    }
}

const autoOhayo = (channel) => {
    // add first padd, then use setInterval
    const now = new Date();
    const minutes = (now.getUTCHours() + 4) * 60 + now.getUTCMinutes();
    const minutesLeft = 955 - minutes + 10;
    const alertTimes = [505, 555, 605, 655, 705, 755, 805, 855, 905, 955];

    if (955 - minutes < 0) {
        console.log('[voiceHandler/autoOhayo] หมดวันแล้ว') 
        return
    }
    let firstPadding;
    for(alertTime of alertTimes) { // can optimize using some math
        if(minutes < alertTime) {
            firstPadding = alertTime - minutes
            break
        }
    }

    // console.log(`[voiceHandler/autoOhayo] time until 505th minute ${firstPadding}`);
    const interval = 50 * 60 * 1000; // 50 minutes -> millisec
    console.log('[voiceHandler/autoOhayo] wait till first padding run');

    setTimeout(() => {
        ohayo(channel);
        const cancelInterval = setInterval( () => {
            // console.log('wait til connnection ready');
            ohayo(channel);
        }, interval); 
        setTimeout(cancelInterval, minutesLeft)
    }, firstPadding);
    return 
} 

const ohayo = (channel) => {
    console.log('[voiceHandler/ohayo] Ohayo')
    const connection = connect(channel);
    connection.on(VoiceConnectionStatus.Ready, () => play(connection));
    connection.on(VoiceConnectionStatus.Destroyed, () => console.log('[voiceHandler/ohayo] Connection destroyed'));
}

module.exports = { connect, play, ohayo, autoOhayo }