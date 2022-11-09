const request = require('request-promise');

const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';

const getUserEmail = async (accessToken: string) => {
    try {
        const url = 'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';

        const options = {
            url,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
    
        const response = JSON.parse(await request(options));
    
        if (!response) {
            throw new Error('Token invalid');
        }

        const elements = response['elements'] || [];

        if (!elements.length) {
            throw new Error('Email not found');
        }

        return elements[0]['handle~']['emailAddress'];
    } catch (err) {
        console.error('@err', err);
        throw new Error(err.mesage);
    }
};

export const getUserProfile = async (accessToken: string) => {
  try {
    const url = 'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))';

    const options = {
      url,
      method: 'GET',
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = JSON.parse(await request(options));

    if (!response.id) {
        throw new Error('Token invalid');
    }

    return {
        firstName: response['localizedFirstName'] || '',
        lastName: response['localizedLastName'] || '',
        id: response['id'],
        email: await getUserEmail(accessToken),
    };
  } catch (err) {
    console.error('@err', err);
    throw new Error(err.message);
  }
};

const getAccessToken = async (code: string): Promise<string> => {
    try {
        const url = `${LINKEDIN_TOKEN_URL}?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`;
        const options = {
            url,
            method: 'POST',
        };

        const response = JSON.parse(await request(options));

        return response['access_token'];
    } catch (err) {
        console.error('@err', err);
        throw new Error(err.message);
    }
};

export const getValidatedWithLinkedinCode = async (code: string) => {
    try {
        const accessToken = await getAccessToken(code);
        if (!accessToken) {
            throw new Error('Token invalid');
        }

        const response = await getUserProfile(accessToken);

        return {
            linkedinId: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            fullName: `${response.firstName} ${response.lastName}`,
            email: response.email,
        };
    } catch (err) {
        console.error('@err', err);
        throw new Error(err.message);
    }
};

