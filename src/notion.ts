import {
  Client
} from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

interface NotionPage {
  name: string,
    bannerURL: string
}

export const createNewNotionPage = async (props: NotionPage) => {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID as string,
    },
    cover: {
      type: "external",
      external: {
        url: props.bannerURL
      }
    },
    properties: {
      Name: {
        title: [{
          text: {
            content: props.name
          },
        }, ],
      },
    },
  });
  return response;
}