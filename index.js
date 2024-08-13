const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Devloper code on top,!');
});

app.listen(port, () => {
  console.log(`🟢 | Server listening on port ${port}`);
});


const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { TOKEN } = require('./JSON/Config.json');
const { readdirSync } = require('node:fs');

const client = new Client({
    intents: [
        Object.keys(GatewayIntentBits)
    ],
    partials: [
      Object.keys(Partials)
    ]
});

readdirSync('./Handlers').forEach(handler => {
    require(`./Handlers/${handler}`)(client);
});

client.login(process.env.token);