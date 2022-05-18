const rickroll = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

function rickroller(link) {
    // wait till message sent or 10 sec
    // then edit link back
    return `[${link}](${rickroll})`
}
module.exports = { rickroll, rickroller }