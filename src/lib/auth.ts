import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import GitHubProvider from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendVerificationRequest(params: any) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url }),
      text: text({ url, host }),
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

function html(params: { url: string}) {
  const { url } = params;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
    "
  >
    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="min-width: 100%; background-color: #f3f4f6"
    >
      <tr>
        <td align="center" style="padding: 40px 0">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="600"
            style="
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            "
          >
            <tr>
              <td
                style="
                  background-color: #3b82f6;
                  padding: 40px 0;
                  text-align: center;
                "
              >
                <h1
                  style="
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                  "
                >
                  Verify Your Email
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px">
                <p
                  style="
                    color: #4b5563;
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 24px;
                    text-align: center;
                  "
                >
                  Thanks for signing up! We're excited to have you on board. To
                  get started, please verify your email address by clicking the
                  button below.
                </p>
                <table
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  style="margin-bottom: 32px"
                >
                  <tr>
                    <td align="center">
                      <a
                        href="${url}"
                        style="
                          display: inline-block;
                          background-color: #3b82f6;
                          color: #ffffff;
                          font-size: 16px;
                          font-weight: 600;
                          text-decoration: none;
                          padding: 12px 32px;
                          border-radius: 8px;
                          transition: background-color 0.3s ease;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                        "
                        >Verify your email</a
                      >
                    </td>
                  </tr>
                </table>
                <p
                  style="
                    color: #6b7280;
                    font-size: 14px;
                    line-height: 1.6;
                    margin-bottom: 0;
                    text-align: center;
                  "
                >
                  If you didn't create an account, no further action is
                  required.
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background-color: #f9fafb;
                  padding: 24px;
                  text-align: center;
                "
              >
                <p style="color: #9ca3af; font-size: 12px; margin: 0">
                  © 2025 Acme Inc. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY!, 
      // from: 'Acme <onboarding@resend.dev>',  // If you are using Resend and do not have a domain
      from: "Acme Inc. <acme@mvp-subha.me>", // For personal domains
      sendVerificationRequest, // For customised emails
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    verifyRequest: "/verify-request",
  },
});