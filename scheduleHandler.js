const schedule = require('./schedule.json')
const linkObj = require('./linkObj.json')

function getTime() {
    const now = new Date();
    // console.log(now.getHours(), now.getMinutes())
    return now.getHours() + now.getMinutes()/100
}

function currentPeriod() {
    const time = getTime()
    if(time < 8.3) return 0
    if(time < 9.2) return 1
    if(time < 10.1) return 2
    if(time < 11) return 3
    if(time < 11.5) return 4
    if(time < 12.4) return 5
    if(time < 13.4) return 6
    if(time < 14.2) return 7
    if(time < 15.1) return 8
    if(time < 16) return 9
    return -1
}

function getDay() {
    const now = new Date().getDay();
    return now // 0 is sunday 6 is saturday
}

function getSubject(option='n') { // change default option is next
    let padding = 1;
    
    console.log(`[scheduleHandler/getSubject] option: ${option}`)
    if(option==='n'){
        padding = 1
    } else if(option === 'p') {
        padding = -1
    } else if(option === 'c') {
        padding = 0
    }

    let period = currentPeriod() + padding;
    console.log(`[scheduleHandler/period] ${period} ${padding}`)


    if(period === 5) return 'พัก'
    if(period < 0) return 'นอกเวลาเรียน'
    // if(period <= -1) return 'นอกเวลาเรียน'

    period -= 1; // array start at 0

    const day = getDay() - 1; // also array start at 0
    if(day === 0 || day === 6) return 'วันหยุด'

    console.log({ day, period })
    return formatSubject({
        ...schedule[day][period],
        padding
    })
}

function formatSubject({teacher, room, subjectId, subject, padding}) {
    let link = linkObj[subjectId];
    // console.log({
    //     subjectId,
    //     link: linkObj[subjectId],
    //     linkObj
    // })
    let paddingText;
    switch(padding){
        case 0: paddingText = 'คาบเรียนปัจจุบัน'
        case 1: paddingText = 'คาบเรียนถัดไป'
        case -1: paddingText = 'คาบเรียนก่อนหน้า'
        default: paddingText = 'คาบเรียนปัจจุบัน'
    }
    if(Math.random() < 0.1){ // rickroller
        link = `[${link}](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`  
    }
    return `${paddingText} ${subject} ${subjectId} \n อาจารย์${teacher} ที่ห้อง ${room} \n ${link}`
}



module.exports = getSubject
