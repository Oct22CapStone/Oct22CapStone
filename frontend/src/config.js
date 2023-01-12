export const oktaConfig = {


    //dev-09055718.okta.com/oauth2/default',
    issuer: 'https://dev-97900310.okta.com/oauth2/default',
    //clientId: "0oa7qou2xcRLl9WvU5d7",
    clientId: "0oa7sq1asxXKBblPa5d7", // SINGLE PAGE APP - WORKS
    //clientId: "0oa7spieo4luUqayk5d7", WEB APP - DOESN'T WORK

    redirectUri: `${window.location.origin}/login/callback`,
    //redirectUri: 'http://localhost:3000/login/callback',
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};
