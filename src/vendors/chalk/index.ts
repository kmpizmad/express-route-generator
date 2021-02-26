import chalk from 'chalk';

export class Chalk {
  public static log(color: chalk.Chalk, message: string) {
    return () => {
      Chalk.writeLine(color, message);
    };
  }

  public static writeLine(color: chalk.Chalk, message: string): void {
    console.log(color(message));
  }
}
