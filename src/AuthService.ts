import { saveOAuthParams, getSavedOAuthParams, parseFragmentString } from './oauthUtils';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:5173';

type OAuthParams = {
  [key: string]: string;
};

export const oauth2SignIn = () => {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params: OAuthParams = {
    'client_id': CLIENT_ID,
    'redirect_uri': REDIRECT_URI,
    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    'state': 'perform_google_auth',
    'include_granted_scopes': 'true',
    'response_type': 'token'
  };

  const form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', oauth2Endpoint);

  for (const p in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
};

export const performGoogleAuth = async (handleAuthSuccess: () => void, checkEmailInDatabase: (email: string) => void) => {
  const params = getSavedOAuthParams();
  if (params && params['access_token']) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${params['access_token']}`);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const userEmail = response.user.emailAddress;
        console.log('Signed in user email:', userEmail);
        
        checkEmailInDatabase(userEmail);
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
};

export const handleHashChange = (performGoogleAuth: () => void) => {
  const fragmentString = window.location.hash.substring(1);
  const params = parseFragmentString(fragmentString);

  if (Object.keys(params).length > 0) {
    saveOAuthParams(params);
    if (params['state'] && params['state'] === 'perform_google_auth') {
      performGoogleAuth();
    }
  }
};
