export const oktaConfig = {
    issuer: 'https://dev-92621107.okta.com/oauth2/default',
    clientId: "0oa7pe4bdkFdp1yHb5d7",
    redirectUri: `${window.location.origin}/login/callback`,
    endSessionRedirectUri: `${window.location.origin}`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
};