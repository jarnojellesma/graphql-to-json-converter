const lexer = require('./lexer');
const parser = require('./parser');

module.exports = function convert(data) {
  const tokens = lexer(data);
  return parser(tokens);
}
