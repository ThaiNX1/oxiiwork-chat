export const environment = {
  production: true,
  staging: false,
  uat: false,
  // apiGraphQL: 'https://oxii-office-api.oxiitek.com/graphql',
  apiGraphQL: 'https://oxii-office-api.smarthiz.com/graphql',
  apiWS: 'wss://srt-steam-api.smarthiz.vn/graphql',
  // socketUri: 'https://oxii-office-api.oxiitek.com',
  socketUri: 'https://oxii-office-api.smarthiz.com',
  firebaseConfig: {
    apiKey: "AIzaSyBk52UadYLIe0TzIyQD1zqGNn8t0DhHmms",
    authDomain: "soffice-prod.firebaseapp.com",
    projectId: "soffice-prod",
    storageBucket: "soffice-prod.appspot.com",
    messagingSenderId: "50219916620",
    appId: "1:50219916620:web:2af253a5e3946b594003e9",
  },
  vapidKey: "BGaqz5ZBywBqvhykKVwtuoVsG5cyo6pUjGbeYdsAtWGM7NdKCANOK1KnbBEvIqupV44gS6xdwXkkeiY9eqTDl14",
  languagePrefix: 'so',
  languageBucket: 'https://test-languages.s3.ap-southeast-1.amazonaws.com'
};
