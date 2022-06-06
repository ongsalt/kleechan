const { writeFile } = require('fs')
const link = require('./link.json')
const schedule = require('./schedule.json')

const newList = []

// console.log(link)

for (let item of link) {
    if(item.duplicate) {
        // im too lazy to implement this so
        // edit english subject data manually 
        // fuck you
    }
    const subjectData = schedule.flat().find(each => item.id === each.subjectId)
    if(subjectData) {
        console.log(item.id)
        newList.push({ ...subjectData, link: item.link })
    }
}

console.log(newList)

const objString = JSON.stringify(newList)

writeFile("scheduleList.json", objString, 'utf-8', err => {
    if(err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log('New JSON file has been saved.')
})