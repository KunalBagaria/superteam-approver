import dotenv from 'dotenv'
import Airtable from 'airtable'
import {
  MessageReaction,
  PartialMessageReaction,
  TextChannel,
  User,
  PartialUser
} from 'discord.js'
import {
  fetchTwitterPFPFromUsername
} from './twitter';
import {
  generateBanner
} from './banner';
import {
  uploadSVG
} from './upload';
import {
  createNewNotionPage
} from './notion';

dotenv.config()

const {
  AIRTABLE_API_KEY
} = process.env;
const base = new Airtable({
  apiKey: AIRTABLE_API_KEY
}).base('appImjkVLmVfRHnrJ');
const approvers = ['687746817701576759', '510479576259100672', '355979301750833162'];

const emojis = [{
    name: '✅',
    message: 'Accept'
  },
  {
    name: '❌',
    message: 'Decline'
  }
]

const acceptBountySubmission = async (modChannel: TextChannel, UID: string) => {
  try {
    modChannel.send('Trying to fetch details from Airtable...');
    const bounty = await base('Bounties').find(UID);
    const data = bounty._rawJson.fields;
    const { Twitter, Name, Type } = data;
    if (!Twitter || !Name || !Type) {
      modChannel.send('Required details are not available.');
      return;
    }
    const username = Twitter.split('com/')[1];
    modChannel.send('Fetching Twitter profile picture...');
    const pfp = await fetchTwitterPFPFromUsername(username);
    if (!pfp) {
      modChannel.send('Failed to fetch Twitter profile picture.');
      return;
    };
    modChannel.send('Generating banner...');
    const banner = await generateBanner({
      name: Name,
      description: Type,
      logoURL: pfp
    });
    if (!banner) return;
    modChannel.send('Uploading banner... (this may take a while)');
    const uploaded: any = await uploadSVG(banner);
    if (!uploaded?.url) {
      modChannel.send('Failed to upload SVG to Cloudinary.');
      return;
    };
    const bannerURL = uploaded.url;
    modChannel.send('Banner uploaded');
    modChannel.send(bannerURL);
    modChannel.send('Creating new Notion page...');
    const notionResponse = await createNewNotionPage({
      name: Name,
      bannerURL
    });
    modChannel.send('Successfully created new Notion page.');
  } catch (e) {
    console.error(e);
    modChannel.send('An error occured, cc <@510479576259100672>');
  }
}

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
      base('Bounty Requests').update(UID, {
        "Decision": emoji.message
      }, async (err, record) => {
        if (!err) {
          const modChannel: TextChannel = await reaction.message.client.channels.cache.get('888684613097107509') as TextChannel
          if (!modChannel) return
          modChannel.send(`Updated Airtable record for the bounty application to ${emoji.message}`)
          if (emoji.message === 'Accept') {
            acceptBountySubmission(modChannel, UID);
          }
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