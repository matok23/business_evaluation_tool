import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig } from '@adonisjs/cors';


/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */

const corsOrigins =
  env.get('CORS_ORIGINS') ?? 'http://localhost:5173';

const allowedOrigins = corsOrigins
  .split(',')
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);

const corsConfig = defineConfig({
  /**
   * Enable or disable CORS handling globally.
   */
  enabled: true,

  /**
   * In development, allow every origin to simplify local front/backend setup.
   * In production, keep an explicit allowlist (empty by default, so no
   * cross-origin browser access is allowed until configured).
   */
  origin: app.inDev ? true : allowedOrigins,

  /**
   * HTTP methods accepted for cross-origin requests.
   */
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],

  /**
   * Reflect request headers by default. Use a string array to restrict
   * allowed headers.
   */
  headers: true,

  /**
   * Response headers exposed to the browser.
   */
  exposeHeaders: [],

  /**
   * Allow cookies/authorization headers on cross-origin requests.
   */
  credentials: true,

  /**
   * Cache CORS preflight response for N seconds.
   */
  maxAge: 90,
});

export default corsConfig;
