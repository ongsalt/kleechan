const { 
    createAudioPlayer, 
    createAudioResource, 
    getVoiceConnection, 
    joinVoiceChannel, 
    AudioPlayerStatus,
    VoiceConnectionStatus 
} = require('@discordjs/voice');
const { join } = require('node:path')
// const textToSpeech = require('@google-cloud/text-to-speech');
// const fs = require('fs');
// const util = require('util');

require('dotenv').config()

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
    resource.volume.setVolume(0.7)
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

const autoOhayo = (client) => {
    // add first padd, then use setInterval
    const now = new Date();
    const minutes = (now.getUTCHours() + 7) * 60 + now.getUTCMinutes(); // cuz timezone exist
    const minutesLeft = 955 - minutes + 10;
    const alertTimes = [510, 560, 610, 660, 710, 760, 810, 860, 910, 960];

    if (955 - minutes < 0) {
        console.log('[voiceHandler/autoOhayo] หมดวันแล้ว') 
        return
    }
    let firstPadding;
    for(const alertTime of alertTimes) { // can optimize using some math
        if(minutes < alertTime) {
            firstPadding = alertTime - minutes
            break
        }
    }

    const channel = client.channels.cache.find(c => c.id === process.env.CHANNEL_ID)


    console.log(`[voiceHandler/autoOhayo] will ohayo in ${firstPadding} minutes`);
    const interval = 50 * 60 * 1000; // 50 minutes -> millisec
    // console.log('[voiceHandler/autoOhayo] wait till first padding run');

    setTimeout(() => {
        ohayo(channel);
        const cancelInterval = setInterval( () => {
            // console.log('wait til connnection ready');
            ohayo(channel);
        }, interval); 
        setTimeout(() => clearInterval(cancelInterval), minutesLeft)
    }, firstPadding * 60 * 1000);
    return 
} 

const ohayo = (channel) => {
    console.log('[voiceHandler/ohayo] Ohayo')
    const connection = connect(channel);
    connection.on(VoiceConnectionStatus.Ready, () => play(connection));
    connection.on(VoiceConnectionStatus.Destroyed, () => console.log('[voiceHandler/ohayo] Connection destroyed'));
}

// const tts = async (text) => {
//     const client = new textToSpeech.TextToSpeechClient();
//     const request = {
//         input: {text: text},
//         voice: {languageCode: 'th-TH', ssmlGender: 'FEMALE'},
//         audioConfig: {audioEncoding: 'MP3'},
//       };
//       const [response] = await client.synthesizeSpeech(request);
//       const writeFile = util.promisify(fs.writeFile);
//       await writeFile(outputFile, response.audioContent, 'binary');
//       console.log(`Audio content written to file: ${outputFile}`);
      
// }

module.exports = { connect, play, ohayo, autoOhayo }