const CustomObject = require('./CustomObject');

const defs = ['type', 'input', 'schema', 'subscription'];
const TYPE_COMING = 0;
const INPUT_COMING = 1;
const rg_isArray = /[\]\[]/g;

module.exports = function (data) {
    let i = 0, item = data[i], tmp = null, mode = null;

    const json = CustomObject({});

    function next() {
        i++;
        item = data[i];
    }

    function nested(json) {
        while (true) {
            next();
 
            if (item === '}') return;
            else if (item === '{') {
                tmp = null;
                nested(json);
            }
            else if (item === '(') {
                json.addcurr('args');
            }
            else if (item === ')') {
                json.out();
            }
            else if (item === ':') mode = TYPE_COMING;
            else if (mode === TYPE_COMING) {
                json.current.type = item.replace(rg_isArray, '');
                json.current.array = item.match(rg_isArray) ? true : false;
                json.current.required = false;
                tmp = json.current;
                mode = null;
                json.out();
            }
            else if (item === '!') {
                tmp.required = true;
            }
            // add property name
            else {
                json.addcurr(item);
            }
        }
    }

    while (true) {
        if (i === data.length) break;

        if (defs.includes(item)) {
            json.head();
            json.addcurr(item);
        } else if (item === '{') {
            nested(json);
        } else {
            json.addcurr(item);
        }
        next();
    }
    return json.head();
}
