
const fs = require("fs");

let modelFile;

const loadJson = () => {
    modelFile = JSON.parse(fs.readFileSync('modelFile.json', {encoding: 'utf8'}));
}
const getModel = () => {
    return modelFile;
}

module.exports = {loadJson, getModel}



