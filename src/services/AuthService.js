import { clientId, redirectUri, cognitoDomain } from '../config/authConfig';

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
