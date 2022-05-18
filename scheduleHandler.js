const schedule = require('./schedule.json')
const linkObj = require('./linkObj.json')
const { MessageEmbed } = require('discord.js')
const { rickroll, rickroller } = require('./Rickroll')


function getTime() {
    const now = new Date();
    // console.log(now.getHours(), now.getMinutes())
    const hours = now.getUTCHours() + 7 // cuz time zone exist 
    const minutes = now.getUTCMinutes()
    return hours + minutes / 100
}

function currentPeriod() {
    const time = getTime()
    if (time < 8.3) return 0
    if (time < 9.2) return 1
    if (time < 10.1) return 2
    if (time < 11) return 3
    if (time < 11.5) return 4
    if (time < 12.4) return 5
    if (time < 13.4) return 6
    if (time < 14.2) return 7
    if (time < 15.1) return 8
    if (time < 16) return 9
    return -1
}

function getDay() {
    const now = new Date().getDay();
    return now // 0 is sunday 6 is saturday
}

function getSubject(option = 'n') { // change default option is next
    let padding = 1;
    //dev
    const testObject = {
        teacher: 'ดำรงศักดิ์ ศรีสวัสดิ์',
        room: '2305',
        subject: 'Test',
        subjectId: '- Mathematics',
    }

    return {
        isEmbed: true,
        embed: formatSubject({
            // ...schedule[day][period],
            ...testObject,
            option
        })
    }

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

    let period = currentPeriod() + padding;
    console.log(`[scheduleHandler/period] ${period} ${padding}`)


    if (period === 5) return { isEmbed: false, reply: 'พัก' }
    if (period <= 0) return { isEmbed: false, reply: 'นอกเวลาเรียน' }

    period -= 1; // array start at 0

    const day = getDay() - 1; // also array start at 0
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
    link = rickroll

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
