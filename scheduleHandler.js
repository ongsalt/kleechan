schedule = require('./schedule.json')

function getTime() {
    const now = new Date();
    // console.log(now.getHours(), now.getMinutes())
    return now.getHours() + now.getMinutes()/100
}

function currenrPeriod() {
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

console.log(currenrPeriod())