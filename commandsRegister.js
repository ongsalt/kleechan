const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder().setName('test').setDescription('bruh'),
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('s').setDescription('ตารางเรียน').addStringOption( option => 
        option.setName('เลือกคาบ')
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
            // .addChoices([
            //     SlashCommandStringOption('p', 'ก่อนหน้า'),
            //     SlashCommandStringOption('n', 'ถัดไป'),
            //     SlashCommandStringOption('c', 'ปัจจุบัน')
            // ])
    ),
    // [p] ก่อนหน้า   [n] ถัดไป   [default: c] ปัจจุบัน
    new SlashCommandBuilder().setName('homework').setDescription('#todo set homework'),
    new SlashCommandBuilder().setName('h').setDescription('#todo'),
]
    .map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: commands })
    .then( () => console.log('Successful registered'))
    .catch(console.error);