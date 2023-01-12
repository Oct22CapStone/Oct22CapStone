export const oktaConfig = {

    issuer: 'https://dev-89041717.okta.com/oauth2/default',//chinar's issuer
    clientId: "0oa7w713t1hMkgPG15d7",   //chinar's clientId

    redirectUri: `${window.location.origin}/login/callback`,
    //redirectUri: 'http://localhost:3000/login/callback',
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};
