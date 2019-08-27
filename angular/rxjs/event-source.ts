// Event source with Headers

import { Observable, of } from 'rxjs';
import { EventSourcePolyfill } from 'ng-event-source';

export const EventSourcePolyfill = EventSourcePolyfill || EventSource;

export function getEventSourceAsObservable(url: string, options?: any) {
  return new Observable((observer) => {
    const eventSource = new EventSourcePolyfill(
      url,
      {
        ...options,
        heartbeatTimeout: 45000,
        headers: {
          ...this.securityHeadersFactory.whitelistPredicate(<any> {}) ? this.securityHeadersFactory.headers : {},
          ...this.clientIdHeadersFactory.headers,
          ...this.mediaTypeHeaders,
          ...options.headers
        }
      }
    );

    eventSource.addEventListener('message', (message: any) => {
      if (isJson(get(message, 'data'))) {
        observer.next(JSON.parse(message.data));
      } else {
        observer.next(get(message, 'data'));
      }
    });
    eventSource.addEventListener('error', (error: any) => observer.error(error));

    return () => eventSource.close();
  });
}