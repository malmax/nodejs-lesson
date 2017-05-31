import beep from 'beepbeep';
import chalk from 'chalk';

const argv = process.argv[2] || 'normal';

switch (argv) {
  case 'inverse': {
    console.log(chalk.black.bgCyan.bold('Hello, World!'));
    beep([1000, 500]);
    console.log(chalk.underline.white.bgBlack('this is my inverse message =)'));
    beep([1000]);

    break;
  }
  default: {
    console.log(chalk.white.bgBlue.bold('Hello, World!'));
    beep([1000, 500]);
    console.log(chalk.underline.black.bgWhite('this is my message =)'));
    beep([1000, 500, 2000]);

    break;
  }
}
