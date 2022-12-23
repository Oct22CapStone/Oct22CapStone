export const oktaConfig = {
    issuer: 'https://dev-09055718.okta.com/oauth2/default',
    clientId: "0oa7qou2xcRLl9WvU5d7",
    redirectUri: `${window.location.origin}/login/callback`,
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
};