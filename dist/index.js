"use strict";var b=function(t,i){return function(){return i||t((i={exports:{}}).exports,i),i.exports}};var T=b(function(Ir,F){
var ar=require('@stdlib/array-int32/dist'),sr=require('@stdlib/array-float64/dist'),K=require('@stdlib/utils-define-nonenumerable-read-only-property/dist');function nr(){var t,i,e,a,s,r,g;for(arguments.length===1?e=arguments[0]:arguments.length===2&&(e=arguments[0],t=arguments[1]),i=e.length,s=1,g=0;g<i;g++)s*=e[g];return t==="int32"?a=new ar(s):a=new sr(s),r={},r.dtype=t,r.shape=e,r.strides=[e[1],1],r.offset=0,r.ndims=e.length,r.length=a.length,r.nbytes=a.byteLength,r.data=a,K(r,"get",f),K(r,"set",u),r;function f(n,h){var p=this.offset+n*this.strides[0]+h*this.strides[1];return this.data[p]}function u(n,h,p){return n=this.offset+n*this.strides[0]+h*this.strides[1],n>=0&&(this.data[n]=p),this}}F.exports=nr
});var A=b(function(jr,k){
var hr=T();function vr(){var t,i,e,a;for(t=hr([this.D,this.K]),e=0;e<this.D;e++)for(a=0;a<this.K;a++)i=(this.nd.get(e,a)+this.alpha)/(this.ndSum[e]+this.K*this.alpha),t.set(e,a,i);return t}k.exports=vr
});var B=b(function(Kr,R){
var N=require('@stdlib/assert-is-positive-number/dist').isPrimitive,ur=require('@stdlib/assert-is-plain-object/dist'),M=require('@stdlib/assert-has-own-property/dist'),D=require('@stdlib/error-tools-fmtprodmsg/dist');function or(t,i){return ur(i)?M(i,"alpha")&&(t.alpha=i.alpha,!N(t.alpha))?new TypeError(D('0kV4D',"alpha",t.alpha)):M(i,"beta")&&(t.beta=i.beta,!N(t.beta))?new TypeError(D('0kV4D',"beta",t.beta)):null:new TypeError(D('0kV2V',i));}R.exports=or
});var G=b(function(Fr,C){
var gr=T();function fr(){var t,i,e,a;for(t=gr([this.K,this.W]),e=0;e<this.K;e++)for(a=0;a<this.W;a++)i=(this.nw.get(a,e)+this.beta)/(this.nwSum[e]+this.W*this.beta),t.set(e,a,i);return t}C.exports=fr
});var J=b(function(kr,H){
var pr=require('@stdlib/random-base-randu/dist'),lr=require('@stdlib/math-base-special-floor/dist');function mr(){var t,i,e,a,s,r;for(this.z=[],s=0;s<this.D;s++){for(this.z.push([]),e=this.w[s].length,r=0;r<e;r++)i=lr(pr()*this.K),this.z[s].push(i);for(this.ndSum[s]=e,r=0;r<e;r++)a=this.w[s][r],t=this.z[s][r],this.nw.set(a,t,this.nw.get(a,t)+1),this.nd.set(s,t,this.nd.get(s,t)+1),this.nwSum[t]=this.nwSum[t]+1}}H.exports=mr
});var U=b(function(Ar,Q){
var dr=T();function wr(t,i,e){var a,s,r,g,f,u,n,h;for(r=t.shape[0],g=t.shape[1],u=dr([r,g]),a=(e-1)/e,s=1/e,n=0;n<r;n++)for(h=0;h<g;h++)f=a*t.get(n,h)+s*i.get(n,h),u.set(n,h,f);return u}Q.exports=wr
});var Z=b(function(Nr,Y){
var I=require('@stdlib/assert-is-positive-integer/dist'),j=require('@stdlib/error-tools-fmtprodmsg/dist'),br=require('@stdlib/random-base-randu/dist'),X=U();function qr(t,i,e){var a,s,r,g,f,u,n,h,p,v,d,o,w,l;if(!I(t))throw new TypeError(j('0kV4b',t));if(!I(i))throw new TypeError(j('0kV45',i));if(!I(e))throw new TypeError(j('0kV5x',e));for(s=this.W*this.beta,a=this.K*this.alpha,d=0;d<t;d++){for(v=0;v<this.D;v++)for(l=0;l<this.ndSum[v];l++){for(u=this.w[v][l],r=this.z[v][l],this.nw.set(u,r,this.nw.get(u,r)-1),this.nd.set(v,r,this.nd.get(v,r)-1),this.ndSum[v]-=1,this.nwSum[r]-=1,f=[],o=0;o<this.K;o++)f.push((this.nw.get(u,o)+this.beta)/(this.nwSum[o]+s)*(this.nd.get(v,o)+this.alpha)/(this.ndSum[v]+a));for(o=1;o<this.K;o++)f[o]+=f[o-1];for(w=f[this.K-1]*br(),r=0,p=0;p<this.K;p++)if(f[p]>w){r=p;break}this.nw.set(u,r,this.nw.get(u,r)+1),this.nd.set(v,r,this.nd.get(v,r)+1),this.nwSum[r]+=1,this.ndSum[v]+=1,this.z[v][l]=r}d%e===0&&d>i&&(n=this.getPhis(),g=this.getThetas(),this.phiList.push(n),this.thetaList.push(g),h=this.phiList.length,h===1?this.avgPhi=n:this.avgPhi=X(this.avgPhi,n,h),h=this.thetaList.length,h===1?this.avgTheta=g:this.avgTheta=X(this.avgTheta,g,h))}}Y.exports=qr
});var er=b(function(Mr,tr){
var cr=require('@stdlib/assert-is-nonnegative-integer/dist'),_=require('@stdlib/assert-is-positive-integer/dist'),yr=require('@stdlib/assert-is-string-array/dist'),m=require('@stdlib/utils-define-read-only-property/dist'),Tr=require('@stdlib/assert-contains/dist'),xr=require('@stdlib/nlp-tokenize/dist'),$=require('@stdlib/array-int32/dist'),P=require('@stdlib/error-tools-fmtprodmsg/dist'),rr=T(),Sr=A(),Pr=B(),Er=G(),zr=J(),Vr=Z();function Lr(t,i){var e;for(e=0;e<t.length;e++)if(t[e]===i)return e;return-1}function Or(t,i,e){var a,s,r,g,f,u,n,h,p,v,d,o,w,l,q,E,c;if(!yr(t))throw new TypeError(P('0kV3s',t));if(!_(i))throw new TypeError(P('0kV5y',i));if(u={},arguments.length>2&&(n=Pr(u,e),n))throw n;for(o=t.length,g=u.alpha||50/i,f=u.beta||.1,s=[],c=[],h=0,w=0;w<o;w++)for(c.push([]),d=xr(t[w]),p=d.length,l=0;l<p;l++)a=d[l],v=Lr(s,a),v===-1?(s.push(a),c[w].push(h),h+=1):c[w].push(v);return E=s.length,r={},m(r,"K",i),m(r,"D",o),m(r,"W",E),m(r,"alpha",g),m(r,"beta",f),m(r,"init",zr),m(r,"fit",Vr),m(r,"getPhis",Er),m(r,"getThetas",Sr),m(r,"getTerms",ir),r.nwSum=new $(i),r.ndSum=new $(o),r.nw=rr([E,i],"int32"),r.nd=rr([o,i],"int32"),r.phiList=[],r.thetaList=[],r.w=c,r.init(),r;function ir(x,y){var z,V,L,S,O,W;if(!cr(x)||x>=i)throw new TypeError(P('0kV5z',x));if(y){if(!_(y))throw new TypeError(P('0kV45',y))}else y=10;for(L=[],z=[],W=0;W<y;W++){for(S=0,q=0;q<this.W;q++)V=this.avgPhi.get(x,q),V>S&&!Tr(z,q)&&(S=V,O=q);z.push(O),L.push({word:s[O],prob:S})}return L}}tr.exports=Or
});var Wr=er();module.exports=Wr;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
