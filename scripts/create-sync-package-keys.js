const { execute } = require('./shared/execute');

function createSyncPackageKeys(workspace) {
  return function(...keys) {
    keys.forEach(key => {
      const value = JSON.parse(execute(`npm pkg get ${key}`));

      if (Array.isArray(value)) {
        execute(`npm pkg delete ${key} -w ${workspace}`);
        value.forEach(item => execute(`npm pkg set ${key}[]="${item}" -w ${workspace}`));
        return;
      }

      execute(`npm pkg set ${key}="${value}" -w ${workspace}`);
    });
  };
}

module.exports = { createSyncPackageKeys };
