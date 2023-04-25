export const OktaConfig = {
  clientId: "0oa97fg71vI8GjbsO5d7",
  issuer: "https://dev-74231503.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scope: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
  useInteractionCodeFlow: false,
  useClassicEngine: true,
};
