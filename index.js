console.log("Rule Engine is running...")

const engine = require("./engine.js")

let spec1 = {
    atNight: "1",
    seasons: ["winter"],
    country: "sparta",
    minDuration: 400
}
let actions1 = engine.executeModel(spec1);
console.log("Actions for Spec1 : " + actions1);

let spec2 = {
    atNight: "1",
    seasons: ["summer"],
    country: "sparta",
    minDuration: 400
}
let actions2 = engine.executeModel(spec2);
console.log("Actions for Spec2 : " + actions2);
