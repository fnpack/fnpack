import { AsyncEventStream } from '../asyncEventStream';


export class Time extends AsyncEventStream {
    //todo: validate schedule string
    constructor(private schedule: string) { super(); }

    getFragment(): Object {
        return {
            functions: {
                '$target': {
                    events: [
                        {
                            schedule: {
                                rate: `cron(${this.schedule})`,
                                enabled: true
                            }
                        }
                    ]
                }
            }
        }
    }

    static interval(cronInterval: string): Time {
        return new Time(cronInterval);
    }
}