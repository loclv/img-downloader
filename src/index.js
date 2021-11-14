import { pipeline } from 'stream/promises';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import fetch from 'node-fetch';

const sampleUrl =
  'https://github.githubassets.com/images/modules/logos_page/Octocat.png';

/**
 * Download a image by URL.
 */
const download = async (imgUrl, imgName, dir = './img') => {
  try {
    console.log('--- starting download ---');
    const response = await fetch(imgUrl);

    console.log('Finished downloading!');

    if (!response.ok)
      throw new Error(`unexpected response ${response.statusText}`);

    if (!existsSync(dir)) {
      mkdirSync(dir);
    }

    await pipeline(response.body, createWriteStream(`${dir}/${imgName}.png`));

    console.log('Finished image creating!');
  } catch (err) {
    console.error(err);
  }
};

download(sampleUrl, 'test');
