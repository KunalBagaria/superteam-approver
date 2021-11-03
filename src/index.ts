import { Client, Intents, Options } from 'discord.js'
import dotenv from 'dotenv'
import sendMail from './email'
import emojis from './emoji'

dotenv.config()

const approvers = ['687746817701576759']

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    makeCache: Options.cacheEverything()
});

client.once('ready', async () => {
	console.log('Ready!');
});

client.on('messageReactionAdd', (reaction, user) => {
    if (approvers.includes(user.id)) {
        emojis.forEach(async (emoji) => {
            if (reaction.emoji.name === emoji.name) {
                const messageID = reaction.message.id;
                const orginalMessage = await reaction.message.channel.messages.fetch(messageID)
                const content = orginalMessage.content.split('\n')
                content.forEach((line) => {
                    if (line.includes('Contact')) {
                        const emailAddress = line.split('Contact: ')[1]
                        sendMail(emailAddress, emoji.message)
                    }
                })
            }
        })
    }
})

client.login(process.env['TOKEN']);