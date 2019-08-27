// Parallel protractor
exports.config = {
  multiCapabilities: [
    {
      shardTestFiles: true,
      maxInstances: 1,
      sequential: true,
      browserName: 'chrome',
      specs: ['specs/spec1.js','specs/spec2.js','specs/spec3.js']
    },
    {
      shardTestFiles: true,
      maxInstances: 1,
      sequential: true,
      browserName: 'chrome',
      specs: ['specs/spec4.js',
        'specs/spec5.js',
        'specs/spec6.js',
      ]
    }
  ]
};