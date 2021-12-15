import { Client, Intents, Options } from 'discord.js'
import dotenv from 'dotenv'
import sendMail from './email'
import emojis from './emoji'

dotenv.config()

const approvers = ['687746817701576759', '510479576259100672', '355979301750833162']

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
                let emailAddress = ''
                let project = ''
                content.forEach(async (line) => {
                    if (line.includes('Contact')) {
                        emailAddress = line.split('Contact: ')[1]
                    } else if (line.includes('Project')) {
                        project = line.split('Project: ')[1]
                    }
                })
                const { response, body, subject } = await sendMail(emailAddress, project, emoji.message)
                if (response.accepted.length > 0) {
                    reaction.message.reply(`Sent email to ${response.accepted[0]}`)
                    reaction.message.channel.send(`\`\`\`\n${subject}\`\`\``)
                    reaction.message.channel.send(`\`\`\`\n${body}\`\`\``)
                } else {
                    reaction.message.reply(`Could not send email to ${emailAddress}`)
                }
            }
        })
    }
})

client.login(process.env['TOKEN']);