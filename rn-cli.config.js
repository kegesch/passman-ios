'use strict';
const nodelibs = require('node-libs-react-native');

nodelibs.vm = require.resolve('vm-browserify');

module.exports = {
	extraNodeModules: nodelibs,
	getTransformModulePath() {
		return require.resolve('react-native-typescript-transformer');
	},
	getSourceExts() {
		return ['ts', 'tsx'];
	}
};
