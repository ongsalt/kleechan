const schedule = require('./newSchedule.json')
const scheduleList = require('./scheduleList.json')

const scheduleFlatMap = [...new Set(schedule.flat())];

// color
const FgGreen = "\x1b[32m"
const ColorReset = "\x1b[0m"
const FgRed = "\x1b[31m"


// console.log(scheduleFlatMap)

scheduleFlatMap.forEach(subject => {
    const ok = scheduleList.some(each => subject.includes(each.teacher))
    if (ok) {
        console.log(`${FgGreen}[PASS] "${subject}" is existed in scheduleList${ColorReset}`)
    } else {
        console.log(`${FgRed}[FAILED] "${subject}" is not existed in scheduleList${ColorReset}`)
    }
})