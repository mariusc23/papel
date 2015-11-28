'use strict';

import minimatch from 'minimatch';
import memoize from 'lodash.memoize';
import {DEBUG_PATTERN} from './config';

export const memoMinimatch = memoize(function (name) {
  return minimatch(name, DEBUG_PATTERN);
});
