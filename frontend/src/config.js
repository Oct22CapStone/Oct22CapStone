export const oktaConfig = {
    issuer: 'https://dev-89041717.okta.com/oauth2/default',
    clientId: "0oa7pco757VD6o28G5d7",
    redirectUri: `${window.location.origin}/login/callback`,
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
};