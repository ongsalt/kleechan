link = require('./link.json')

const newObj = {}

console.log(link)

for (let item of link) {
    if('duplicate' in item) newObj[`${item.id}${item.duplicate}`] =  'https://' + item.link
    else newObj[item.id] = 'https://' + item.link
}


console.log(
    JSON.stringify(newObj)
)