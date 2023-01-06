export const oktaConfig = {
    //issuer: 'https://dev-09055718.okta.com/oauth2/default',
    issuer: 'https://dev-38245936.okta.com/oauth2/default',
    //clientId: "0oa7qou2xcRLl9WvU5d7",
    clientId: "0oa7urjx6kd5LTbMZ5d7", // SINGLE PAGE APP - WORKS
    //clientId: "0oa7spieo4luUqayk5d7", WEB APP - DOESN'T WORK
    redirectUri: `${window.location.origin}/login/callback`,
    //redirectUri: 'http://localhost:3000/login/callback',
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email","phone","lastname","username"],
    pkce: true,
    disableHttpsCheck: true,
};
//0BA5L7es9eCsmnkk1Isz