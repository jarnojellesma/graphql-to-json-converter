const fs = require('fs');
const schema = fs.readFileSync('./example/schema.gql', "utf8");
const convert = require('../index');

const jsonSchema = convert(schema);

fs.writeFile('./example/generated-schema.json', 
    JSON.stringify(jsonSchema, null, 2) + '\n', 
    'utf8', 
    function (err) {
      if (err) console.log(err);
});
