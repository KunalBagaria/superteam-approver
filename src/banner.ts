// @ts-expect-error
import imageDataURI from 'image-data-uri';
import { coverOne } from '../static/thumbnails/CoverOne';
import { coverTwo } from '../static/thumbnails/CoverTwo';
import { coverThree } from '../static/thumbnails/CoverThree';
import { coverFour } from '../static/thumbnails/CoverFour';
import { coverFive } from '../static/thumbnails/CoverFive';
import { coverSix } from '../static/thumbnails/CoverSix';
import { coverSeven } from '../static/thumbnails/CoverSeven';
import { coverEight } from '../static/thumbnails/CoverEight';

interface Banner {
  name: string,
  description: string,
  logoURL: string
}

const getImageURIFromURL = async (url: string) => {
  try {
    const URI = await imageDataURI.encodeFromURL(url);
    return URI;
  } catch (e) {
    console.error(e)
  }
}

const covers = [
  coverOne,
  coverTwo,
  coverThree,
  coverFour,
  coverFive,
  coverSix,
  coverSeven,
  coverEight
];

export const generateBanner = async (props: Banner) => {
  const logoURI = await getImageURIFromURL(props.logoURL);
  if (!logoURI) return;
  const cover = covers[Math.floor(Math.random() * covers.length)];
  const generatedCover = cover(props.name, props.description, logoURI);
  return generatedCover;
}