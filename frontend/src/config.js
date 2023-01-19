export const oktaConfig = {
    issuer: 'https://dev-38245936.okta.com/oauth2/default',
    clientId: "0oa7urjx6kd5LTbMZ5d7",   //chinar's clientId

    redirectUri: `${window.location.origin}/login/callback`,
    //redirectUri: 'http://localhost:3000/login/callback',
    endSessionRedirectUri: `${window.location.origin}`,
    features: { registration:true },
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};