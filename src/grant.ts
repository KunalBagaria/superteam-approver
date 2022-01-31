import Airtable from 'airtable'
import emojis from './emoji'
import { MessageReaction, PartialMessageReaction, TextChannel, User, PartialUser } from 'discord.js'

const { AIRTABLE_API_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base('appBkpMQNnJ45fCXK');
const approvers = ['687746817701576759', '510479576259100672', '355979301750833162'];

export const handleGrantReactions = (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
	if (!approvers.includes(user.id) || reaction.message.channel.id !== '897627725383213147') return
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
			base('Applicants').update(UID, { "Status": emoji.message }, async (err, record) => {
				if (!err) {
					const modChannel: TextChannel = await reaction.message.client.channels.cache.get('888684613097107509') as TextChannel
					if (!modChannel) return
					modChannel.send(`Updated Airtable record for the grant application to ${emoji.message}`)
				} else {
					const modChannel: TextChannel = await reaction.message.client.channels.cache.get('888684613097107509') as TextChannel
					if (!modChannel) return
					modChannel.send(`Error updating Airtable record`)
				}
			})
		}
	})
}