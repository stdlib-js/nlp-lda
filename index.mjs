// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nonnegative-integer@v0.2.2-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@v0.2.2-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-string-array@v0.2.2-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@v0.2.2-esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-contains@v0.2.2-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/nlp-tokenize@v0.2.2-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/array-int32@v0.2.2-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.2-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@v0.2.2-esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@v0.2.1-esm/index.mjs";import{isPrimitive as p}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-number@v0.2.2-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.2.2-esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.2.2-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@v0.2.1-esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-floor@v0.2.3-esm/index.mjs";function u(){var t,s,i,e,h,r,o;for(1===arguments.length?i=arguments[0]:2===arguments.length&&(i=arguments[0],t=arguments[1]),s=i.length,h=1,o=0;o<s;o++)h*=i[o];return e="int32"===t?new n(h):new a(h),(r={}).dtype=t,r.shape=i,r.strides=[i[1],1],r.offset=0,r.ndims=i.length,r.length=e.length,r.nbytes=e.byteLength,r.data=e,d(r,"get",(function(t,s){var i=this.offset+t*this.strides[0]+s*this.strides[1];return this.data[i]})),d(r,"set",(function(t,s,i){t=this.offset+t*this.strides[0]+s*this.strides[1],t>=0&&(this.data[t]=i);return this})),r}function v(){var t,s,i,e;for(t=u([this.D,this.K]),i=0;i<this.D;i++)for(e=0;e<this.K;e++)s=(this.nd.get(i,e)+this.alpha)/(this.ndSum[i]+this.K*this.alpha),t.set(i,e,s);return t}function j(){var t,s,i,e;for(t=u([this.K,this.W]),i=0;i<this.K;i++)for(e=0;e<this.W;e++)s=(this.nw.get(e,i)+this.beta)/(this.nwSum[i]+this.W*this.beta),t.set(i,e,s);return t}function w(){var t,s,i,e,h,r;for(this.z=[],h=0;h<this.D;h++){for(this.z.push([]),i=this.w[h].length,r=0;r<i;r++)s=g(l()*this.K),this.z[h].push(s);for(this.ndSum[h]=i,r=0;r<i;r++)e=this.w[h][r],t=this.z[h][r],this.nw.set(e,t,this.nw.get(e,t)+1),this.nd.set(h,t,this.nd.get(h,t)+1),this.nwSum[t]=this.nwSum[t]+1}}function b(t,s,i){var e,h,r,n,o,a,d,p;for(a=u([r=t.shape[0],n=t.shape[1]]),e=(i-1)/i,h=1/i,d=0;d<r;d++)for(p=0;p<n;p++)o=e*t.get(d,p)+h*s.get(d,p),a.set(d,p,o);return a}function c(t,i,e){var h,r,n,a,d,p,m,f,g,u,v,j,w,c;if(!s(t))throw new TypeError(o("0kV4b",t));if(!s(i))throw new TypeError(o("0kV45",i));if(!s(e))throw new TypeError(o("0kV5x",e));for(r=this.W*this.beta,h=this.K*this.alpha,v=0;v<t;v++){for(u=0;u<this.D;u++)for(c=0;c<this.ndSum[u];c++){for(p=this.w[u][c],n=this.z[u][c],this.nw.set(p,n,this.nw.get(p,n)-1),this.nd.set(u,n,this.nd.get(u,n)-1),this.ndSum[u]-=1,this.nwSum[n]-=1,d=[],j=0;j<this.K;j++)d.push((this.nw.get(p,j)+this.beta)/(this.nwSum[j]+r)*(this.nd.get(u,j)+this.alpha)/(this.ndSum[u]+h));for(j=1;j<this.K;j++)d[j]+=d[j-1];for(w=d[this.K-1]*l(),n=0,g=0;g<this.K;g++)if(d[g]>w){n=g;break}this.nw.set(p,n,this.nw.get(p,n)+1),this.nd.set(u,n,this.nd.get(u,n)+1),this.nwSum[n]+=1,this.ndSum[u]+=1,this.z[u][c]=n}v%e==0&&v>i&&(m=this.getPhis(),a=this.getThetas(),this.phiList.push(m),this.thetaList.push(a),f=this.phiList.length,this.avgPhi=1===f?m:b(this.avgPhi,m,f),f=this.thetaList.length,this.avgTheta=1===f?a:b(this.avgTheta,a,f))}}function y(t,s){var i;for(i=0;i<t.length;i++)if(t[i]===s)return i;return-1}function x(a,d,l){var g,b,x,T,S,k,K,V,E,z,D,L,W,P,q,A,B;if(!i(a))throw new TypeError(o("0kV3s",a));if(!s(d))throw new TypeError(o("0kV5y",d));if(k={},arguments.length>2&&(K=function(t,s){return m(s)?f(s,"alpha")&&(t.alpha=s.alpha,!p(t.alpha))?new TypeError(o("0kV4D","alpha",t.alpha)):f(s,"beta")&&(t.beta=s.beta,!p(t.beta))?new TypeError(o("0kV4D","beta",t.beta)):null:new TypeError(o("0kV2V",s))}(k,l),K))throw K;for(L=a.length,T=k.alpha||50/d,S=k.beta||.1,b=[],B=[],V=0,W=0;W<L;W++)for(B.push([]),E=(D=r(a[W])).length,P=0;P<E;P++)g=D[P],-1===(z=y(b,g))?(b.push(g),B[W].push(V),V+=1):B[W].push(z);return A=b.length,e(x={},"K",d),e(x,"D",L),e(x,"W",A),e(x,"alpha",T),e(x,"beta",S),e(x,"init",w),e(x,"fit",c),e(x,"getPhis",j),e(x,"getThetas",v),e(x,"getTerms",(function(i,e){var r,n,a,p,m,f;if(!t(i)||i>=d)throw new TypeError(o("0kV5z",i));if(e){if(!s(e))throw new TypeError(o("0kV45",e))}else e=10;for(a=[],r=[],f=0;f<e;f++){for(p=0,q=0;q<this.W;q++)(n=this.avgPhi.get(i,q))>p&&!h(r,q)&&(p=n,m=q);r.push(m),a.push({word:b[m],prob:p})}return a})),x.nwSum=new n(d),x.ndSum=new n(L),x.nw=u([A,d],"int32"),x.nd=u([L,d],"int32"),x.phiList=[],x.thetaList=[],x.w=B,x.init(),x}export{x as default};
//# sourceMappingURL=index.mjs.map
