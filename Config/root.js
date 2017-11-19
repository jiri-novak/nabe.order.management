const path = require('path');
const root = path.resolve(__dirname, '..');
module.exports = (...args) => path.join(root, ...args);