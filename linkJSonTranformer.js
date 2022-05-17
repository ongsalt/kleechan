link = require('./link.json')

const newObj = {}

console.log(link)

for (let item of link) {
    newObj[item.id] = item.link
}


console.log(
    JSON.stringify(newObj)
)