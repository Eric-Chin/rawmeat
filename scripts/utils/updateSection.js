const updateSection = require('update-section')

function matchesStart(line) {
  return (/<!-- start blog /).test(line);  
}

function matchesEnd(line) {
  return (/<!-- end blog /).test(line);  
}

module.exports = function (original, update) {
  update = '<!-- start blog index -->\n' + update + '\n\n<!-- end blog index -->' 
  return updateSection(original, update, matchesStart, matchesEnd)
}