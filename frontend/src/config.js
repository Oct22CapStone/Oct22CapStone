export const oktaConfig = {
    issuer: 'https://dev-33752892.okta.com/oauth2/default',
    clientId: "0oa7u5v90qpCRd7vr5d7",
    redirectUri: `${window.location.origin}/login/callback`,
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
};