// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || "local",
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://9d23ca8995263ea67b2db461736d2387@o4506043986280448.ingest.us.sentry.io/4510728696102912",
  environment: process.env.NODE_ENV || "local",
});
