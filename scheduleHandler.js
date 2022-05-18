const schedule = require('./schedule.json')
const linkObj = require('./linkObj.json')
const { MessageEmbed } = require('discord.js')
const { rickroll, rickroller } = require('./Rickroll')

function currentPeriod() {
    const now = new Date();
    const minutes = (now.getUTCHours() + 7) * 60 + now.getUTCMinutes(); // cuz timezone exist
    const alertTimes = [510, 560, 610, 660, 710, 760, 810, 860, 910, 960];
    
    let count = 0;
    for(alertTime of alertTimes) {
        if(minutes < alertTime) return count;
        count++
    }
    return -1
}

function getDay() {
    const now = new Date().getDay();
    return now // 0 is sunday 6 is saturday
}

function getSubject(option = 'n') { // change default option is next
    let padding = 1;
    //dev
    // const testObject = {
    //     teacher: 'ดำรงศักดิ์ ศรีสวัสดิ์',
    //     room: '2305',
    //     subject: 'Test',
    //     subjectId: '- Mathematics',
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
    console.log(`[scheduleHandler/period] ${period} ${padding}`)

    if (period === 4) return { isEmbed: false, reply: 'พัก' } // 5
    if (period < 0) return { isEmbed: false, reply: 'นอกเวลาเรียน' }

    const day = getDay() - 1; // also, array start at 0
    if (day === 0 || day === 6) return { isEmbed: false, reply: 'วันหยุด' }

    console.log({ day, period })

    return {
        isEmbed: true,
        embed: formatSubject({
            ...schedule[day][period],
            option
        })
    }
}


function formatSubject({ teacher, room, subjectId, subject, option }) {
    let link = linkObj[subjectId];
    let paddingText;
    console.log(`[scheduleHandler/formatSubject] option: ${option}`)
    // console.log(`[scheduleHandler/formatSubject] data: ${teacher} ${room} ${subjectId} ${subject}`)
    switch (option) {
        case 'c':
            paddingText = 'คาบเรียนปัจจุบัน';
            break;
        case 'n':
            paddingText = 'คาบเรียนถัดไป';
            break;
        case 'p':
            paddingText = 'คาบเรียนก่อนหน้า'
            break;
        default: paddingText = 'คาบเรียนถัดไป'
    }

    const embed = new MessageEmbed()
        .setColor('#2f61e0')
        .setTitle(`${subject} ${subjectId}`)
        .setAuthor({ name: paddingText })
        
    let desc = '';

    if (teacher.includes('สาขา')) desc += 'แยกย้ายกันไปเรียนตามสาขาวิชา'
    else desc += `อาจารย์${teacher} ที่ห้อง ${room}`

    //dev
    // link = rickroll

    if (link) {
        if (Math.random() < 0.1) link = rickroll
        embed.setURL(link);
    } else {
        desc += '\n\n ไม่มีลิงค์';
        embed.setColor('#ed3e3e')
    }
    embed.setDescription(desc)

    return embed
    // return `${paddingText} ${subject} ${subjectId} \n อาจารย์${teacher} ที่ห้อง ${room} \n ${link}`
}




module.exports = getSubject
