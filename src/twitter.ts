import fetch from 'node-fetch';

export const fetchTwitterPFPFromUsername = async (username: string): Promise<string | undefined> => {
  try {
    const tokenRequest = await fetch('https://api.twitter.com/1.1/guest/activate.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
      }
    })
    const tokenData = await tokenRequest.json();
    const { guest_token } = tokenData;
    if (!guest_token) return;
    const response = await fetch(`https://twitter.com/i/api/graphql/7mjxD3-C6BxitPMVQ6w0-Q/UserByScreenName?variables=%7B%22screen_name%22%3A%22${username}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "x-guest-token": guest_token,
        "x-twitter-client-language": "en",
        "x-twitter-active-user": "yes",
        "x-csrf-token": "ffb380c8ea425d632bb6841d45875b55",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
      },
      method: "GET",
    })
    const json = await response.json();
    const pfp = json.data.user.result.legacy.profile_image_url_https.replace('normal', '400x400');
    if (!pfp) return;
    return pfp;
  } catch (e) {
    console.error(e);
  }
}