import dotenv from 'dotenv'
import Airtable from 'airtable'
import {
	MessageReaction,
	PartialMessageReaction,
	TextChannel,
	User,
	PartialUser
} from 'discord.js'

dotenv.config()

const { AIRTABLE_API_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base('appImjkVLmVfRHnrJ');
const approvers = ['687746817701576759', '510479576259100672', '355979301750833162'];

const emojis = [
	{ name: '✅', message: 'Accept' },
    { name: '❌', message: 'Decline' }
]

export const handleBountyReactions = (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
	if (!approvers.includes(user.id) || reaction.message.channel.id !== '931523932538949632') return
	emojis.forEach(async (emoji) => {
		if (reaction.emoji.name === emoji.name) {
			const MESSAGE_ID = reaction.message.id;
			const orginalMessage = await reaction.message.channel.messages.fetch(MESSAGE_ID)
			const content = orginalMessage.content.split('\n')
			let UID = ''
			content.forEach(async (line) => {
				if (line.includes('UID')) {
					UID = line.split('UID: ')[1]
				}
			})
			if (!UID) return
			base('Bounty Requests').update(UID, { "Decision": emoji.message }, async (err, record) => {
				if (!err) {
					const modChannel: TextChannel = await reaction.message.client.channels.cache.get('888684613097107509') as TextChannel
					if (!modChannel) return
					modChannel.send(`Updated Airtable record for the bounty application to ${emoji.message}`)
				} else {
					console.log(err)
					const modChannel: TextChannel = await reaction.message.client.channels.cache.get('888684613097107509') as TextChannel
					if (!modChannel) return
					modChannel.send(`Error updating Airtable record`)
				}
			})
		}
	})
}