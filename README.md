<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# LDA

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> [Latent Dirichlet Allocation][lda] via collapsed Gibbs sampling.

<section class="intro">

</section>

<!-- /.intro -->



<section class="usage">

## Usage

To use in Observable,

```javascript
lda = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/nlp-lda@umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var lda = require( 'path/to/vendor/umd/nlp-lda/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/nlp-lda@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.lda;
})();
</script>
```

#### lda( docs, K\[, options] )

[Latent Dirichlet Allocation][lda] via collapsed Gibbs sampling. To create a model, call the `lda` function by passing it an `array` of `strings` and the number of topics `K` that should be identified.

```javascript
var model;
var docs;

docs = [
    'I loved you first',
    'For one is both and both are one in love',
    'You never see my pain',
    'My love is such that rivers cannot quench',
    'See a lot of pain, a lot of tears'
];

model = lda( docs, 2 );
// returns {}
```

After initialization, model parameters are estimated by calling the `.fit()` method, which performs collapsed Gibbs sampling.

The model object contains the following methods:

#### model.fit( iter, burnin, thin )

<!-- run-disable -->

```javascript
model.fit( 1000, 100, 10 );
```

The `iter` parameter denotes the number of sampling iterations. While a common choice, one thousand iterations might not always be appropriate. Empirical diagnostics can be used to assess whether the constructed Markov Chain has converged. `burnin` denotes the number of estimates that are thrown away at the beginning, whereas `thin` controls the number of estimates discarded in-between iterations.

#### model.getTerms( k\[, no = 10] )

Returns the `no` terms with the highest probabilities for chosen topic `k`.

<!-- run-disable -->

```javascript
var words = model.getTerms( 0, 3 );
/* returns
    [
        { 'word': 'both', 'prob': 0.06315008476532499 },
        { 'word': 'pain', 'prob': 0.05515729517235543 },
        { 'word': 'one', 'prob': 0.05486669737616135 }
    ]
*/
```

</section>

<!-- /.usage -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/datasets-sotu@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-roundn@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/datasets-stopwords-en@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/string-lowercase@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/nlp-lda@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var speeches;
var words;
var terms;
var model;
var str;
var i;
var j;

words = stopwords();
for ( i = 0; i < words.length; i++ ) {
    words[ i ] = new RegExp( '\\b'+words[ i ]+'\\b', 'gi' );
}

speeches = sotu({
    'range': [ 1930, 2010 ]
});
for ( i = 0; i < speeches.length; i++ ) {
    str = lowercase( speeches[ i ].text );
    for ( j = 0; j < words.length; j++ ) {
        str = str.replace( words[ j ], '' );
    }
    speeches[ i ] = str;
}

model = lda( speeches, 3 );

model.fit( 1000, 100, 10 );

for ( i = 0; i <= 80; i++ ) {
    str = 'Year: ' + (1930+i) + '\t';
    str += 'Topic 1: ' + roundn( model.avgTheta.get( i, 0 ), -3 ) + '\t';
    str += 'Topic 2: ' + roundn( model.avgTheta.get( i, 1 ), -3 ) + '\t';
    str += 'Topic 3: ' + roundn( model.avgTheta.get( i, 2 ), -3 );
    console.log( str );
}

terms = model.getTerms( 0, 20 );
for ( i = 0; i < terms.length; i++ ) {
    terms[ i ] = terms[ i ].word;
}
console.log( 'Words most associated with first topic:\n ' + terms.join( ', ' ) );

terms = model.getTerms( 1, 20 );
for ( i = 0; i < terms.length; i++ ) {
    terms[ i ] = terms[ i ].word;
}
console.log( 'Words most associated with second topic:\n ' + terms.join( ', ' ) );

terms = model.getTerms( 2, 20 );
for ( i = 0; i < terms.length; i++ ) {
    terms[ i ] = terms[ i ].word;
}
console.log( 'Words most associated with third topic:\n ' + terms.join( ', ' ) );

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/nlp-lda.svg
[npm-url]: https://npmjs.org/package/@stdlib/nlp-lda

[test-image]: https://github.com/stdlib-js/nlp-lda/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/nlp-lda/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/nlp-lda/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/nlp-lda?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/nlp-lda.svg
[dependencies-url]: https://david-dm.org/stdlib-js/nlp-lda/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/nlp-lda/tree/deno
[umd-url]: https://github.com/stdlib-js/nlp-lda/tree/umd
[esm-url]: https://github.com/stdlib-js/nlp-lda/tree/esm
[branches-url]: https://github.com/stdlib-js/nlp-lda/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/nlp-lda/main/LICENSE

[lda]: https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation

</section>

<!-- /.links -->
