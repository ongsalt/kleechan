const getSubject = require("./scheduleHandler");

for (let i = -1; i < 10; i++) {
    const msg = getSubject('n', i)
    console.log(msg)
}