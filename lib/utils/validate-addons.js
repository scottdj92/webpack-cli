const exists = require('./npm-exists');
const resolvePackages = require('./resolve-packages');

module.exports = (addons) => addons.map( pkg => checkExistence(pkg));

/*
* @function checkExistence
*
* Checks if a package is registered on npm and throws if it is not
*
* @param { Array } pkg - pkg to check existence of
* @returns { <Function|Error> } resolvePackages - Returns an process to install the pkg
*/

function checkExistence(pkg) {
	return exists(pkg).then( (moduleExists) => {
		if(!moduleExists) {
			Error.stackTraceLimit = 0;
			throw new TypeError('Package isn\'t registered on npm.');
		}
		if (moduleExists) {
			return resolvePackages(pkg);
		}
	}).catch(err => {
		console.error(err.stack || err);
		process.exit(0);
	});
}
