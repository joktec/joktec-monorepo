const request = require('request-promise');

const DEFAULT_PROFILE_FIELDS = 'id,first_name,middle_name,last_name,name,email,picture';

export const getUserProfile = async (accessToken: string) => {
  try {
    const options = {
      url: `https://graph.facebook.com/v2.10/me?fields=${DEFAULT_PROFILE_FIELDS}&access_token=${accessToken}`,
      method: 'GET',
    };

    const {
      id,
      first_name,
      last_name,
      name,
      email,
    } = JSON.parse(await request(options));

    return {
      fbId: id,
      firstName: first_name,
      lastName: last_name,
      fullName: name,
      email,
    };
  } catch (err) {
    console.error('@err', err);
    throw new Error(err.message);
  }
};