# kleechan
A discord bot for random thing mainly notify class schedule

# Feature
 - Notify class schedule and send google meet link of responded class to discord
 - Randomly rickroll you by said link

# Usage
 - First add your own class schedule by creating file name schedule.json then add array of array of object of class info using this format
  {
    teacher: "", 
    room: "",
    subjectId: "",
    subject: ""
  }
 - Create linkObj.json file then add object that contain subjectId as key and link as value`
 - Generate .env file that contain your discord APP_ID, CLIENT_TOKEN, GUILD_ID, CHANNEL_ID(for notification sound in voice channel)
 - Deploy and run this thing somewhere and you're done
