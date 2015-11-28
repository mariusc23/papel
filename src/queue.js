'use strict';

import { queue, eachLimit } from 'async'
import { CONCURRENCY } from './config';

export default function Queue(papelInstance) {
  return queue((data, done) => {
    eachLimit(
      papelInstance.scribes,
      CONCURRENCY,
      function(scribe, next) {
        try {
          var result = scribe(data, papelInstance);
        }
        catch (err) {
          return next(err);
        }

        if (result instanceof Promise) {
          result.then(next).catch(next);
        }
        else {
          next();
        }
      },
      function(err) {
        if (err) {
          console.error(err);
        }
        done(err);
      }
    )
  }, CONCURRENCY);
}
