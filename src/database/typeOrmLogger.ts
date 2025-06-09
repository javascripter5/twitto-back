import { Logger, QueryRunner, AdvancedConsoleLogger, LoggerOptions } from "typeorm";

export class CustomTypeOrmLogger extends AdvancedConsoleLogger implements Logger {
  private _completed: boolean = false;
    constructor(options?: LoggerOptions, completed: boolean = false) {
        super(options);
        this._completed = completed;
    }    
    // make is small
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        let logText = query;
        if (logText.length > 100) {
          // Truncate the log text if it's too long:
          logText = logText.substring(0, 1) + "...";
        }
        
        if (this._completed) {
          super.logQuery(query, parameters, queryRunner); // retrun the completed query
        } else {
          super.logQuery(logText, parameters, queryRunner); // retrun the small query
        }
    }
}