import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: process.env.GIT_HUB_TOKEN });

const decode = (str) => {
  try {
    return btoa(str)
  } catch(e) {
    return Buffer.from(str, 'base64').toString();
  }
};

const getProduct = () => {
  console.log('HI YOU ARE REQUESTING API, WHERE ARE YOU?');

  return new Promise((resolve) => setTimeout(resolve, 3000))
    .then(() => octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'KieraDOG',
      repo: 'spike-rendering-content',
      path: 'product.json'
    }))
    .then(({ data }) => data.content)
    .then((content) => decode(content))
    .then((decoded) => JSON.parse(decoded));
};

export default getProduct;