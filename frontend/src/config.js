export const oktaConfig = {

    issuer: 'https://dev-09055718.okta.com/oauth2/default',//chinar's issuer
    clientId: "0oa7qou2xcRLl9WvU5d7",   //chinar's clientId

    redirectUri: `${window.location.origin}/login/callback`,
    //redirectUri: 'http://localhost:3000/login/callback',
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};
