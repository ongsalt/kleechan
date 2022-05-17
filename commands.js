const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder().setName('test').setDescription('bruh'),
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('schedule').setDescription('ตารางเรียน'),
    new SlashCommandBuilder().setName('s').setDescription('ตารางเรียน'),
    new SlashCommandBuilder().setName('homework').setDescription('#todo set homework'),
    new SlashCommandBuilder().setName('h').setDescription('#todo'),
]
    .map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: commands })
    .then( () => console.log('Successful registered'))
    .catch(console.error);