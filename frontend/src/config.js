export const oktaConfig = {
    issuer: 'https://dev-38245936.okta.com/oauth2/default',//chinar's issuer
    clientId: "0oa7urjx6kd5LTbMZ5d7",   //chinar's clientId

    redirectUri: `${window.location.origin}/login/callback`,
    //redirectUri: 'http://localhost:3000/login/callback',
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};
