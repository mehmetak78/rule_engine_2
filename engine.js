const modelFile = require("./modelFile.js")
const _ = require("lodash")

modelFile.loadJson();
let rules = modelFile.getModel();

const executeModel = (spec) => {
    return rules
        .filter((r) => isActive(r, spec))
        .map((r) => result(r, spec))
    // return _.chain(rules)
    //     .filter((r) => isActive(r, spec))
    //     .map((r) => result(r, spec))
    //     .flatten()
    //     .uniq()
    //     .value()
}

function isActive(rule, spec) {
    switch (rule.condition) {
        case 'atNight': return spec.atNight;
        case 'seasonIncludes': return seasonIncludes(spec, rule.conditionArgs[0]);
        case 'countryIncludedIn': return countryIncludedIn(spec, rule.conditionArgs[0]);
        case 'pickMinDuration': return true;
        case 'and': return rule.conditionArgs.every((arg) => isActive(arg, spec));
        case 'not': return !isActive(rule.conditionArgs[0], spec);
        default: throw new Error("unable to handle " + rule.condition);
    }
}

function countryIncludedIn(spec, anArray) {
    return anArray.includes(spec.country);
}
function seasonIncludes(spec, arg) {
    return spec.seasons && spec.seasons.includes(arg);
}

function result(rule, spec) {
    if (rule.result === "value") return rule.resultArgs[0];
    if (rule.result === 'pickMinDuration')
        return pickMinDuration(spec, rule.resultArgs[0]);
    throw new Error("unknown result function: " + r.result)
}

function pickFromRange(range, value) {
    const matchIndex = range.findIndex((r) => value < r[0]);
    return range[matchIndex][1];
}

function pickMinDuration(spec, range) {
    return (spec.minDuration) ? pickFromRange(range, spec.minDuration) : [];
}

module.exports = {executeModel}