const Sentry = require('@sentry/node');
const child_process = require('child_process');
const branchName = child_process.execSync('git rev-parse --abbrev-ref @').toString().trim();
const username = child_process.execSync('git show -s --format="%an" @').toString().trim();

class ExpectationError extends Error {
  constructor(message, stack) {
    super(message);
    this.name = stack.indexOf(':') > 0 ? stack.split(':', 1)[0] : this.constructor.name;
    this.message = message;
    this.stack = stack;
  }
}

/**
 * @see https://github.com/fastmonkeys/jasmine-sentry-reporter
 */
class JasmineSentryReporter {
  constructor(browserParams) {
    this.browserParams = browserParams;
    Sentry.init({
      dsn: 'DSN',
      attachStacktrace: true,
      debug: true
    });
  }

  specDone(result) {
    if (result.status === 'failed') {
      result.failedExpectations
        .forEach((failedExpectation) => this._reportToSentry(result, failedExpectation));
    }
  }

  _reportToSentry(result, failedExpectation) {
    const err = new ExpectationError(failedExpectation.message, failedExpectation.stack);

    Sentry.configureScope((scope) => {
      scope.setExtra('expected', failedExpectation.expected);
      scope.setExtra('actual', failedExpectation.actual);
      scope.setExtra('specDuration', result.duration);
      scope.setExtra('timestamp', result.started);
      scope.setTag('specName', result.fullName);
      scope.setTag('branchName', branchName);
      scope.setTag('baseUrl', this.browserParams.url);
      scope.setTag('width', this.browserParams.width);
      scope.setTag('height', this.browserParams.height);
      scope.setUser({ username: username });
    });
    Sentry.captureException(err);
  }
}

module.exports = JasmineSentryReporter;
