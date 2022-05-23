const { writeFile } = require('fs')
const link = require('./link.json')

const newObj = {}

// console.log(link)

for (let item of link) {
    if('duplicate' in item) newObj[`${item.id}${item.duplicate}`] =  'https://' + item.link
    else newObj[item.id] = 'https://' + item.link
}

console.log(newObj)

const objString = JSON.stringify(newObj)

writeFile("linkObj.json", objString, 'utf-8', err => {
    if(err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log('New JSON file has been saved.')
})