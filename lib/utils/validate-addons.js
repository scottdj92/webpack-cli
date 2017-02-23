const exists = require('./npm-exists');
const resolvePackages = require('./resolve-packages');


/*
* @function validateAddons
*
* Loops through an array and checks if a package is registered
* on npm and throws an error if it is not from @checkExistence
*
* @param { Array } pkg - Array of packages to check existence of
* @returns { <Function|Error> } resolvePackages - Returns an process to install the pkg
*/

module.exports = function validateAddons(addons) {
	return addons.map( pkg => checkExistence(pkg));
};

/*
* @function checkExistence
*
* Checks if a package is registered on npm and throws if it is not
*
* @param { Object } pkg - pkg to check existence of
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
