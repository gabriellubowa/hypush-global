// The inline script that applies the visitor's color mode before first paint.
// next.config.ts hashes COLOR_MODE_SCRIPT for the Content Security Policy and
// pages/_document.tsx renders it, so both always use the exact same text.
const tokens = require("./tokens.json");

function buildColorModeScript(theme) {
  return [
    "(function(){",
    "var colors=" + JSON.stringify(theme.colors) + ";",
    "var spacing=" + JSON.stringify(theme.spacing) + ";",
    "var mode;",
    'try{mode=window.localStorage.getItem("color-mode");}catch(e){}',
    'if(mode!=="light"&&mode!=="dark"){',
    'mode=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}',
    "var root=document.documentElement;",
    "var all=Object.assign({},colors[mode],spacing);",
    "Object.keys(all).forEach(function(k){root.style.setProperty(k,all[k]);});",
    'root.style.setProperty("--initial-color-mode",mode);',
    "})()",
  ].join("");
}

module.exports = { COLOR_MODE_SCRIPT: buildColorModeScript(tokens) };
