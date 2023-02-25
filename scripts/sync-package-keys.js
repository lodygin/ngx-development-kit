const { createSyncPackageKeys } = require('./create-sync-package-keys');

const syncPackageKeys = createSyncPackageKeys('ngx-development-kit');

syncPackageKeys(
  'version',
  'description',
  'homepage',
  'bugs.url',
  'license',
  'author',
  'repository',
  'keywords',
);
