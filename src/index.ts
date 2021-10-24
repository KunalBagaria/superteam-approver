import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageReactionAdd', (reaction, user) => {
    console.log(reaction.message.channel.id);
    console.log(user.username);
})

client.login(process.env['TOKEN']);