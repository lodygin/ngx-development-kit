const { execSync } = require('child_process');

function execute(shell, options = { encoding: 'utf-8' }) {
  return execSync(shell, options)?.toString().trim();
}

module.exports = { execute };
