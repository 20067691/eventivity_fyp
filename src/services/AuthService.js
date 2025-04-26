//AuthService.js
//import { clientId, redirectUri, cognitoDomain } from '../config/authConfig';

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const redirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI;
const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN; 

export async function exchangeCodeForToken(code) {
  const tokenUrl = `${cognitoDomain}/oauth2/token`;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    redirect_uri: redirectUri,
    code: code,
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange authorization code for token');
  }

  return await response.json(); // Contains id_token, access_token, refresh_token
}
