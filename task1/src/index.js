import bunyan from 'bunyan';
import minimist from 'minimist';
import readlineSync from 'readline-sync';

const { logfile = 'log.log' } = minimist(process.argv.slice(2));
const questions = ['Орел', 'Решка'];
let count = 0;

const logger = bunyan.createLogger({
  name: 'myLogger',
  streams: [
    {
      level: 'trace',
      stream: process.stdout,
    },
    {
      level: 'info',
      path: `${__dirname}/${logfile}`,
    },
  ],
});

// Запускаем через npm start (!)
logger.trace('\nНачинаем игру "Орел и Решка"');
logger.trace('\nВы можете менять файл для логирования передав его в виде параметра \n--logfile youfile');

while (true) {
  count += 1;
  logger.trace(`\n\nОрел или Решка? Раунд ${count}`);
  const index = readlineSync.keyInSelect(questions, 'Выберите вариант');
  const random = Math.round(Math.random());
  logger.debug(`Вы выбрали: ${questions[index]}`);
  logger.info(`Монета показала: ${questions[random]}`);

  if (!questions[index]) {
    break;
  } else if ((index) === random) {
    logger.warn('Вы угадали');
  } else {
    logger.error('Вы не угадали');
  }
  logger.trace('\n\n\n');
}
