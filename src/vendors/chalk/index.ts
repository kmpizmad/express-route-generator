import chalk from 'chalk';

export class Chalk {
  public static writeLine(color: chalk.Chalk, message: string): void {
    console.log(color(message));
  }
}
