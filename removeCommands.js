require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.CLIENT_TOKEN;
const clientId = process.env.APP_ID;
    
const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationCommands(clientId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            console.log(`Deleting ${command}`)
            const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });

// rest.delete(`${Routes.applicationCommands(process.env.APP_ID)}/`)