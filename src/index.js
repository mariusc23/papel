'use strict';

import { defaultMethods, DEBUG_PRIORITY } from './config';
import { defaultScribes } from './scribes';
import { memoMinimatch } from './utils';
import Queue from './queue';

export function Papel(options) {
  let _this = this;

  this.name = options.name;
  this.scribes = options.scribes || defaultScribes;
  this.methods = options.methods || defaultMethods;
  this.queue = new Queue(this);
  this.priority = options.priority || DEBUG_PRIORITY || (this.methods.length - 1);

  this.methods.forEach((method, i) => {
    this[method] = function() {
      let logs = [...arguments];
      return new Promise((resolve, reject) => {
        if (memoMinimatch(_this.name)) {
          _this.queue.push({
            priority: i,
            logs: logs,
            method: method
          }, function(err) {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        }
        else {
          resolve();
        }
      });
    };
  });

  this.log = this.debug;
}

Papel.prototype.addScribe = function(scribe) {
  const index = this.scribes.push(scribe) - 1;

  return () => {
    return this.scribes.splice(index, 1);
  }
};

const papel = new Papel({ name: 'default' });

export default papel;
