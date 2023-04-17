// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  chainId: z.string().min(1),
  masterKey: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === 'production'
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().min(1),
  ADMIN_ADDRESS: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.input<typeof serverSchema>]: string | undefined }}
 */
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
  chainId: process.env.chainId,
  masterKey: process.env.masterKey,
  JWT_SECRET: process.env.JWT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  ADMIN_ADDRESS: process.env.ADMIN_ADDRESS,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_APP_ID: z.string().min(1),
  NEXT_PUBLIC_SERVER_URL: z.string().min(1),
  NEXT_PUBLIC_GRAPH_LOCAL_NODE: z.string().min(1),
  NEXT_PUBLIC_GRAPH_REAL_NODE: z.string().min(1),
  NEXT_PUBLIC_ADMIN_ADDRESS: z.string().min(1),
  NEXT_PUBLIC_INFURA_ID: z.string().min(1),
  NEXT_PUBLIC_ALCHEMY_ID: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.input<typeof clientSchema>]: string | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_GRAPH_LOCAL_NODE: process.env.NEXT_PUBLIC_GRAPH_LOCAL_NODE,
  NEXT_PUBLIC_GRAPH_REAL_NODE: process.env.NEXT_PUBLIC_GRAPH_REAL_NODE,
  NEXT_PUBLIC_ADMIN_ADDRESS: process.env.NEXT_PUBLIC_ADMIN_ADDRESS,
  NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
};
