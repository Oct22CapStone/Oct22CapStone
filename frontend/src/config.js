export const oktaConfig = {
    issuer: 'https://dev-22683014.okta.com/oauth2/default',//kenzie's issuer
    clientId: "0oa7rzyuzpzzEAShm5d7",   //kenzie's clientId
    redirectUri: `${window.location.origin}/login/callback`,
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
};