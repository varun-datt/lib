// import { Injectable } from '@angular/core';
// import * as Sentry from '@sentry/browser';
// import { get } from 'lodash';
// import { EMPTY, Observable } from 'rxjs';
//
// import { Transport } from '../abstract.transport';
// import { Level } from '../level.enum';
// import { Meta } from '../meta.model';
//
// @Injectable()
// export class SentryTransport extends Transport {
//   constructor() {
//     super();
//     Sentry.init({
//       dsn: SENTRY_DSN,
//       attachStacktrace: true,
//       debug: true,
//       environment: ENV
//     });
//   }
//
//   public log(level: Level, message: string, meta?: Meta): Observable<void> {
//     if (this.silent) {
//       return EMPTY;
//     }
//
//     if (level === Level.Error) {
//       Sentry.captureException(get(meta, 'error', message));
//     }
//
//     return EMPTY;
//   }
// }