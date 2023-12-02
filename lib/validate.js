/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isPositive = require( '@stdlib/assert-is-positive-number' ).isPrimitive;
var isObject = require( '@stdlib/assert-is-plain-object' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var format = require( '@stdlib/error-tools-fmtprodmsg' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {PositiveNumber} [options.alpha] - Dirichlet hyper-parameter of topic vector theta:
* @param {PositiveNumber} [options.beta] - Dirichlet hyper-parameter for word vector phi
* @returns {(Error|null)} null or an error object
*
* @example
* var opts = {};
* var options = {};
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( format( '0kV2V,FD', options ) );
	}
	if ( hasOwnProp( options, 'alpha' ) ) {
		opts.alpha = options.alpha;
		if ( !isPositive( opts.alpha ) ) {
			return new TypeError( format( '0kV4D,Gu', 'alpha', opts.alpha ) );
		}
	}
	if ( hasOwnProp( options, 'beta' ) ) {
		opts.beta = options.beta;
		if ( !isPositive( opts.beta ) ) {
			return new TypeError( format( '0kV4D,Gu', 'beta', opts.beta ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;