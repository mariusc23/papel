'use strict';

import chalk from 'chalk';

export function consoleScribe(data, papelInstance) {
  if (data.priority <= papelInstance.priority) {
    let {logs, method, priority} = data;

    let label = papelInstance.name === 'default' ? method : (papelInstance.name + ':' + method);

    if (priority === 0) {
      label =  chalk.red(label);
    }
    else if (priority === 1) {
      label =  chalk.yellow(label);
    }
    else if (priority >= 4) {
      label =  chalk.dim(label);
    }
    else {
      label =  chalk.cyan(label);
    }

    return console.log.apply(console, [
      label,
      ...logs
    ]);
  }
}

export const defaultScribes = [consoleScribe];
