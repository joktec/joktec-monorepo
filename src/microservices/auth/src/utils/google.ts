const request = require('request-promise');

const ID_TOKEN_TYPE = 'id_token';
const ACCESS_TOKEN_TYPE = 'access_token';

export const getUserProfile = async (accessToken: string, tokenType: string = ACCESS_TOKEN_TYPE) => {
  try {
    let url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
    if (tokenType === ID_TOKEN_TYPE) {
      url = `https://oauth2.googleapis.com/tokeninfo?id_token=${accessToken}`
    }

    const options = {
      url,
      method: 'GET',
    };

    const response = JSON.parse(await request(options));

    const names = response.name ? response.name.split(' ') : [];

    return {
      googleId: response.sub,
      firstName: names.length > 1 ? names[names.length - 1] : '',
      lastName: names.length > 1 ? names[0] : '',
      fullName: response.name,
      email: response.email,
    };
  } catch (err) {
    console.error('@err', err);
    throw new Error(err.message);
  }
};