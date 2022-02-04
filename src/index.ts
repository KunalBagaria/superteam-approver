import dotenv from 'dotenv'
import {
	Client,
	Intents,
	Options
} from 'discord.js'
import { handleGrantReactions } from './grant';
import { handleBountyReactions } from './bounty';

dotenv.config()

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    makeCache: Options.cacheEverything()
});

client.once('ready', async () => {
	console.log(`Logged in as ${client.user?.username}!`);
});

client.on('messageReactionAdd', (reaction, user) => {
	handleGrantReactions(reaction, user)
	handleBountyReactions(reaction, user)
})

client.login(process.env['TOKEN']);