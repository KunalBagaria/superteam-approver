import emojis from './emoji'
import sendMail from './email'
import { MessageReaction, PartialMessageReaction, TextChannel, User, PartialUser } from 'discord.js'

const approvers = ['687746817701576759', '510479576259100672', '355979301750833162']

export const handleGrantReactions = (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
	if (!approvers.includes(user.id) || reaction.message.channel.id !== '897627725383213147') return
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
				const modChannel: TextChannel = await reaction.message.client.channels.cache.get('888684613097107509') as TextChannel
				if (!modChannel) return
				modChannel.send(`Sent email to ${response.accepted[0]}`)
				modChannel.send(`\`\`\`\n${subject}\`\`\``)
				modChannel.send(`\`\`\`\n${body}\`\`\``)
			} else {
				reaction.message.reply(`Could not send email to ${emailAddress}`)
			}
		}
	})
}