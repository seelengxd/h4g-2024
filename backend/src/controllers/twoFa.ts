import crypto from "crypto";
import SgidClient, { generatePkcePair } from "@opengovsg/sgid-client";
import { RequestHandler } from "express";
import { requireLogin } from "../middleware/auth";

export const BACKEND_URL = process.env.BACKEND_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
const SESSION_COOKIE_NAME = "exampleAppSession";
const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
};

type SessionData = Record<
  string,
  | {
      nonce?: string;
      state?: URLSearchParams;
      accessToken?: string;
      codeVerifier?: string;
      sub?: string;
    }
  | undefined
>;

const twoFaSessionData: SessionData = {};

// Initialise sgID Client
const sgid = new SgidClient({
  clientId: String(process.env.SGID_CLIENT_ID),
  clientSecret: String(process.env.SGID_CLIENT_SECRET),
  privateKey: String(process.env.SGID_PRIVATE_KEY),
  redirectUri: `${BACKEND_URL}/api/two-fa/redirect`,
});

export const auth: RequestHandler = (req, res) => {
  // Generate a PKCE pair
  const { codeChallenge, codeVerifier } = generatePkcePair();
  const sessionId = crypto.randomUUID();

  const { url, nonce } = sgid.authorizationUrl({
    codeChallenge,
    scope: ["openid", "myinfo.name"],
  });

  twoFaSessionData[sessionId] = { nonce, codeVerifier };

  return res
    .cookie(SESSION_COOKIE_NAME, sessionId, SESSION_COOKIE_OPTIONS)
    .json({ data: { redirectUrl: url } });
};

export const redirect: RequestHandler = async (req, res) => {
  const twoFaRedirectRoute = `${FRONTEND_URL}/2fa-redirect`;

  const authCode = String(req.query.code);
  const sessionId = String(req.cookies[SESSION_COOKIE_NAME]);

  const session = { ...twoFaSessionData[sessionId] };

  // Validate that the code verifier exists for this session
  if (session?.codeVerifier === undefined) {
    res.redirect(twoFaRedirectRoute);
    return;
  }

  // Exchange the authorization code and code verifier for the access token
  const { codeVerifier, nonce } = session;
  const { accessToken, sub } = await sgid.callback({
    code: authCode,
    nonce,
    codeVerifier,
  });

  session.accessToken = accessToken;
  session.sub = sub;
  twoFaSessionData[sessionId] = session;

  // Successful login, redirect to logged in state
  res.redirect(twoFaRedirectRoute);
};

export const hasTwoFaSession: RequestHandler[] = [
  // requireLogin,
  async (req, res) => {
    const sessionId = String(req.cookies[SESSION_COOKIE_NAME]);

    // Retrieve the access token and sub
    const session = twoFaSessionData[sessionId];
    const accessToken = session?.accessToken;
    const sub = session?.sub;

    // User is not authenticated
    if (
      session === undefined ||
      accessToken === undefined ||
      sub === undefined
    ) {
      console.log("User is not authenticated");
      return res.sendStatus(401);
    }

    const userInfo = await sgid.userinfo({ accessToken, sub });

    return res.json({ data: userInfo });
  },
];