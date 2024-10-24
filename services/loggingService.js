import config from 'config'
import morgan from 'morgan'
import currentTime from '../utils/formatTime.js';
import chalk from 'chalk';
import fs from 'fs'

const logger = config.get('LOGGER');
const now = currentTime();
const dirPath = './logs'

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log(chalk.magenta(`Logs Directory ${dirPath} created.`))
}

const logToFile = (log) => {
  const { year, month, day } = now;
  const currentFile = dirPath + `/${year}-${month}-${day}-error-logs.log`;
  if (!fs.existsSync(currentFile)) {
    fs.appendFileSync(currentFile, `${year}-${month}-${day} Error Logs. \n`, { flag: 'a+' });
    fs.appendFileSync(currentFile, log + '\n');
    console.log(chalk.magenta(`Created ${currentFile} log file.`))
  } else {
    fs.appendFileSync(currentFile, log + '\n');
    console.log(chalk.magenta(`Updated ${currentFile} with a new error.`))
  }
}

const morganLogger = () => {
  return morgan(function (tokens, req, res) {
    const log = [
      `[${now.year}/${now.month}/${now.day} ${now.hours}:${now.minutes}:${now.seconds}]`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ');

    if (res.statusCode >= 400) {
      logToFile(log);
      return chalk.red(log);
    } else {
      return chalk.cyan(log);
    }
  })
}

const logRequests = () => {
  if (logger === 'morgan') {
    return morganLogger();
  }
}

export default logRequests;