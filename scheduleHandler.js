const schedule = require('./schedule.json')
const linkObj = require('./linkObj.json')
const { MessageEmbed } = require('discord.js')
const { rickroll, rickroller } = require('./Rickroll')

function currentPeriod() {
    const now = new Date();
    const minutes = (now.getUTCHours() + 7) * 60 + now.getUTCMinutes(); // cuz timezone exist
    const alertTimes = [510, 560, 610, 660, 710, 760, 810, 860, 910, 960];
    
    let count = 0;
    for(const alertTime of alertTimes) {
        if(minutes < alertTime) return count;
        count++
    }
    return -1
}

function getDay() {
    const now = new Date().getUTCDay();
    return now // 0 is sunday 6 is saturday
}

function getSubject(option) { // change default option is next
    let padding = 1;
    if(!option) {
        option = 'n'
    }
    //dev
    // const testObject = {
    //     "teacher": null,
    //     "room": null,
    //     "subjectId": "อ30103",
    //     "subject": "Eng"
    // }

    // return {
    //     isEmbed: true,
    //     embed: formatSubject({
    //         ...testObject,
    //         option
    //     })
    // }

    console.log(`[scheduleHandler/getSubject] option: ${option}`)
    if (option === 'n') {
        padding = 1
    } else if (option === 'p') {
        padding = -1
    } else if (option === 'c') {
        padding = 0
    } else if (option === 'f') {
        const embed = new MessageEmbed()
            .setTitle('ตารางเต็ม')
            .setColor('#2f61e0')
            .setImage('https://i.imgur.com/yhbYFkE.jpg');
        return {
            isEmbed: true,
            embed
        }
    }

    let period = currentPeriod() + padding - 1; // array start at 0

    if (period === 4) return { isEmbed: false, reply: 'พัก' } // 5
    if (period < 0) return { isEmbed: false, reply: 'นอกเวลาเรียน' }
    
    const day = getDay() - 1; // also, array start at 0 | Sun is 0, array start at Mon
    if (day <= -1 || day >= 5) return { isEmbed: false, reply: 'วันหยุด' }

    console.log(`[scheduleHandler/period] day: ${day} period: ${period} padding: ${padding}`)

    return {
        isEmbed: true,
        embed: formatSubject({
            ...schedule[day][period],
            option
        })
    }
}


function formatSubject({ teacher, room, subjectId, subject, option }) {
    let link;
    if(subjectId.includes('อ30103')) {
       if(teacher === 'จารุวัชร') link = linkObj['อ301031']
       else link = linkObj['อ301030']
    } else link = linkObj[subjectId];
    let paddingText = '';

    if(process.env.device) {
        paddingText += 'Test - '
    }
    // console.log(`[scheduleHandler/formatSubject] data: ${teacher} ${room} ${subjectId} ${subject}`)
    switch (option) {
        case 'c':
            paddingText += 'คาบเรียนปัจจุบัน';
            break;
        case 'n':
            paddingText += 'คาบเรียนถัดไป';
            break;
        case 'p':
            paddingText += 'คาบเรียนก่อนหน้า'
            break;
        default: paddingText += 'คาบเรียนถัดไป'
    }
    
    let title = subject
    let desc = '';

    if(subjectId && subjectId != subject) title += ` ${subjectId}`

    if (teacher && teacher.includes('สาขา')) desc += 'แยกย้ายกันไปเรียนตามสาขาวิชา'

    if (subject === 'โครงงาน') desc += 'แยกย้ายกันไปตามสาขาวิชา'
    else if (subject === 'ว่าง') desc += 'คาบว่างงงงงงงงงงง'
    else if (subject === 'บรรยาย') desc += 'ฟังบรรยาย'
    else if (subject === 'โฮมรูม') desc += 'พบครูที่ปรึกษา'
    // else if (teacher && room) desc += `อาจารย์${teacher} ที่ห้อง ${room}`
    else desc += `อาจารย์${teacher} ที่ห้อง ${room}`

    const embed = new MessageEmbed()
        .setColor('#2f61e0')
        .setTitle(title)
        .setAuthor({ name: paddingText })

    
    if (link) {
        if (Math.random() < 0.1  && option != null){
        // if (true){
            embed.setURL(rickroll);
            desc += ` ${rickroller(link)}`
        } else {
            embed.setURL(link);
            desc += ` ${link}`
        }
    } else {
        desc += '\n\n ไม่มีลิงค์';
        embed.setColor('#ed3e3e')
    }
    embed.setDescription(desc)

    if(process.env.device) embed.setColor('#f5da42')

    return embed
    // return `${paddingText} ${subject} ${subjectId} \n อาจารย์${teacher} ที่ห้อง ${room} \n ${link}`
}




module.exports = getSubject