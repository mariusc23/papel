'use strict';

import { cpus } from 'os';

export const defaultMethods = [
  'error',
  'warn',
  'debug',
  'info',
  'verbose',
  'silly'
];

export const CONCURRENCY = cpus().length;
export const DEBUG_PATTERN = process.env.DEBUG || '*';
export const DEBUG_PRIORITY = parseInt(process.env.DEBUG_PRIORITY, 10);
