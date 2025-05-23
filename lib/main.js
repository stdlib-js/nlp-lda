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

var isNonNegativeInteger = require( '@stdlib/assert-is-nonnegative-integer' );
var isPositiveInteger = require( '@stdlib/assert-is-positive-integer' );
var isStringArray = require( '@stdlib/assert-is-string-array' );
var setReadOnly = require( '@stdlib/utils-define-read-only-property' );
var contains = require( '@stdlib/assert-contains' );
var tokenize = require( '@stdlib/nlp-tokenize' );
var Int32Array = require( '@stdlib/array-int32' );
var format = require( '@stdlib/string-format' );
var matrix = require( './matrix.js' );
var getThetas = require( './get_thetas.js' );
var validate = require( './validate.js' );
var getPhis = require( './get_phis.js' );
var init = require( './init.js' );
var fit = require( './fit.js' );


// FUNCTIONS //

/**
* Find index of the value in vocabulary equal to the supplied search value.
*
* @private
* @param {Array} vocab - vocabulary
* @param {string} searchVal - search value
* @returns {integer} index in vocab if search value is found, -1 otherwise
*/
function findIndex( vocab, searchVal ) {
	var i;
	for ( i = 0; i < vocab.length; i++ ) {
		if ( vocab[ i ] === searchVal ) {
			return i;
		}
	}
	return -1;
}


// MAIN //

/**
* Latent Dirichlet Allocation via collapsed Gibbs sampling.
*
* @param {StringArray} documents - document corpus
* @param {PositiveInteger} K - number of topics
* @param {Options} [options] - options object
* @param {PositiveNumber} [options.alpha=50/K] - Dirichlet hyper-parameter of topic vector theta:
* @param {PositiveNumber} [options.beta=0.1] - Dirichlet hyper-parameter for word vector phi
* @throws {TypeError} first argument must be an array of strings
* @throws {TypeError} second argument must be a positive integer
* @throws {TypeError} must provide valid options
* @returns {Object} model object
*/
function lda( documents, K, options ) {
	var target;
	var vocab;
	var model;
	var alpha;
	var beta;
	var opts;
	var err;
	var pos;
	var nd;
	var it;
	var wd;
	var D;
	var d;
	var i;
	var j;
	var W;
	var w;

	if ( !isStringArray( documents ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be an array of strings. Value: `%s`.', documents ) );
	}
	if ( !isPositiveInteger( K ) ) {
		throw new TypeError( format( 'invalid argument. Number of topics must be a positive integer. Value: `%s`.', K ) );
	}
	opts = {};
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	// Number of documents:
	D = documents.length;

	// Hyper-parameter for Dirichlet distribution of topic vector theta:
	alpha = opts.alpha || 50 / K;

	// Hyper-parameter of Dirichlet distribution of phi:
	beta = opts.beta || 0.1;

	// Extract words & construct vocabulary:
	vocab = [];
	w = [];
	pos = 0;
	for ( d = 0; d < D; d++ ) {
		w.push( [] );
		wd = tokenize( documents[ d ] );
		nd = wd.length;
		for ( i = 0; i < nd; i++ ) {
			target = wd[ i ];
			it = findIndex( vocab, target );
			if ( it === -1 ) {
				vocab.push( target );
				w[ d ].push( pos );
				pos += 1;
			} else {
				w[ d ].push( it );
			}
		}
	}
	// Size of vocabulary:
	W = vocab.length;

	model = {};

	// Attach read-only properties:
	setReadOnly( model, 'K', K );
	setReadOnly( model, 'D', D );
	setReadOnly( model, 'W', W );
	setReadOnly( model, 'alpha', alpha );
	setReadOnly( model, 'beta', beta );

	// Attach methods:
	setReadOnly( model, 'init', init );
	setReadOnly( model, 'fit', fit );
	setReadOnly( model, 'getPhis', getPhis );
	setReadOnly( model, 'getThetas', getThetas );
	setReadOnly( model, 'getTerms', getTerms );

	model.nwSum = new Int32Array( K );
	model.ndSum = new Int32Array( D );
	model.nw = matrix( [ W, K ], 'int32' );
	model.nd = matrix( [ D, K ], 'int32' );

	model.phiList = [];
	model.thetaList = [];

	model.w = w;
	model.init();

	return model;

	/**
	* Get top terms for the specified topic.
	*
	* @private
	* @param {NonNegativeInteger} k - topic
	* @param {PositiveInteger} [no=10] - number of terms
	* @throws {TypeError} first argument must be a nonnegative integer smaller than the total number of topics
	* @throws {TypeError} second argument must be a positive integer
	* @returns {Array} word probability array
	*/
	function getTerms( k, no ) {
		/* eslint-disable no-invalid-this */
		var skip;
		var phi;
		var ret;
		var max;
		var mid;
		var i;

		if ( !isNonNegativeInteger( k ) || k >= K ) {
			throw new TypeError( format( 'invalid argument. First argument must be a nonnegative integer which is less than the total number of topics. Value: `%s`.', k ) );
		}
		if ( no ) {
			if ( !isPositiveInteger( no ) ) {
				throw new TypeError( format( 'invalid argument. Second argument must be a positive integer. Value: `%s`.', no ) );
			}
		} else {
			no = 10;
		}

		ret = [];
		skip = [];
		for ( i = 0; i < no; i++ ) {
			max = 0;
			for ( j = 0; j < this.W; j++ ) {
				phi = this.avgPhi.get( k, j );
				if ( phi > max && !contains( skip, j ) ) {
					max = phi;
					mid = j;
				}
			}
			skip.push( mid );
			ret.push({
				'word': vocab[ mid ],
				'prob': max
			});
		}
		return ret;
	}
}


// EXPORTS //

module.exports = lda;
