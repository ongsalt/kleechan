const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder().setName('test').setDescription('bruh'),
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('s').setDescription('ตารางเรียน').addStringOption( option => 
        option.setName('argument') //  เลือกคาบ
            .setDescription('Default คือคาบปัจจุบัน')
            .setRequired(false)
            .addChoices(
                {
                    name: 'ถัดไป',
                    value: 'n'
                },
                {
                    name: 'ก่อนหน้า',
                    value: 'p'
                },
                {
                    name: 'ปัจจุบัน',
                    value: 'c'
                },
                {
                    name: 'ตารางเต็ม',
                    value: 'f'
                }
            )
    ),
    new SlashCommandBuilder().setName('h').setDescription('#todo')
]
    .map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN)

rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands })
    .then( () => console.log('Successful registered'))
    .catch(console.error);