export const oktaConfig = {

    issuer: 'https://dev-75726251.okta.com/oauth2/default',//Tanner's issuer
    clientId: "0oa7ubwwdkshNMbWg5d7",   //Tanner's clientId

    redirectUri: `${window.location.origin}/login/callback`,
    //redirectUri: 'http://localhost:3000/login/callback',
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};
