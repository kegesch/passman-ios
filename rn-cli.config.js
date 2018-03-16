'use strict';
const nodelibs = require('node-libs-react-native');
nodelibs.vm  = "vm-browserify";

module.exports = {
    extraNodeModules: nodelibs,
};