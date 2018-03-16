'use strict';
const nodelibs = require('node-libs-react-native');
nodelibs.vm  = require.resolve('vm-browserify');

module.exports = {
    extraNodeModules: nodelibs,
};