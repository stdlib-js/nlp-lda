// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nonnegative-integer@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-string-array@v0.0.8-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-contains@esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/nlp-tokenize@esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/array-int32@esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.0.2-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@esm/index.mjs";import{isPrimitive as m}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-number@esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@esm/index.mjs";function u(){var t,s,i,e,r,h,o;for(1===arguments.length?i=arguments[0]:2===arguments.length&&(i=arguments[0],t=arguments[1]),s=i.length,r=1,o=0;o<s;o++)r*=i[o];return e="int32"===t?new n(r):new a(r),(h={}).dtype=t,h.shape=i,h.strides=[i[1],1],h.offset=0,h.ndims=i.length,h.length=e.length,h.nbytes=e.byteLength,h.data=e,d(h,"get",m),d(h,"set",p),h;function m(t,s){var i=this.offset+t*this.strides[0]+s*this.strides[1];return this.data[i]}function p(t,s,i){return(t=this.offset+t*this.strides[0]+s*this.strides[1])>=0&&(this.data[t]=i),this}}function j(){var t,s,i,e;for(t=u([this.D,this.K]),i=0;i<this.D;i++)for(e=0;e<this.K;e++)s=(this.nd.get(i,e)+this.alpha)/(this.ndSum[i]+this.K*this.alpha),t.set(i,e,s);return t}function w(t,s){return p(s)?l(s,"alpha")&&(t.alpha=s.alpha,!m(t.alpha))?new TypeError(o("0NA4Q","alpha",t.alpha)):l(s,"beta")&&(t.beta=s.beta,!m(t.beta))?new TypeError(o("0NA4Q","beta",t.beta)):null:new TypeError(o("0NA2h",s))}function b(){var t,s,i,e;for(t=u([this.K,this.W]),i=0;i<this.K;i++)for(e=0;e<this.W;e++)s=(this.nw.get(e,i)+this.beta)/(this.nwSum[i]+this.W*this.beta),t.set(i,e,s);return t}function v(){var t,s,i,e,r,h;for(this.z=[],r=0;r<this.D;r++){for(this.z.push([]),i=this.w[r].length,h=0;h<i;h++)s=g(f()*this.K),this.z[r].push(s);for(this.ndSum[r]=i,h=0;h<i;h++)e=this.w[r][h],t=this.z[r][h],this.nw.set(e,t,this.nw.get(e,t)+1),this.nd.set(r,t,this.nd.get(r,t)+1),this.nwSum[t]=this.nwSum[t]+1}}function c(t,s,i){var e,r,h,n,o,a,d,m;for(a=u([h=t.shape[0],n=t.shape[1]]),e=(i-1)/i,r=1/i,d=0;d<h;d++)for(m=0;m<n;m++)o=e*t.get(d,m)+r*s.get(d,m),a.set(d,m,o);return a}function y(t,i,e){var r,h,n,a,d,m,p,l,g,u,j,w,b,v;if(!s(t))throw new TypeError(o("0NA4o",t));if(!s(i))throw new TypeError(o("0NA4I",i));if(!s(e))throw new TypeError(o("0NA6D",e));for(h=this.W*this.beta,r=this.K*this.alpha,j=0;j<t;j++){for(u=0;u<this.D;u++)for(v=0;v<this.ndSum[u];v++){for(m=this.w[u][v],n=this.z[u][v],this.nw.set(m,n,this.nw.get(m,n)-1),this.nd.set(u,n,this.nd.get(u,n)-1),this.ndSum[u]-=1,this.nwSum[n]-=1,d=[],w=0;w<this.K;w++)d.push((this.nw.get(m,w)+this.beta)/(this.nwSum[w]+h)*(this.nd.get(u,w)+this.alpha)/(this.ndSum[u]+r));for(w=1;w<this.K;w++)d[w]+=d[w-1];for(b=d[this.K-1]*f(),n=0,g=0;g<this.K;g++)if(d[g]>b){n=g;break}this.nw.set(m,n,this.nw.get(m,n)+1),this.nd.set(u,n,this.nd.get(u,n)+1),this.nwSum[n]+=1,this.ndSum[u]+=1,this.z[u][v]=n}j%e==0&&j>i&&(p=this.getPhis(),a=this.getThetas(),this.phiList.push(p),this.thetaList.push(a),l=this.phiList.length,this.avgPhi=1===l?p:c(this.avgPhi,p,l),l=this.thetaList.length,this.avgTheta=1===l?a:c(this.avgTheta,a,l))}}function x(t,s){var i;for(i=0;i<t.length;i++)if(t[i]===s)return i;return-1}function T(a,d,m){var p,l,f,g,c,T,S,K,E,N,A,z,L,D,W,P,k;if(!i(a))throw new TypeError(o("0NACX",a));if(!s(d))throw new TypeError(o("invalid argument. Number of topics must be a positive integer. Value: `%s`.",d));if(T={},arguments.length>2&&(S=w(T,m)))throw S;for(z=a.length,g=T.alpha||50/d,c=T.beta||.1,l=[],k=[],K=0,L=0;L<z;L++)for(k.push([]),E=(A=h(a[L])).length,D=0;D<E;D++)p=A[D],-1===(N=x(l,p))?(l.push(p),k[L].push(K),K+=1):k[L].push(N);return P=l.length,e(f={},"K",d),e(f,"D",z),e(f,"W",P),e(f,"alpha",g),e(f,"beta",c),e(f,"init",v),e(f,"fit",y),e(f,"getPhis",b),e(f,"getThetas",j),e(f,"getTerms",I),f.nwSum=new n(d),f.ndSum=new n(z),f.nw=u([P,d],"int32"),f.nd=u([z,d],"int32"),f.phiList=[],f.thetaList=[],f.w=k,f.init(),f;function I(i,e){var h,n,a,m,p,f;if(!t(i)||i>=d)throw new TypeError(o("invalid argument. First argument must be a nonnegative integer which is less than the total number of topics. Value: `%s`.",i));if(e){if(!s(e))throw new TypeError(o("0NA4I",e))}else e=10;for(a=[],h=[],f=0;f<e;f++){for(m=0,W=0;W<this.W;W++)(n=this.avgPhi.get(i,W))>m&&!r(h,W)&&(m=n,p=W);h.push(p),a.push({word:l[p],prob:m})}return a}}export{T as default};
//# sourceMappingURL=index.mjs.map
