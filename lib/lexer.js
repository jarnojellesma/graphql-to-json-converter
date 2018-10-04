const SINGLE = 0, BUFFERING = 1;

function isWhitespace (c) {
  return c === ' ' || c === '\n' || c === '\r' || c === '\t'
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

module.exports = function (data) {

  let i = 0, c = data[i], buffer = '', mode = SINGLE, currname, ignore = false;

  let ignoreMultipleLines = false;
  
  const result = [];

  function pushboth() {
    if (buffer) result.push(buffer);
    result.push(c);
    buffer = '';
    mode = SINGLE;
  }

  while (true) {
    if (i === data.length) break;




    if (c === '"')
    {
      if(data[i + 1] === '"' && data[i + 2] === '"')
      {
        // enters here successfully. should set ignore.
        i = i + 3;
        ignoreMultipleLines = !ignoreMultipleLines;
        c = data[i];
      }
    }


    if (c === '#' && !ignoreMultipleLines) ignore = true;


    //	if (c === '#') ignore = true;


    //if(!ignore)
    if (!ignore && !ignoreMultipleLines) {
      switch(mode) {
        case SINGLE:
        if (isWhitespace(c)) break;
        if (isLetter(c)) {
          buffer += c;
          mode = BUFFERING;
          break;
        }
        case BUFFERING:
        if(c === '{') {
          result.push(c);
        } else if (c === '}') {
          result.push(c);
        } else if (c === ':') {
          pushboth();
        } else if (c === '!') {
          pushboth();
        } else if (c === '(') {
          pushboth();
        } else if (c === ')') {
          pushboth();
        } else if (c === '=') { //added
          pushboth();
        } else if (c === '|') { //added
          pushboth();
        } else {
          if (isWhitespace(c)) {
            if (buffer) result.push(buffer);
            buffer = '';
            mode = SINGLE;
            break;
          }
          buffer += c;
        }
      }
    } else {

      //
      //if (c === '\n') ignore = false;

      if(c === '\n' && !ignoreMultipleLines) ignore = false;
    }
    i++;
    c = data[i];
  }
  return result;
}
