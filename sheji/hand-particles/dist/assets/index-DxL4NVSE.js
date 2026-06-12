var Zm=Object.defineProperty;var $m=(e,t,n)=>t in e?Zm(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ne=(e,t,n)=>$m(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();class Jm extends EventTarget{emit(t,n){this.dispatchEvent(new CustomEvent(t,{detail:n}))}on(t,n){this.addEventListener(t,(i=>n(i.detail)))}off(t,n){this.removeEventListener(t,(i=>n(i.detail)))}}const Qe=new Jm;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ul="170",Kr={ROTATE:0,DOLLY:1,PAN:2},qr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qm=0,Zh=1,t0=2,uf=1,e0=2,gi=3,qi=0,tn=1,vi=2,Vi=0,Zr=1,wc=2,$h=3,Jh=4,n0=5,ar=100,i0=101,r0=102,s0=103,o0=104,a0=200,c0=201,l0=202,h0=203,Rc=204,Cc=205,u0=206,d0=207,f0=208,p0=209,m0=210,_0=211,g0=212,v0=213,x0=214,Pc=0,Lc=1,Dc=2,es=3,Ic=4,Uc=5,Nc=6,Fc=7,df=0,M0=1,y0=2,Wi=0,S0=1,E0=2,T0=3,b0=4,A0=5,w0=6,R0=7,ff=300,ns=301,is=302,Oc=303,Bc=304,da=306,kc=1e3,hr=1001,zc=1002,Vn=1003,C0=1004,mo=1005,Qn=1006,Ha=1007,ur=1008,Ei=1009,pf=1010,mf=1011,Ys=1012,Nl=1013,xr=1014,Mi=1015,Qs=1016,Fl=1017,Ol=1018,rs=1020,_f=35902,gf=1021,vf=1022,Gn=1023,xf=1024,Mf=1025,$r=1026,ss=1027,yf=1028,Bl=1029,Sf=1030,kl=1031,zl=1033,jo=33776,Ko=33777,Zo=33778,$o=33779,Hc=35840,Gc=35841,Vc=35842,Wc=35843,Xc=36196,qc=37492,Yc=37496,jc=37808,Kc=37809,Zc=37810,$c=37811,Jc=37812,Qc=37813,tl=37814,el=37815,nl=37816,il=37817,rl=37818,sl=37819,ol=37820,al=37821,Jo=36492,cl=36494,ll=36495,Ef=36283,hl=36284,ul=36285,dl=36286,P0=3200,L0=3201,D0=0,I0=1,Hi="",Ln="srgb",vs="srgb-linear",fa="linear",ie="srgb",Pr=7680,Qh=519,U0=512,N0=513,F0=514,Tf=515,O0=516,B0=517,k0=518,z0=519,tu=35044,eu="300 es",yi=2e3,ia=2001;class br{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qo=Math.PI/180,fl=180/Math.PI;function to(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xe[e&255]+Xe[e>>8&255]+Xe[e>>16&255]+Xe[e>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[n&63|128]+Xe[n>>8&255]+"-"+Xe[n>>16&255]+Xe[n>>24&255]+Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]).toLowerCase()}function Je(e,t,n){return Math.max(t,Math.min(n,e))}function H0(e,t){return(e%t+t)%t}function Ga(e,t,n){return(1-n)*e+n*t}function Us(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function rn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const G0={DEG2RAD:Qo};class Bt{constructor(t=0,n=0){Bt.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,n,i,r,s,o,a,c,l){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l)}set(t,n,i,r,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=n,h[4]=s,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],m=i[5],_=i[8],v=r[0],p=r[3],f=r[6],b=r[1],T=r[4],y=r[7],B=r[2],C=r[5],A=r[8];return s[0]=o*v+a*b+c*B,s[3]=o*p+a*T+c*C,s[6]=o*f+a*y+c*A,s[1]=l*v+h*b+u*B,s[4]=l*p+h*T+u*C,s[7]=l*f+h*y+u*A,s[2]=d*v+m*b+_*B,s[5]=d*p+m*T+_*C,s[8]=d*f+m*y+_*A,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return n*o*h-n*a*l-i*s*h+i*a*c+r*s*l-r*o*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*s,m=l*s-o*c,_=n*u+i*d+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return t[0]=u*v,t[1]=(r*l-h*i)*v,t[2]=(a*i-r*o)*v,t[3]=d*v,t[4]=(h*n-r*c)*v,t[5]=(r*s-a*n)*v,t[6]=m*v,t[7]=(i*c-l*n)*v,t[8]=(o*n-i*s)*v,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+n,0,0,1),this}scale(t,n){return this.premultiply(Va.makeScale(t,n)),this}rotate(t){return this.premultiply(Va.makeRotation(-t)),this}translate(t,n){return this.premultiply(Va.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Va=new Nt;function bf(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function ra(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function V0(){const e=ra("canvas");return e.style.display="block",e}const nu={};function zs(e){e in nu||(nu[e]=!0,console.warn(e))}function W0(e,t,n){return new Promise(function(i,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function X0(e){const t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function q0(e){const t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Yt={enabled:!0,workingColorSpace:vs,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===ie&&(e.r=Si(e.r),e.g=Si(e.g),e.b=Si(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===ie&&(e.r=Jr(e.r),e.g=Jr(e.g),e.b=Jr(e.b))),e},fromWorkingColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===Hi?fa:this.spaces[e].transfer},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}};function Si(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Jr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}const iu=[.64,.33,.3,.6,.15,.06],ru=[.2126,.7152,.0722],su=[.3127,.329],ou=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),au=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Yt.define({[vs]:{primaries:iu,whitePoint:su,transfer:fa,toXYZ:ou,fromXYZ:au,luminanceCoefficients:ru,workingColorSpaceConfig:{unpackColorSpace:Ln},outputColorSpaceConfig:{drawingBufferColorSpace:Ln}},[Ln]:{primaries:iu,whitePoint:su,transfer:ie,toXYZ:ou,fromXYZ:au,luminanceCoefficients:ru,outputColorSpaceConfig:{drawingBufferColorSpace:Ln}}});let Lr;class Y0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Lr===void 0&&(Lr=ra("canvas")),Lr.width=t.width,Lr.height=t.height;const i=Lr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Lr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=ra("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Si(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Si(n[i]/255)*255):n[i]=Si(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let j0=0;class Af{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:j0++}),this.uuid=to(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Wa(r[o].image)):s.push(Wa(r[o]))}else s=Wa(r);i.url=s}return n||(t.images[this.uuid]=i),i}}function Wa(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Y0.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let K0=0;class en extends br{constructor(t=en.DEFAULT_IMAGE,n=en.DEFAULT_MAPPING,i=hr,r=hr,s=Qn,o=ur,a=Gn,c=Ei,l=en.DEFAULT_ANISOTROPY,h=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=to(),this.name="",this.source=new Af(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Bt(0,0),this.repeat=new Bt(1,1),this.center=new Bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ff)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case kc:t.x=t.x-Math.floor(t.x);break;case hr:t.x=t.x<0?0:1;break;case zc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case kc:t.y=t.y-Math.floor(t.y);break;case hr:t.y=t.y<0?0:1;break;case zc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=ff;en.DEFAULT_ANISOTROPY=1;class we{constructor(t=0,n=0,i=0,r=1){we.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],_=c[9],v=c[2],p=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const T=(l+1)/2,y=(m+1)/2,B=(f+1)/2,C=(h+d)/4,A=(u+v)/4,I=(_+p)/4;return T>y&&T>B?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=C/i,s=A/i):y>B?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=C/r,s=I/r):B<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(B),i=A/s,r=I/s),this.set(i,r,s,n),this}let b=Math.sqrt((p-_)*(p-_)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(p-_)/b,this.y=(u-v)/b,this.z=(d-h)/b,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Z0 extends br{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new we(0,0,t,n),this.scissorTest=!1,this.viewport=new we(0,0,t,n);const r={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new en(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new Af(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mr extends Z0{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class wf extends en{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=hr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $0 extends en{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=hr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yr{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,s,o,a){let c=i[r+0],l=i[r+1],h=i[r+2],u=i[r+3];const d=s[o+0],m=s[o+1],_=s[o+2],v=s[o+3];if(a===0){t[n+0]=c,t[n+1]=l,t[n+2]=h,t[n+3]=u;return}if(a===1){t[n+0]=d,t[n+1]=m,t[n+2]=_,t[n+3]=v;return}if(u!==v||c!==d||l!==m||h!==_){let p=1-a;const f=c*d+l*m+h*_+u*v,b=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const B=Math.sqrt(T),C=Math.atan2(B,f*b);p=Math.sin(p*C)/B,a=Math.sin(a*C)/B}const y=a*b;if(c=c*p+d*y,l=l*p+m*y,h=h*p+_*y,u=u*p+v*y,p===1-a){const B=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=B,l*=B,h*=B,u*=B}}t[n]=c,t[n+1]=l,t[n+2]=h,t[n+3]=u}static multiplyQuaternionsFlat(t,n,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],h=i[r+3],u=s[o],d=s[o+1],m=s[o+2],_=s[o+3];return t[n]=a*_+h*u+c*m-l*d,t[n+1]=c*_+h*d+l*u-a*m,t[n+2]=l*_+h*m+a*d-c*u,t[n+3]=h*_-a*u-c*d-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(r/2),u=a(s/2),d=c(i/2),m=c(r/2),_=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*m*_,this._y=l*m*u-d*h*_,this._z=l*h*_+d*m*u,this._w=l*h*u-d*m*_;break;case"YXZ":this._x=d*h*u+l*m*_,this._y=l*m*u-d*h*_,this._z=l*h*_-d*m*u,this._w=l*h*u+d*m*_;break;case"ZXY":this._x=d*h*u-l*m*_,this._y=l*m*u+d*h*_,this._z=l*h*_+d*m*u,this._w=l*h*u-d*m*_;break;case"ZYX":this._x=d*h*u-l*m*_,this._y=l*m*u+d*h*_,this._z=l*h*_-d*m*u,this._w=l*h*u+d*m*_;break;case"YZX":this._x=d*h*u+l*m*_,this._y=l*m*u+d*h*_,this._z=l*h*_-d*m*u,this._w=l*h*u-d*m*_;break;case"XZY":this._x=d*h*u-l*m*_,this._y=l*m*u-d*h*_,this._z=l*h*_+d*m*u,this._w=l*h*u+d*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],c=n[9],l=n[2],h=n[6],u=n[10],d=i+a+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(o-r)*m}else if(i>a&&i>u){const m=2*Math.sqrt(1+i-a-u);this._w=(h-c)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+l)/m}else if(a>u){const m=2*Math.sqrt(1+a-i-u);this._w=(s-l)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-i-a);this._w=(o-r)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Je(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,o=t._w,a=n._x,c=n._y,l=n._z,h=n._w;return this._x=i*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-i*l,this._z=s*h+o*l+i*c-r*a,this._w=o*h-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-n;return this._w=m*o+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-n)*h)/l,d=Math.sin(n*h)/l;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,n=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(cu.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(cu.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*i),h=2*(a*n-s*r),u=2*(s*i-o*n);return this.x=n+c*l+o*u-a*h,this.y=i+c*h+a*l-s*u,this.z=r+c*u+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,o=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xa.copy(this).projectOnVector(t),this.sub(Xa)}reflect(t){return this.sub(Xa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new U,cu=new yr;class eo{constructor(t=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Bn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Bn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=Bn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Bn):Bn.fromBufferAttribute(s,o),Bn.applyMatrix4(t.matrixWorld),this.expandByPoint(Bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_o.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_o.copy(i.boundingBox)),_o.applyMatrix4(t.matrixWorld),this.union(_o)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Bn),Bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ns),go.subVectors(this.max,Ns),Dr.subVectors(t.a,Ns),Ir.subVectors(t.b,Ns),Ur.subVectors(t.c,Ns),Li.subVectors(Ir,Dr),Di.subVectors(Ur,Ir),Ji.subVectors(Dr,Ur);let n=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-Ji.z,Ji.y,Li.z,0,-Li.x,Di.z,0,-Di.x,Ji.z,0,-Ji.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-Ji.y,Ji.x,0];return!qa(n,Dr,Ir,Ur,go)||(n=[1,0,0,0,1,0,0,0,1],!qa(n,Dr,Ir,Ur,go))?!1:(vo.crossVectors(Li,Di),n=[vo.x,vo.y,vo.z],qa(n,Dr,Ir,Ur,go))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const di=[new U,new U,new U,new U,new U,new U,new U,new U],Bn=new U,_o=new eo,Dr=new U,Ir=new U,Ur=new U,Li=new U,Di=new U,Ji=new U,Ns=new U,go=new U,vo=new U,Qi=new U;function qa(e,t,n,i,r){for(let s=0,o=e.length-3;s<=o;s+=3){Qi.fromArray(e,s);const a=r.x*Math.abs(Qi.x)+r.y*Math.abs(Qi.y)+r.z*Math.abs(Qi.z),c=t.dot(Qi),l=n.dot(Qi),h=i.dot(Qi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const J0=new eo,Fs=new U,Ya=new U;class pa{constructor(t=new U,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):J0.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);const n=Fs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Fs,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ya.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(Ya)),this.expandByPoint(Fs.copy(t.center).sub(Ya))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fi=new U,ja=new U,xo=new U,Ii=new U,Ka=new U,Mo=new U,Za=new U;class Hl{constructor(t=new U,n=new U(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=fi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(fi.copy(this.origin).addScaledVector(this.direction,n),fi.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){ja.copy(t).add(n).multiplyScalar(.5),xo.copy(n).sub(t).normalize(),Ii.copy(this.origin).sub(ja);const s=t.distanceTo(n)*.5,o=-this.direction.dot(xo),a=Ii.dot(this.direction),c=-Ii.dot(xo),l=Ii.lengthSq(),h=Math.abs(1-o*o);let u,d,m,_;if(h>0)if(u=o*c-a,d=o*a-c,_=s*h,u>=0)if(d>=-_)if(d<=_){const v=1/h;u*=v,d*=v,m=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*c)+l;else d<=-_?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=_?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ja).addScaledVector(xo,d),m}intersectSphere(t,n){fi.subVectors(t.center,this.origin);const i=fi.dot(this.direction),r=fi.dot(fi)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,fi)!==null}intersectTriangle(t,n,i,r,s){Ka.subVectors(n,t),Mo.subVectors(i,t),Za.crossVectors(Ka,Mo);let o=this.direction.dot(Za),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ii.subVectors(this.origin,t);const c=a*this.direction.dot(Mo.crossVectors(Ii,Mo));if(c<0)return null;const l=a*this.direction.dot(Ka.cross(Ii));if(l<0||c+l>o)return null;const h=-a*Ii.dot(Za);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Re{constructor(t,n,i,r,s,o,a,c,l,h,u,d,m,_,v,p){Re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l,h,u,d,m,_,v,p)}set(t,n,i,r,s,o,a,c,l,h,u,d,m,_,v,p){const f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=m,f[7]=_,f[11]=v,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Re().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,r=1/Nr.setFromMatrixColumn(t,0).length(),s=1/Nr.setFromMatrixColumn(t,1).length(),o=1/Nr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,m=o*u,_=a*h,v=a*u;n[0]=c*h,n[4]=-c*u,n[8]=l,n[1]=m+_*l,n[5]=d-v*l,n[9]=-a*c,n[2]=v-d*l,n[6]=_+m*l,n[10]=o*c}else if(t.order==="YXZ"){const d=c*h,m=c*u,_=l*h,v=l*u;n[0]=d+v*a,n[4]=_*a-m,n[8]=o*l,n[1]=o*u,n[5]=o*h,n[9]=-a,n[2]=m*a-_,n[6]=v+d*a,n[10]=o*c}else if(t.order==="ZXY"){const d=c*h,m=c*u,_=l*h,v=l*u;n[0]=d-v*a,n[4]=-o*u,n[8]=_+m*a,n[1]=m+_*a,n[5]=o*h,n[9]=v-d*a,n[2]=-o*l,n[6]=a,n[10]=o*c}else if(t.order==="ZYX"){const d=o*h,m=o*u,_=a*h,v=a*u;n[0]=c*h,n[4]=_*l-m,n[8]=d*l+v,n[1]=c*u,n[5]=v*l+d,n[9]=m*l-_,n[2]=-l,n[6]=a*c,n[10]=o*c}else if(t.order==="YZX"){const d=o*c,m=o*l,_=a*c,v=a*l;n[0]=c*h,n[4]=v-d*u,n[8]=_*u+m,n[1]=u,n[5]=o*h,n[9]=-a*h,n[2]=-l*h,n[6]=m*u+_,n[10]=d-v*u}else if(t.order==="XZY"){const d=o*c,m=o*l,_=a*c,v=a*l;n[0]=c*h,n[4]=-u,n[8]=l*h,n[1]=d*u+v,n[5]=o*h,n[9]=m*u-_,n[2]=_*u-m,n[6]=a*h,n[10]=v*u+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Q0,t,t_)}lookAt(t,n,i){const r=this.elements;return un.subVectors(t,n),un.lengthSq()===0&&(un.z=1),un.normalize(),Ui.crossVectors(i,un),Ui.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Ui.crossVectors(i,un)),Ui.normalize(),yo.crossVectors(un,Ui),r[0]=Ui.x,r[4]=yo.x,r[8]=un.x,r[1]=Ui.y,r[5]=yo.y,r[9]=un.y,r[2]=Ui.z,r[6]=yo.z,r[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],m=i[13],_=i[2],v=i[6],p=i[10],f=i[14],b=i[3],T=i[7],y=i[11],B=i[15],C=r[0],A=r[4],I=r[8],S=r[12],M=r[1],w=r[5],V=r[9],k=r[13],j=r[2],K=r[6],X=r[10],$=r[14],H=r[3],it=r[7],lt=r[11],Tt=r[15];return s[0]=o*C+a*M+c*j+l*H,s[4]=o*A+a*w+c*K+l*it,s[8]=o*I+a*V+c*X+l*lt,s[12]=o*S+a*k+c*$+l*Tt,s[1]=h*C+u*M+d*j+m*H,s[5]=h*A+u*w+d*K+m*it,s[9]=h*I+u*V+d*X+m*lt,s[13]=h*S+u*k+d*$+m*Tt,s[2]=_*C+v*M+p*j+f*H,s[6]=_*A+v*w+p*K+f*it,s[10]=_*I+v*V+p*X+f*lt,s[14]=_*S+v*k+p*$+f*Tt,s[3]=b*C+T*M+y*j+B*H,s[7]=b*A+T*w+y*K+B*it,s[11]=b*I+T*V+y*X+B*lt,s[15]=b*S+T*k+y*$+B*Tt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],m=t[14],_=t[3],v=t[7],p=t[11],f=t[15];return _*(+s*c*u-r*l*u-s*a*d+i*l*d+r*a*m-i*c*m)+v*(+n*c*m-n*l*d+s*o*d-r*o*m+r*l*h-s*c*h)+p*(+n*l*u-n*a*m-s*o*u+i*o*m+s*a*h-i*l*h)+f*(-r*a*h-n*c*u+n*a*d+r*o*u-i*o*d+i*c*h)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],m=t[11],_=t[12],v=t[13],p=t[14],f=t[15],b=u*p*l-v*d*l+v*c*m-a*p*m-u*c*f+a*d*f,T=_*d*l-h*p*l-_*c*m+o*p*m+h*c*f-o*d*f,y=h*v*l-_*u*l+_*a*m-o*v*m-h*a*f+o*u*f,B=_*u*c-h*v*c-_*a*d+o*v*d+h*a*p-o*u*p,C=n*b+i*T+r*y+s*B;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=b*A,t[1]=(v*d*s-u*p*s-v*r*m+i*p*m+u*r*f-i*d*f)*A,t[2]=(a*p*s-v*c*s+v*r*l-i*p*l-a*r*f+i*c*f)*A,t[3]=(u*c*s-a*d*s-u*r*l+i*d*l+a*r*m-i*c*m)*A,t[4]=T*A,t[5]=(h*p*s-_*d*s+_*r*m-n*p*m-h*r*f+n*d*f)*A,t[6]=(_*c*s-o*p*s-_*r*l+n*p*l+o*r*f-n*c*f)*A,t[7]=(o*d*s-h*c*s+h*r*l-n*d*l-o*r*m+n*c*m)*A,t[8]=y*A,t[9]=(_*u*s-h*v*s-_*i*m+n*v*m+h*i*f-n*u*f)*A,t[10]=(o*v*s-_*a*s+_*i*l-n*v*l-o*i*f+n*a*f)*A,t[11]=(h*a*s-o*u*s-h*i*l+n*u*l+o*i*m-n*a*m)*A,t[12]=B*A,t[13]=(h*v*r-_*u*r+_*i*d-n*v*d-h*i*p+n*u*p)*A,t[14]=(_*a*r-o*v*r-_*i*c+n*v*c+o*i*p-n*a*p)*A,t[15]=(o*u*r-h*a*r+h*i*c-n*u*c-o*i*d+n*a*d)*A,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+i,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,c=n._w,l=s+s,h=o+o,u=a+a,d=s*l,m=s*h,_=s*u,v=o*h,p=o*u,f=a*u,b=c*l,T=c*h,y=c*u,B=i.x,C=i.y,A=i.z;return r[0]=(1-(v+f))*B,r[1]=(m+y)*B,r[2]=(_-T)*B,r[3]=0,r[4]=(m-y)*C,r[5]=(1-(d+f))*C,r[6]=(p+b)*C,r[7]=0,r[8]=(_+T)*A,r[9]=(p-b)*A,r[10]=(1-(d+v))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;let s=Nr.set(r[0],r[1],r[2]).length();const o=Nr.set(r[4],r[5],r[6]).length(),a=Nr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],kn.copy(this);const l=1/s,h=1/o,u=1/a;return kn.elements[0]*=l,kn.elements[1]*=l,kn.elements[2]*=l,kn.elements[4]*=h,kn.elements[5]*=h,kn.elements[6]*=h,kn.elements[8]*=u,kn.elements[9]*=u,kn.elements[10]*=u,n.setFromRotationMatrix(kn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,n,i,r,s,o,a=yi){const c=this.elements,l=2*s/(n-t),h=2*s/(i-r),u=(n+t)/(n-t),d=(i+r)/(i-r);let m,_;if(a===yi)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===ia)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,r,s,o,a=yi){const c=this.elements,l=1/(n-t),h=1/(i-r),u=1/(o-s),d=(n+t)*l,m=(i+r)*h;let _,v;if(a===yi)_=(o+s)*u,v=-2*u;else if(a===ia)_=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=v,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const Nr=new U,kn=new Re,Q0=new U(0,0,0),t_=new U(1,1,1),Ui=new U,yo=new U,un=new U,lu=new Re,hu=new yr;class Ti{constructor(t=0,n=0,i=0,r=Ti.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],u=r[2],d=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return lu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(lu,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return hu.setFromEuler(this),this.setFromQuaternion(hu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ti.DEFAULT_ORDER="XYZ";class Rf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let e_=0;const uu=new U,Fr=new yr,pi=new Re,So=new U,Os=new U,n_=new U,i_=new yr,du=new U(1,0,0),fu=new U(0,1,0),pu=new U(0,0,1),mu={type:"added"},r_={type:"removed"},Or={type:"childadded",child:null},$a={type:"childremoved",child:null};class cn extends br{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=to(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const t=new U,n=new Ti,i=new yr,r=new U(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Re},normalMatrix:{value:new Nt}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Fr.setFromAxisAngle(t,n),this.quaternion.multiply(Fr),this}rotateOnWorldAxis(t,n){return Fr.setFromAxisAngle(t,n),this.quaternion.premultiply(Fr),this}rotateX(t){return this.rotateOnAxis(du,t)}rotateY(t){return this.rotateOnAxis(fu,t)}rotateZ(t){return this.rotateOnAxis(pu,t)}translateOnAxis(t,n){return uu.copy(t).applyQuaternion(this.quaternion),this.position.add(uu.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(du,t)}translateY(t){return this.translateOnAxis(fu,t)}translateZ(t){return this.translateOnAxis(pu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?So.copy(t):So.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Os,So,this.up):pi.lookAt(So,Os,this.up),this.quaternion.setFromRotationMatrix(pi),r&&(pi.extractRotation(r.matrixWorld),Fr.setFromRotationMatrix(pi),this.quaternion.premultiply(Fr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mu),Or.child=t,this.dispatchEvent(Or),Or.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(r_),$a.child=t,this.dispatchEvent($a),$a.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mu),Or.child=t,this.dispatchEvent(Or),Or.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,n_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,i_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(n){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),m=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}cn.DEFAULT_UP=new U(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zn=new U,mi=new U,Ja=new U,_i=new U,Br=new U,kr=new U,_u=new U,Qa=new U,tc=new U,ec=new U,nc=new we,ic=new we,rc=new we;class Hn{constructor(t=new U,n=new U,i=new U){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),zn.subVectors(t,n),r.cross(zn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){zn.subVectors(r,n),mi.subVectors(i,n),Ja.subVectors(t,n);const o=zn.dot(zn),a=zn.dot(mi),c=zn.dot(Ja),l=mi.dot(mi),h=mi.dot(Ja),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,m=(l*c-a*h)*d,_=(o*h-a*c)*d;return s.set(1-m-_,_,m)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(t,n,i,r,s,o,a,c){return this.getBarycoord(t,n,i,r,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(t,n,i,r,s,o){return nc.setScalar(0),ic.setScalar(0),rc.setScalar(0),nc.fromBufferAttribute(t,n),ic.fromBufferAttribute(t,i),rc.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(nc,s.x),o.addScaledVector(ic,s.y),o.addScaledVector(rc,s.z),o}static isFrontFacing(t,n,i,r){return zn.subVectors(i,n),mi.subVectors(t,n),zn.cross(mi).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),zn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Hn.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,r,s){return Hn.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return Hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,s=this.c;let o,a;Br.subVectors(r,i),kr.subVectors(s,i),Qa.subVectors(t,i);const c=Br.dot(Qa),l=kr.dot(Qa);if(c<=0&&l<=0)return n.copy(i);tc.subVectors(t,r);const h=Br.dot(tc),u=kr.dot(tc);if(h>=0&&u<=h)return n.copy(r);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),n.copy(i).addScaledVector(Br,o);ec.subVectors(t,s);const m=Br.dot(ec),_=kr.dot(ec);if(_>=0&&m<=_)return n.copy(s);const v=m*l-c*_;if(v<=0&&l>=0&&_<=0)return a=l/(l-_),n.copy(i).addScaledVector(kr,a);const p=h*_-m*u;if(p<=0&&u-h>=0&&m-_>=0)return _u.subVectors(s,r),a=(u-h)/(u-h+(m-_)),n.copy(r).addScaledVector(_u,a);const f=1/(p+v+d);return o=v*f,a=d*f,n.copy(i).addScaledVector(Br,o).addScaledVector(kr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Eo={h:0,s:0,l:0};function sc(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class Zt{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,n),this}setRGB(t,n,i,r=Yt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Yt.toWorkingColorSpace(this,r),this}setHSL(t,n,i,r=Yt.workingColorSpace){if(t=H0(t,1),n=Je(n,0,1),i=Je(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=sc(o,s,t+1/3),this.g=sc(o,s,t),this.b=sc(o,s,t-1/3)}return Yt.toWorkingColorSpace(this,r),this}setStyle(t,n=Ln){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ln){const i=Cf[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Si(t.r),this.g=Si(t.g),this.b=Si(t.b),this}copyLinearToSRGB(t){return this.r=Jr(t.r),this.g=Jr(t.g),this.b=Jr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ln){return Yt.fromWorkingColorSpace(qe.copy(this),t),Math.round(Je(qe.r*255,0,255))*65536+Math.round(Je(qe.g*255,0,255))*256+Math.round(Je(qe.b*255,0,255))}getHexString(t=Ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Yt.workingColorSpace){Yt.fromWorkingColorSpace(qe.copy(this),n);const i=qe.r,r=qe.g,s=qe.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-i)/u+2;break;case s:c=(i-r)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,n=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(qe.copy(this),n),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=Ln){Yt.fromWorkingColorSpace(qe.copy(this),t);const n=qe.r,i=qe.g,r=qe.b;return t!==Ln?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL(Ni),this.setHSL(Ni.h+t,Ni.s+n,Ni.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ni),t.getHSL(Eo);const i=Ga(Ni.h,Eo.h,n),r=Ga(Ni.s,Eo.s,n),s=Ga(Ni.l,Eo.l,n);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qe=new Zt;Zt.NAMES=Cf;let s_=0;class no extends br{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:s_++}),this.uuid=to(),this.name="",this.blending=Zr,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rc,this.blendDst=Cc,this.blendEquation=ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pr,this.stencilZFail=Pr,this.stencilZPass=Pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Zr&&(i.blending=this.blending),this.side!==qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Rc&&(i.blendSrc=this.blendSrc),this.blendDst!==Cc&&(i.blendDst=this.blendDst),this.blendEquation!==ar&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Pr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Pr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(n){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Gl extends no{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.combine=df,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ce=new U,To=new Bt;class ni{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=tu,this.updateRanges=[],this.gpuType=Mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)To.fromBufferAttribute(this,n),To.applyMatrix3(t),this.setXY(n,To.x,To.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ce.fromBufferAttribute(this,n),Ce.applyMatrix3(t),this.setXYZ(n,Ce.x,Ce.y,Ce.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ce.fromBufferAttribute(this,n),Ce.applyMatrix4(t),this.setXYZ(n,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ce.fromBufferAttribute(this,n),Ce.applyNormalMatrix(t),this.setXYZ(n,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ce.fromBufferAttribute(this,n),Ce.transformDirection(t),this.setXYZ(n,Ce.x,Ce.y,Ce.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Us(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=rn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Us(n,this.array)),n}setX(t,n){return this.normalized&&(n=rn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Us(n,this.array)),n}setY(t,n){return this.normalized&&(n=rn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Us(n,this.array)),n}setZ(t,n){return this.normalized&&(n=rn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Us(n,this.array)),n}setW(t,n){return this.normalized&&(n=rn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=rn(n,this.array),i=rn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=rn(n,this.array),i=rn(i,this.array),r=rn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t*=this.itemSize,this.normalized&&(n=rn(n,this.array),i=rn(i,this.array),r=rn(r,this.array),s=rn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==tu&&(t.usage=this.usage),t}}class Pf extends ni{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class Lf extends ni{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class gn extends ni{constructor(t,n,i){super(new Float32Array(t),n,i)}}let o_=0;const wn=new Re,oc=new cn,zr=new U,dn=new eo,Bs=new eo,ze=new U;class Xn extends br{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:o_++}),this.uuid=to(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bf(t)?Lf:Pf)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Nt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return wn.makeRotationFromQuaternion(t),this.applyMatrix4(wn),this}rotateX(t){return wn.makeRotationX(t),this.applyMatrix4(wn),this}rotateY(t){return wn.makeRotationY(t),this.applyMatrix4(wn),this}rotateZ(t){return wn.makeRotationZ(t),this.applyMatrix4(wn),this}translate(t,n,i){return wn.makeTranslation(t,n,i),this.applyMatrix4(wn),this}scale(t,n,i){return wn.makeScale(t,n,i),this.applyMatrix4(wn),this}lookAt(t){return oc.lookAt(t),oc.updateMatrix(),this.applyMatrix4(oc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zr).negate(),this.translate(zr.x,zr.y,zr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gn(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=t[i];n.setXYZ(i,s.x,s.y,s.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new eo);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pa);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(dn.setFromBufferAttribute(t),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(ze.addVectors(dn.min,Bs.min),dn.expandByPoint(ze),ze.addVectors(dn.max,Bs.max),dn.expandByPoint(ze)):(dn.expandByPoint(Bs.min),dn.expandByPoint(Bs.max))}dn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)ze.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(ze));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)ze.fromBufferAttribute(a,l),c&&(zr.fromBufferAttribute(t,l),ze.add(zr)),r=Math.max(r,i.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ni(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<i.count;I++)a[I]=new U,c[I]=new U;const l=new U,h=new U,u=new U,d=new Bt,m=new Bt,_=new Bt,v=new U,p=new U;function f(I,S,M){l.fromBufferAttribute(i,I),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),d.fromBufferAttribute(s,I),m.fromBufferAttribute(s,S),_.fromBufferAttribute(s,M),h.sub(l),u.sub(l),m.sub(d),_.sub(d);const w=1/(m.x*_.y-_.x*m.y);isFinite(w)&&(v.copy(h).multiplyScalar(_.y).addScaledVector(u,-m.y).multiplyScalar(w),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(w),a[I].add(v),a[S].add(v),a[M].add(v),c[I].add(p),c[S].add(p),c[M].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,S=b.length;I<S;++I){const M=b[I],w=M.start,V=M.count;for(let k=w,j=w+V;k<j;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const T=new U,y=new U,B=new U,C=new U;function A(I){B.fromBufferAttribute(r,I),C.copy(B);const S=a[I];T.copy(S),T.sub(B.multiplyScalar(B.dot(S))).normalize(),y.crossVectors(C,S);const w=y.dot(c[I])<0?-1:1;o.setXYZW(I,T.x,T.y,T.z,w)}for(let I=0,S=b.length;I<S;++I){const M=b[I],w=M.start,V=M.count;for(let k=w,j=w+V;k<j;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ni(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new U,s=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(t)for(let d=0,m=t.count;d<m;d+=3){const _=t.getX(d+0),v=t.getX(d+1),p=t.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,v),o.fromBufferAttribute(n,p),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,_),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,p),a.add(h),c.add(h),l.add(h),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=n.count;d<m;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)ze.fromBufferAttribute(t,n),ze.normalize(),t.setXYZ(n,ze.x,ze.y,ze.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let m=0,_=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?m=c[v]*a.data.stride+a.offset:m=c[v]*h;for(let f=0;f<h;f++)d[_++]=l[m++]}return new ni(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Xn,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,i);n.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],m=t(d,i);c.push(m)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const m=l[u];h.push(m.toJSON(t.data))}h.length>0&&(r[c]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const r=t.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(n))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(n));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gu=new Re,tr=new Hl,bo=new pa,vu=new U,Ao=new U,wo=new U,Ro=new U,ac=new U,Co=new U,xu=new U,Po=new U;class ti extends cn{constructor(t=new Xn,n=new Gl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Co.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(ac.fromBufferAttribute(u,t),o?Co.addScaledVector(ac,h):Co.addScaledVector(ac.sub(n),h))}n.add(Co)}return n}raycast(t,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),bo.copy(i.boundingSphere),bo.applyMatrix4(s),tr.copy(t.ray).recast(t.near),!(bo.containsPoint(tr.origin)===!1&&(tr.intersectSphere(bo,vu)===null||tr.origin.distanceToSquared(vu)>(t.far-t.near)**2))&&(gu.copy(s).invert(),tr.copy(t.ray).applyMatrix4(gu),!(i.boundingBox!==null&&tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,tr)))}_computeIntersections(t,n,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=d.length;_<v;_++){const p=d[_],f=o[p.materialIndex],b=Math.max(p.start,m.start),T=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,B=T;y<B;y+=3){const C=a.getX(y),A=a.getX(y+1),I=a.getX(y+2);r=Lo(this,f,t,i,l,h,u,C,A,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=_,f=v;p<f;p+=3){const b=a.getX(p),T=a.getX(p+1),y=a.getX(p+2);r=Lo(this,o,t,i,l,h,u,b,T,y),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,v=d.length;_<v;_++){const p=d[_],f=o[p.materialIndex],b=Math.max(p.start,m.start),T=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,B=T;y<B;y+=3){const C=y,A=y+1,I=y+2;r=Lo(this,f,t,i,l,h,u,C,A,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let p=_,f=v;p<f;p+=3){const b=p,T=p+1,y=p+2;r=Lo(this,o,t,i,l,h,u,b,T,y),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function a_(e,t,n,i,r,s,o,a){let c;if(t.side===tn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side===qi,a),c===null)return null;Po.copy(a),Po.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(Po);return l<n.near||l>n.far?null:{distance:l,point:Po.clone(),object:e}}function Lo(e,t,n,i,r,s,o,a,c,l){e.getVertexPosition(a,Ao),e.getVertexPosition(c,wo),e.getVertexPosition(l,Ro);const h=a_(e,t,n,i,Ao,wo,Ro,xu);if(h){const u=new U;Hn.getBarycoord(xu,Ao,wo,Ro,u),r&&(h.uv=Hn.getInterpolatedAttribute(r,a,c,l,u,new Bt)),s&&(h.uv1=Hn.getInterpolatedAttribute(s,a,c,l,u,new Bt)),o&&(h.normal=Hn.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new U,materialIndex:0};Hn.getNormal(Ao,wo,Ro,d.normal),h.face=d,h.barycoord=u}return h}class io extends Xn{constructor(t=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,m=0;_("z","y","x",-1,-1,i,n,t,o,s,0),_("z","y","x",1,-1,i,n,-t,o,s,1),_("x","z","y",1,1,t,i,n,r,o,2),_("x","z","y",1,-1,t,i,-n,r,o,3),_("x","y","z",1,-1,t,n,i,r,s,4),_("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new gn(l,3)),this.setAttribute("normal",new gn(h,3)),this.setAttribute("uv",new gn(u,2));function _(v,p,f,b,T,y,B,C,A,I,S){const M=y/A,w=B/I,V=y/2,k=B/2,j=C/2,K=A+1,X=I+1;let $=0,H=0;const it=new U;for(let lt=0;lt<X;lt++){const Tt=lt*w-k;for(let kt=0;kt<K;kt++){const oe=kt*M-V;it[v]=oe*b,it[p]=Tt*T,it[f]=j,l.push(it.x,it.y,it.z),it[v]=0,it[p]=0,it[f]=C>0?1:-1,h.push(it.x,it.y,it.z),u.push(kt/A),u.push(1-lt/I),$+=1}}for(let lt=0;lt<I;lt++)for(let Tt=0;Tt<A;Tt++){const kt=d+Tt+K*lt,oe=d+Tt+K*(lt+1),W=d+(Tt+1)+K*(lt+1),tt=d+(Tt+1)+K*lt;c.push(kt,oe,tt),c.push(oe,W,tt),H+=6}a.addGroup(m,H,S),m+=H,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new io(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function $e(e){const t={};for(let n=0;n<e.length;n++){const i=os(e[n]);for(const r in i)t[r]=i[r]}return t}function c_(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Df(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const l_={clone:os,merge:$e};var h_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,u_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yi extends no{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=h_,this.fragmentShader=u_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=c_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class If extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=yi}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fi=new U,Mu=new Bt,yu=new Bt;class Dn extends If{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=fl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Qo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fl*2*Math.atan(Math.tan(Qo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fi.x,Fi.y).multiplyScalar(-t/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Fi.x,Fi.y).multiplyScalar(-t/Fi.z)}getViewSize(t,n){return this.getViewBounds(t,Mu,yu),n.subVectors(yu,Mu)}setViewOffset(t,n,i,r,s,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Qo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,n-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Hr=-90,Gr=1;class d_ extends cn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Dn(Hr,Gr,t,n);r.layers=this.layers,this.add(r);const s=new Dn(Hr,Gr,t,n);s.layers=this.layers,this.add(s);const o=new Dn(Hr,Gr,t,n);o.layers=this.layers,this.add(o);const a=new Dn(Hr,Gr,t,n);a.layers=this.layers,this.add(a);const c=new Dn(Hr,Gr,t,n);c.layers=this.layers,this.add(c);const l=new Dn(Hr,Gr,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,c]=n;for(const l of n)this.remove(l);if(t===yi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ia)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(n,s),t.setRenderTarget(i,1,r),t.render(n,o),t.setRenderTarget(i,2,r),t.render(n,a),t.setRenderTarget(i,3,r),t.render(n,c),t.setRenderTarget(i,4,r),t.render(n,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,r),t.render(n,h),t.setRenderTarget(u,d,m),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Uf extends en{constructor(t,n,i,r,s,o,a,c,l,h){t=t!==void 0?t:[],n=n!==void 0?n:ns,super(t,n,i,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class f_ extends Mr{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Uf(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Qn}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new io(5,5,5),s=new Yi({name:"CubemapFromEquirect",uniforms:os(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:Vi});s.uniforms.tEquirect.value=n;const o=new ti(r,s),a=n.minFilter;return n.minFilter===ur&&(n.minFilter=Qn),new d_(1,10,this).update(t,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(s)}}const cc=new U,p_=new U,m_=new Nt;class ki{constructor(t=new U(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=cc.subVectors(i,n).cross(p_.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(cc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||m_.getNormalMatrix(t),r=this.coplanarPoint(cc).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const er=new pa,Do=new U;class Nf{constructor(t=new ki,n=new ki,i=new ki,r=new ki,s=new ki,o=new ki){this.planes=[t,n,i,r,s,o]}set(t,n,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=yi){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],h=r[5],u=r[6],d=r[7],m=r[8],_=r[9],v=r[10],p=r[11],f=r[12],b=r[13],T=r[14],y=r[15];if(i[0].setComponents(c-s,d-l,p-m,y-f).normalize(),i[1].setComponents(c+s,d+l,p+m,y+f).normalize(),i[2].setComponents(c+o,d+h,p+_,y+b).normalize(),i[3].setComponents(c-o,d-h,p-_,y-b).normalize(),i[4].setComponents(c-a,d-u,p-v,y-T).normalize(),n===yi)i[5].setComponents(c+a,d+u,p+v,y+T).normalize();else if(n===ia)i[5].setComponents(a,u,v,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),er.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(er)}intersectsSprite(t){return er.center.set(0,0,0),er.radius=.7071067811865476,er.applyMatrix4(t.matrixWorld),this.intersectsSphere(er)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Do.x=r.normal.x>0?t.max.x:t.min.x,Do.y=r.normal.y>0?t.max.y:t.min.y,Do.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Do)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ff(){let e=null,t=!1,n=null,i=null;function r(s,o){n(s,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function __(e){const t=new WeakMap;function n(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=e.createBuffer();e.bindBuffer(c,d),e.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=e.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=e.SHORT;else if(l instanceof Uint32Array)m=e.UNSIGNED_INT;else if(l instanceof Int32Array)m=e.INT;else if(l instanceof Int8Array)m=e.BYTE;else if(l instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(e.bindBuffer(l,a),u.length===0)e.bufferSubData(l,0,h);else{u.sort((m,_)=>m.start-_.start);let d=0;for(let m=1;m<u.length;m++){const _=u[d],v=u[m];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,u[d]=v)}u.length=d+1;for(let m=0,_=u.length;m<_;m++){const v=u[m];e.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(e.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,n(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class ma extends Xn{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,o=n/2,a=Math.floor(i),c=Math.floor(r),l=a+1,h=c+1,u=t/a,d=n/c,m=[],_=[],v=[],p=[];for(let f=0;f<h;f++){const b=f*d-o;for(let T=0;T<l;T++){const y=T*u-s;_.push(y,-b,0),v.push(0,0,1),p.push(T/a),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let b=0;b<a;b++){const T=b+l*f,y=b+l*(f+1),B=b+1+l*(f+1),C=b+1+l*f;m.push(T,y,C),m.push(y,B,C)}this.setIndex(m),this.setAttribute("position",new gn(_,3)),this.setAttribute("normal",new gn(v,3)),this.setAttribute("uv",new gn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ma(t.width,t.height,t.widthSegments,t.heightSegments)}}var g_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,x_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,M_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,y_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,S_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,E_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,T_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,A_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,w_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,P_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,L_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,D_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,I_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,N_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,O_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,B_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,k_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,z_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,H_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,G_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,V_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,q_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Y_="gl_FragColor = linearToOutputTexel( gl_FragColor );",j_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,K_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Z_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,J_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Q_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,eg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ng=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ig=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,og=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ag=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ug=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_g=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ag=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ig=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ug=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ng=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Og=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$g=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,t1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,e1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,n1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,r1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,s1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,o1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,a1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,l1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,h1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,u1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,d1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,f1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,p1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,m1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,g1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,M1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,E1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,T1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,b1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,A1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,w1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,C1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,P1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,L1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,N1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,O1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,B1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,k1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,H1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,X1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,j1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,K1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ot={alphahash_fragment:g_,alphahash_pars_fragment:v_,alphamap_fragment:x_,alphamap_pars_fragment:M_,alphatest_fragment:y_,alphatest_pars_fragment:S_,aomap_fragment:E_,aomap_pars_fragment:T_,batching_pars_vertex:b_,batching_vertex:A_,begin_vertex:w_,beginnormal_vertex:R_,bsdfs:C_,iridescence_fragment:P_,bumpmap_pars_fragment:L_,clipping_planes_fragment:D_,clipping_planes_pars_fragment:I_,clipping_planes_pars_vertex:U_,clipping_planes_vertex:N_,color_fragment:F_,color_pars_fragment:O_,color_pars_vertex:B_,color_vertex:k_,common:z_,cube_uv_reflection_fragment:H_,defaultnormal_vertex:G_,displacementmap_pars_vertex:V_,displacementmap_vertex:W_,emissivemap_fragment:X_,emissivemap_pars_fragment:q_,colorspace_fragment:Y_,colorspace_pars_fragment:j_,envmap_fragment:K_,envmap_common_pars_fragment:Z_,envmap_pars_fragment:$_,envmap_pars_vertex:J_,envmap_physical_pars_fragment:lg,envmap_vertex:Q_,fog_vertex:tg,fog_pars_vertex:eg,fog_fragment:ng,fog_pars_fragment:ig,gradientmap_pars_fragment:rg,lightmap_pars_fragment:sg,lights_lambert_fragment:og,lights_lambert_pars_fragment:ag,lights_pars_begin:cg,lights_toon_fragment:hg,lights_toon_pars_fragment:ug,lights_phong_fragment:dg,lights_phong_pars_fragment:fg,lights_physical_fragment:pg,lights_physical_pars_fragment:mg,lights_fragment_begin:_g,lights_fragment_maps:gg,lights_fragment_end:vg,logdepthbuf_fragment:xg,logdepthbuf_pars_fragment:Mg,logdepthbuf_pars_vertex:yg,logdepthbuf_vertex:Sg,map_fragment:Eg,map_pars_fragment:Tg,map_particle_fragment:bg,map_particle_pars_fragment:Ag,metalnessmap_fragment:wg,metalnessmap_pars_fragment:Rg,morphinstance_vertex:Cg,morphcolor_vertex:Pg,morphnormal_vertex:Lg,morphtarget_pars_vertex:Dg,morphtarget_vertex:Ig,normal_fragment_begin:Ug,normal_fragment_maps:Ng,normal_pars_fragment:Fg,normal_pars_vertex:Og,normal_vertex:Bg,normalmap_pars_fragment:kg,clearcoat_normal_fragment_begin:zg,clearcoat_normal_fragment_maps:Hg,clearcoat_pars_fragment:Gg,iridescence_pars_fragment:Vg,opaque_fragment:Wg,packing:Xg,premultiplied_alpha_fragment:qg,project_vertex:Yg,dithering_fragment:jg,dithering_pars_fragment:Kg,roughnessmap_fragment:Zg,roughnessmap_pars_fragment:$g,shadowmap_pars_fragment:Jg,shadowmap_pars_vertex:Qg,shadowmap_vertex:t1,shadowmask_pars_fragment:e1,skinbase_vertex:n1,skinning_pars_vertex:i1,skinning_vertex:r1,skinnormal_vertex:s1,specularmap_fragment:o1,specularmap_pars_fragment:a1,tonemapping_fragment:c1,tonemapping_pars_fragment:l1,transmission_fragment:h1,transmission_pars_fragment:u1,uv_pars_fragment:d1,uv_pars_vertex:f1,uv_vertex:p1,worldpos_vertex:m1,background_vert:_1,background_frag:g1,backgroundCube_vert:v1,backgroundCube_frag:x1,cube_vert:M1,cube_frag:y1,depth_vert:S1,depth_frag:E1,distanceRGBA_vert:T1,distanceRGBA_frag:b1,equirect_vert:A1,equirect_frag:w1,linedashed_vert:R1,linedashed_frag:C1,meshbasic_vert:P1,meshbasic_frag:L1,meshlambert_vert:D1,meshlambert_frag:I1,meshmatcap_vert:U1,meshmatcap_frag:N1,meshnormal_vert:F1,meshnormal_frag:O1,meshphong_vert:B1,meshphong_frag:k1,meshphysical_vert:z1,meshphysical_frag:H1,meshtoon_vert:G1,meshtoon_frag:V1,points_vert:W1,points_frag:X1,shadow_vert:q1,shadow_frag:Y1,sprite_vert:j1,sprite_frag:K1},et={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new Bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new Bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},Jn={basic:{uniforms:$e([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:$e([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:$e([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:$e([et.common,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.roughnessmap,et.metalnessmap,et.fog,et.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:$e([et.common,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.gradientmap,et.fog,et.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:$e([et.common,et.bumpmap,et.normalmap,et.displacementmap,et.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:$e([et.points,et.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:$e([et.common,et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:$e([et.common,et.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:$e([et.common,et.bumpmap,et.normalmap,et.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:$e([et.sprite,et.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:$e([et.common,et.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:$e([et.lights,et.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Jn.physical={uniforms:$e([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new Bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new Bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new Bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Io={r:0,b:0,g:0},nr=new Ti,Z1=new Re;function $1(e,t,n,i,r,s,o){const a=new Zt(0);let c=s===!0?0:1,l,h,u=null,d=0,m=null;function _(b){let T=b.isScene===!0?b.background:null;return T&&T.isTexture&&(T=(b.backgroundBlurriness>0?n:t).get(T)),T}function v(b){let T=!1;const y=_(b);y===null?f(a,c):y&&y.isColor&&(f(y,1),T=!0);const B=e.xr.getEnvironmentBlendMode();B==="additive"?i.buffers.color.setClear(0,0,0,1,o):B==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function p(b,T){const y=_(T);y&&(y.isCubeTexture||y.mapping===da)?(h===void 0&&(h=new ti(new io(1,1,1),new Yi({name:"BackgroundCubeMaterial",uniforms:os(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(B,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),nr.copy(T.backgroundRotation),nr.x*=-1,nr.y*=-1,nr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(nr.y*=-1,nr.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Z1.makeRotationFromEuler(nr)),h.material.toneMapped=Yt.getTransfer(y.colorSpace)!==ie,(u!==y||d!==y.version||m!==e.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,m=e.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ti(new ma(2,2),new Yi({name:"BackgroundMaterial",uniforms:os(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(y.colorSpace)!==ie,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||m!==e.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,m=e.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function f(b,T){b.getRGB(Io,Df(e)),i.buffers.color.setClear(Io.r,Io.g,Io.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(b,T=1){a.set(b),c=T,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,f(a,c)},render:v,addToRenderList:p}}function J1(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(M,w,V,k,j){let K=!1;const X=u(k,V,w);s!==X&&(s=X,l(s.object)),K=m(M,k,V,j),K&&_(M,k,V,j),j!==null&&t.update(j,e.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,y(M,w,V,k),j!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function c(){return e.createVertexArray()}function l(M){return e.bindVertexArray(M)}function h(M){return e.deleteVertexArray(M)}function u(M,w,V){const k=V.wireframe===!0;let j=i[M.id];j===void 0&&(j={},i[M.id]=j);let K=j[w.id];K===void 0&&(K={},j[w.id]=K);let X=K[k];return X===void 0&&(X=d(c()),K[k]=X),X}function d(M){const w=[],V=[],k=[];for(let j=0;j<n;j++)w[j]=0,V[j]=0,k[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:V,attributeDivisors:k,object:M,attributes:{},index:null}}function m(M,w,V,k){const j=s.attributes,K=w.attributes;let X=0;const $=V.getAttributes();for(const H in $)if($[H].location>=0){const lt=j[H];let Tt=K[H];if(Tt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(Tt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(Tt=M.instanceColor)),lt===void 0||lt.attribute!==Tt||Tt&&lt.data!==Tt.data)return!0;X++}return s.attributesNum!==X||s.index!==k}function _(M,w,V,k){const j={},K=w.attributes;let X=0;const $=V.getAttributes();for(const H in $)if($[H].location>=0){let lt=K[H];lt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor));const Tt={};Tt.attribute=lt,lt&&lt.data&&(Tt.data=lt.data),j[H]=Tt,X++}s.attributes=j,s.attributesNum=X,s.index=k}function v(){const M=s.newAttributes;for(let w=0,V=M.length;w<V;w++)M[w]=0}function p(M){f(M,0)}function f(M,w){const V=s.newAttributes,k=s.enabledAttributes,j=s.attributeDivisors;V[M]=1,k[M]===0&&(e.enableVertexAttribArray(M),k[M]=1),j[M]!==w&&(e.vertexAttribDivisor(M,w),j[M]=w)}function b(){const M=s.newAttributes,w=s.enabledAttributes;for(let V=0,k=w.length;V<k;V++)w[V]!==M[V]&&(e.disableVertexAttribArray(V),w[V]=0)}function T(M,w,V,k,j,K,X){X===!0?e.vertexAttribIPointer(M,w,V,j,K):e.vertexAttribPointer(M,w,V,k,j,K)}function y(M,w,V,k){v();const j=k.attributes,K=V.getAttributes(),X=w.defaultAttributeValues;for(const $ in K){const H=K[$];if(H.location>=0){let it=j[$];if(it===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(it=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(it=M.instanceColor)),it!==void 0){const lt=it.normalized,Tt=it.itemSize,kt=t.get(it);if(kt===void 0)continue;const oe=kt.buffer,W=kt.type,tt=kt.bytesPerElement,xt=W===e.INT||W===e.UNSIGNED_INT||it.gpuType===Nl;if(it.isInterleavedBufferAttribute){const rt=it.data,Ct=rt.stride,Dt=it.offset;if(rt.isInstancedInterleavedBuffer){for(let zt=0;zt<H.locationSize;zt++)f(H.location+zt,rt.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let zt=0;zt<H.locationSize;zt++)p(H.location+zt);e.bindBuffer(e.ARRAY_BUFFER,oe);for(let zt=0;zt<H.locationSize;zt++)T(H.location+zt,Tt/H.locationSize,W,lt,Ct*tt,(Dt+Tt/H.locationSize*zt)*tt,xt)}else{if(it.isInstancedBufferAttribute){for(let rt=0;rt<H.locationSize;rt++)f(H.location+rt,it.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let rt=0;rt<H.locationSize;rt++)p(H.location+rt);e.bindBuffer(e.ARRAY_BUFFER,oe);for(let rt=0;rt<H.locationSize;rt++)T(H.location+rt,Tt/H.locationSize,W,lt,Tt*tt,Tt/H.locationSize*rt*tt,xt)}}else if(X!==void 0){const lt=X[$];if(lt!==void 0)switch(lt.length){case 2:e.vertexAttrib2fv(H.location,lt);break;case 3:e.vertexAttrib3fv(H.location,lt);break;case 4:e.vertexAttrib4fv(H.location,lt);break;default:e.vertexAttrib1fv(H.location,lt)}}}}b()}function B(){I();for(const M in i){const w=i[M];for(const V in w){const k=w[V];for(const j in k)h(k[j].object),delete k[j];delete w[V]}delete i[M]}}function C(M){if(i[M.id]===void 0)return;const w=i[M.id];for(const V in w){const k=w[V];for(const j in k)h(k[j].object),delete k[j];delete w[V]}delete i[M.id]}function A(M){for(const w in i){const V=i[w];if(V[M.id]===void 0)continue;const k=V[M.id];for(const j in k)h(k[j].object),delete k[j];delete V[M.id]}}function I(){S(),o=!0,s!==r&&(s=r,l(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:B,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:p,disableUnusedAttributes:b}}function Q1(e,t,n){let i;function r(l){i=l}function s(l,h){e.drawArrays(i,l,h),n.update(h,i,1)}function o(l,h,u){u!==0&&(e.drawArraysInstanced(i,l,h,u),n.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_];n.update(m,i,1)}function c(l,h,u,d){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<l.length;_++)o(l[_],h[_],d[_]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,h,0,d,0,u);let _=0;for(let v=0;v<u;v++)_+=h[v]*d[v];n.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function t2(e,t,n,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==Gn&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const I=A===Qs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Ei&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Mi&&!I)}function c(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=n.logarithmicDepthBuffer===!0,d=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),b=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),T=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),B=_>0,C=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:m,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:B,maxSamples:C}}function e2(e){const t=this;let n=null,i=0,r=!1,s=!1;const o=new ki,a=new Nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||i!==0||r;return r=d,i=u.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){n=h(u,d,0)},this.setState=function(u,d,m){const _=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,f=e.get(u);if(!r||_===null||_.length===0||s&&!p)s?h(null):l();else{const b=s?0:i,T=b*4;let y=f.clippingState||null;c.value=y,y=h(_,d,T,m);for(let B=0;B!==T;++B)y[B]=n[B];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,m,_){const v=u!==null?u.length:0;let p=null;if(v!==0){if(p=c.value,_!==!0||p===null){const f=m+v*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<f)&&(p=new Float32Array(f));for(let T=0,y=m;T!==v;++T,y+=4)o.copy(u[T]).applyMatrix4(b,a),o.normal.toArray(p,y),p[y+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function n2(e){let t=new WeakMap;function n(o,a){return a===Oc?o.mapping=ns:a===Bc&&(o.mapping=is),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Oc||a===Bc)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new f_(c.height);return l.fromEquirectangularTexture(e,o),t.set(o,l),o.addEventListener("dispose",r),n(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class i2 extends If{constructor(t=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Yr=4,Su=[.125,.215,.35,.446,.526,.582],cr=20,lc=new i2,Eu=new Zt;let hc=null,uc=0,dc=0,fc=!1;const or=(1+Math.sqrt(5))/2,Vr=1/or,Tu=[new U(-or,Vr,0),new U(or,Vr,0),new U(-Vr,0,or),new U(Vr,0,or),new U(0,or,-Vr),new U(0,or,Vr),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class bu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,r=100){hc=this._renderer.getRenderTarget(),uc=this._renderer.getActiveCubeFace(),dc=this._renderer.getActiveMipmapLevel(),fc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(hc,uc,dc),this._renderer.xr.enabled=fc,t.scissorTest=!1,Uo(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ns||t.mapping===is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),hc=this._renderer.getRenderTarget(),uc=this._renderer.getActiveCubeFace(),dc=this._renderer.getActiveMipmapLevel(),fc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Qn,minFilter:Qn,generateMipmaps:!1,type:Qs,format:Gn,colorSpace:vs,depthBuffer:!1},r=Au(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Au(t,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=r2(s)),this._blurMaterial=s2(s,t,n)}return r}_compileMaterial(t){const n=new ti(this._lodPlanes[0],t);this._renderer.compile(n,lc)}_sceneToCubeUV(t,n,i,r){const a=new Dn(90,1,n,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Eu),h.toneMapping=Wi,h.autoClear=!1;const m=new Gl({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),_=new ti(new io,m);let v=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,v=!0):(m.color.copy(Eu),v=!0);for(let f=0;f<6;f++){const b=f%3;b===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):b===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const T=this._cubeSize;Uo(r,b*T,f>2?T:0,T,T),h.setRenderTarget(r),v&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===ns||t.mapping===is;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ru()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ti(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Uo(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,lc)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Tu[(r-s-1)%Tu.length];this._blur(t,s-1,s,o,a)}n.autoClear=i}_blur(t,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,n,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ti(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*cr-1),v=s/_,p=isFinite(s)?1+Math.floor(h*v):cr;p>cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${cr}`);const f=[];let b=0;for(let A=0;A<cr;++A){const I=A/v,S=Math.exp(-I*I/2);f.push(S),A===0?b+=S:A<p&&(b+=2*S)}for(let A=0;A<f.length;A++)f[A]=f[A]/b;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=_,d.mipInt.value=T-i;const y=this._sizeLods[r],B=3*y*(r>T-Yr?r-T+Yr:0),C=4*(this._cubeSize-y);Uo(n,B,C,3*y,2*y),c.setRenderTarget(n),c.render(u,lc)}}function r2(e){const t=[],n=[],i=[];let r=e;const s=e-Yr+1+Su.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let c=1/a;o>e-Yr?c=Su[o-e+Yr-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,_=6,v=3,p=2,f=1,b=new Float32Array(v*_*m),T=new Float32Array(p*_*m),y=new Float32Array(f*_*m);for(let C=0;C<m;C++){const A=C%3*2/3-1,I=C>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];b.set(S,v*_*C),T.set(d,p*_*C);const M=[C,C,C,C,C,C];y.set(M,f*_*C)}const B=new Xn;B.setAttribute("position",new ni(b,v)),B.setAttribute("uv",new ni(T,p)),B.setAttribute("faceIndex",new ni(y,f)),t.push(B),r>Yr&&r--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function Au(e,t,n){const i=new Mr(e,t,n);return i.texture.mapping=da,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Uo(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function s2(e,t,n){const i=new Float32Array(cr),r=new U(0,1,0);return new Yi({name:"SphericalGaussianBlur",defines:{n:cr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function wu(){return new Yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function Ru(){return new Yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function Vl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function o2(e){let t=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Oc||c===Bc,h=c===ns||c===is;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return n===null&&(n=new bu(e)),u=l?n.fromEquirectangular(a,u):n.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&r(m)?(n===null&&(n=new bu(e)),u=l?n.fromEquirectangular(a):n.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function a2(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&zs("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function c2(e,t,n,i){const r={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const v=d.morphAttributes[_];for(let p=0,f=v.length;p<f;p++)t.remove(v[p])}d.removeEventListener("dispose",o),delete r[d.id];const m=s.get(d);m&&(t.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function c(u){const d=u.attributes;for(const _ in d)t.update(d[_],e.ARRAY_BUFFER);const m=u.morphAttributes;for(const _ in m){const v=m[_];for(let p=0,f=v.length;p<f;p++)t.update(v[p],e.ARRAY_BUFFER)}}function l(u){const d=[],m=u.index,_=u.attributes.position;let v=0;if(m!==null){const b=m.array;v=m.version;for(let T=0,y=b.length;T<y;T+=3){const B=b[T+0],C=b[T+1],A=b[T+2];d.push(B,C,C,A,A,B)}}else if(_!==void 0){const b=_.array;v=_.version;for(let T=0,y=b.length/3-1;T<y;T+=3){const B=T+0,C=T+1,A=T+2;d.push(B,C,C,A,A,B)}}else return;const p=new(bf(d)?Lf:Pf)(d,1);p.version=v;const f=s.get(u);f&&t.remove(f),s.set(u,p)}function h(u){const d=s.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function l2(e,t,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,m){e.drawElements(i,m,s,d*o),n.update(m,i,1)}function l(d,m,_){_!==0&&(e.drawElementsInstanced(i,m,s,d*o,_),n.update(m,i,_))}function h(d,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,d,0,_);let p=0;for(let f=0;f<_;f++)p+=m[f];n.update(p,i,1)}function u(d,m,_,v){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<d.length;f++)l(d[f]/o,m[f],v[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,d,0,v,0,_);let f=0;for(let b=0;b<_;b++)f+=m[b]*v[b];n.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function h2(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=a*(s/3);break;case e.LINES:n.lines+=a*(s/2);break;case e.LINE_STRIP:n.lines+=a*(s-1);break;case e.LINE_LOOP:n.lines+=a*s;break;case e.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function u2(e,t,n){const i=new WeakMap,r=new we;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(a);if(d===void 0||d.count!==u){let M=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var m=M;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let y=0;_===!0&&(y=1),v===!0&&(y=2),p===!0&&(y=3);let B=a.attributes.position.count*y,C=1;B>t.maxTextureSize&&(C=Math.ceil(B/t.maxTextureSize),B=t.maxTextureSize);const A=new Float32Array(B*C*4*u),I=new wf(A,B,C,u);I.type=Mi,I.needsUpdate=!0;const S=y*4;for(let w=0;w<u;w++){const V=f[w],k=b[w],j=T[w],K=B*C*4*w;for(let X=0;X<V.count;X++){const $=X*S;_===!0&&(r.fromBufferAttribute(V,X),A[K+$+0]=r.x,A[K+$+1]=r.y,A[K+$+2]=r.z,A[K+$+3]=0),v===!0&&(r.fromBufferAttribute(k,X),A[K+$+4]=r.x,A[K+$+5]=r.y,A[K+$+6]=r.z,A[K+$+7]=0),p===!0&&(r.fromBufferAttribute(j,X),A[K+$+8]=r.x,A[K+$+9]=r.y,A[K+$+10]=r.z,A[K+$+11]=j.itemSize===4?r.w:1)}}d={count:u,texture:I,size:new Bt(B,C)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let _=0;for(let p=0;p<l.length;p++)_+=l[p];const v=a.morphTargetsRelative?1:1-_;c.getUniforms().setValue(e,"morphTargetBaseInfluence",v),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",d.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",d.size)}return{update:s}}function d2(e,t,n,i){let r=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(r.get(u)!==l&&(t.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return u}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),n.remove(l.instanceMatrix),l.instanceColor!==null&&n.remove(l.instanceColor)}return{update:s,dispose:o}}class Of extends en{constructor(t,n,i,r,s,o,a,c,l,h=$r){if(h!==$r&&h!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===$r&&(i=xr),i===void 0&&h===ss&&(i=rs),super(null,r,s,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=a!==void 0?a:Vn,this.minFilter=c!==void 0?c:Vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Bf=new en,Cu=new Of(1,1),kf=new wf,zf=new $0,Hf=new Uf,Pu=[],Lu=[],Du=new Float32Array(16),Iu=new Float32Array(9),Uu=new Float32Array(4);function xs(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=Pu[r];if(s===void 0&&(s=new Float32Array(r),Pu[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(s,a)}return s}function Oe(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Be(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function _a(e,t){let n=Lu[t];n===void 0&&(n=new Int32Array(t),Lu[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function f2(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function p2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oe(n,t))return;e.uniform2fv(this.addr,t),Be(n,t)}}function m2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Oe(n,t))return;e.uniform3fv(this.addr,t),Be(n,t)}}function _2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oe(n,t))return;e.uniform4fv(this.addr,t),Be(n,t)}}function g2(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Oe(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Be(n,t)}else{if(Oe(n,i))return;Uu.set(i),e.uniformMatrix2fv(this.addr,!1,Uu),Be(n,i)}}function v2(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Oe(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Be(n,t)}else{if(Oe(n,i))return;Iu.set(i),e.uniformMatrix3fv(this.addr,!1,Iu),Be(n,i)}}function x2(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Oe(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Be(n,t)}else{if(Oe(n,i))return;Du.set(i),e.uniformMatrix4fv(this.addr,!1,Du),Be(n,i)}}function M2(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function y2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oe(n,t))return;e.uniform2iv(this.addr,t),Be(n,t)}}function S2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Oe(n,t))return;e.uniform3iv(this.addr,t),Be(n,t)}}function E2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oe(n,t))return;e.uniform4iv(this.addr,t),Be(n,t)}}function T2(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function b2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oe(n,t))return;e.uniform2uiv(this.addr,t),Be(n,t)}}function A2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Oe(n,t))return;e.uniform3uiv(this.addr,t),Be(n,t)}}function w2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oe(n,t))return;e.uniform4uiv(this.addr,t),Be(n,t)}}function R2(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let s;this.type===e.SAMPLER_2D_SHADOW?(Cu.compareFunction=Tf,s=Cu):s=Bf,n.setTexture2D(t||s,r)}function C2(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||zf,r)}function P2(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||Hf,r)}function L2(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||kf,r)}function D2(e){switch(e){case 5126:return f2;case 35664:return p2;case 35665:return m2;case 35666:return _2;case 35674:return g2;case 35675:return v2;case 35676:return x2;case 5124:case 35670:return M2;case 35667:case 35671:return y2;case 35668:case 35672:return S2;case 35669:case 35673:return E2;case 5125:return T2;case 36294:return b2;case 36295:return A2;case 36296:return w2;case 35678:case 36198:case 36298:case 36306:case 35682:return R2;case 35679:case 36299:case 36307:return C2;case 35680:case 36300:case 36308:case 36293:return P2;case 36289:case 36303:case 36311:case 36292:return L2}}function I2(e,t){e.uniform1fv(this.addr,t)}function U2(e,t){const n=xs(t,this.size,2);e.uniform2fv(this.addr,n)}function N2(e,t){const n=xs(t,this.size,3);e.uniform3fv(this.addr,n)}function F2(e,t){const n=xs(t,this.size,4);e.uniform4fv(this.addr,n)}function O2(e,t){const n=xs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function B2(e,t){const n=xs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function k2(e,t){const n=xs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function z2(e,t){e.uniform1iv(this.addr,t)}function H2(e,t){e.uniform2iv(this.addr,t)}function G2(e,t){e.uniform3iv(this.addr,t)}function V2(e,t){e.uniform4iv(this.addr,t)}function W2(e,t){e.uniform1uiv(this.addr,t)}function X2(e,t){e.uniform2uiv(this.addr,t)}function q2(e,t){e.uniform3uiv(this.addr,t)}function Y2(e,t){e.uniform4uiv(this.addr,t)}function j2(e,t,n){const i=this.cache,r=t.length,s=_a(n,r);Oe(i,s)||(e.uniform1iv(this.addr,s),Be(i,s));for(let o=0;o!==r;++o)n.setTexture2D(t[o]||Bf,s[o])}function K2(e,t,n){const i=this.cache,r=t.length,s=_a(n,r);Oe(i,s)||(e.uniform1iv(this.addr,s),Be(i,s));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||zf,s[o])}function Z2(e,t,n){const i=this.cache,r=t.length,s=_a(n,r);Oe(i,s)||(e.uniform1iv(this.addr,s),Be(i,s));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||Hf,s[o])}function $2(e,t,n){const i=this.cache,r=t.length,s=_a(n,r);Oe(i,s)||(e.uniform1iv(this.addr,s),Be(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||kf,s[o])}function J2(e){switch(e){case 5126:return I2;case 35664:return U2;case 35665:return N2;case 35666:return F2;case 35674:return O2;case 35675:return B2;case 35676:return k2;case 5124:case 35670:return z2;case 35667:case 35671:return H2;case 35668:case 35672:return G2;case 35669:case 35673:return V2;case 5125:return W2;case 36294:return X2;case 36295:return q2;case 36296:return Y2;case 35678:case 36198:case 36298:case 36306:case 35682:return j2;case 35679:case 36299:case 36307:return K2;case 35680:case 36300:case 36308:case 36293:return Z2;case 36289:case 36303:case 36311:case 36292:return $2}}class Q2{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=D2(n.type)}}class tv{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=J2(n.type)}}class ev{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,n[a.id],i)}}}const pc=/(\w+)(\])?(\[|\.)?/g;function Nu(e,t){e.seq.push(t),e.map[t.id]=t}function nv(e,t,n){const i=e.name,r=i.length;for(pc.lastIndex=0;;){const s=pc.exec(i),o=pc.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Nu(n,l===void 0?new Q2(a,e,t):new tv(a,e,t));break}else{let u=n.map[a];u===void 0&&(u=new ev(a),Nu(n,u)),n=u}}}class ta{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(n,r),o=t.getUniformLocation(n,s.name);nv(s,o,this)}}setValue(t,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function Fu(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const iv=37297;let rv=0;function sv(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const Ou=new Nt;function ov(e){Yt._getMatrix(Ou,Yt.workingColorSpace,e);const t=`mat3( ${Ou.elements.map(n=>n.toFixed(4))} )`;switch(Yt.getTransfer(e)){case fa:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Bu(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=e.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+sv(e.getShaderSource(t),o)}else return r}function av(e,t){const n=ov(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function cv(e,t){let n;switch(t){case S0:n="Linear";break;case E0:n="Reinhard";break;case T0:n="Cineon";break;case b0:n="ACESFilmic";break;case w0:n="AgX";break;case R0:n="Neutral";break;case A0:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const No=new U;function lv(){Yt.getLuminanceCoefficients(No);const e=No.x.toFixed(4),t=No.y.toFixed(4),n=No.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hv(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hs).join(`
`)}function uv(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function dv(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),o=s.name;let a=1;s.type===e.FLOAT_MAT2&&(a=2),s.type===e.FLOAT_MAT3&&(a=3),s.type===e.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:e.getAttribLocation(t,o),locationSize:a}}return n}function Hs(e){return e!==""}function ku(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const fv=/^[ \t]*#include +<([\w\d./]+)>/gm;function pl(e){return e.replace(fv,mv)}const pv=new Map;function mv(e,t){let n=Ot[t];if(n===void 0){const i=pv.get(t);if(i!==void 0)n=Ot[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return pl(n)}const _v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hu(e){return e.replace(_v,gv)}function gv(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Gu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function vv(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===uf?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===e0?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===gi&&(t="SHADOWMAP_TYPE_VSM"),t}function xv(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case ns:case is:t="ENVMAP_TYPE_CUBE";break;case da:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Mv(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case is:t="ENVMAP_MODE_REFRACTION";break}return t}function yv(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case df:t="ENVMAP_BLENDING_MULTIPLY";break;case M0:t="ENVMAP_BLENDING_MIX";break;case y0:t="ENVMAP_BLENDING_ADD";break}return t}function Sv(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function Ev(e,t,n,i){const r=e.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=vv(n),l=xv(n),h=Mv(n),u=yv(n),d=Sv(n),m=hv(n),_=uv(s),v=r.createProgram();let p,f,b=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Hs).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Hs).join(`
`),f.length>0&&(f+=`
`)):(p=[Gu(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hs).join(`
`),f=[Gu(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Wi?"#define TONE_MAPPING":"",n.toneMapping!==Wi?Ot.tonemapping_pars_fragment:"",n.toneMapping!==Wi?cv("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,av("linearToOutputTexel",n.outputColorSpace),lv(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Hs).join(`
`)),o=pl(o),o=ku(o,n),o=zu(o,n),a=pl(a),a=ku(a,n),a=zu(a,n),o=Hu(o),a=Hu(a),n.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",n.glslVersion===eu?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===eu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=b+p+o,y=b+f+a,B=Fu(r,r.VERTEX_SHADER,T),C=Fu(r,r.FRAGMENT_SHADER,y);r.attachShader(v,B),r.attachShader(v,C),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(w){if(e.debug.checkShaderErrors){const V=r.getProgramInfoLog(v).trim(),k=r.getShaderInfoLog(B).trim(),j=r.getShaderInfoLog(C).trim();let K=!0,X=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(K=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,v,B,C);else{const $=Bu(r,B,"vertex"),H=Bu(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+V+`
`+$+`
`+H)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(k===""||j==="")&&(X=!1);X&&(w.diagnostics={runnable:K,programLog:V,vertexShader:{log:k,prefix:p},fragmentShader:{log:j,prefix:f}})}r.deleteShader(B),r.deleteShader(C),I=new ta(r,v),S=dv(r,v)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,iv)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=rv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=B,this.fragmentShader=C,this}let Tv=0;class bv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new Av(t),n.set(t,i)),i}}class Av{constructor(t){this.id=Tv++,this.code=t,this.usedTimes=0}}function wv(e,t,n,i,r,s,o){const a=new Rf,c=new bv,l=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return l.add(S),S===0?"uv":`uv${S}`}function p(S,M,w,V,k){const j=V.fog,K=k.geometry,X=S.isMeshStandardMaterial?V.environment:null,$=(S.isMeshStandardMaterial?n:t).get(S.envMap||X),H=$&&$.mapping===da?$.image.height:null,it=_[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const lt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Tt=lt!==void 0?lt.length:0;let kt=0;K.morphAttributes.position!==void 0&&(kt=1),K.morphAttributes.normal!==void 0&&(kt=2),K.morphAttributes.color!==void 0&&(kt=3);let oe,W,tt,xt;if(it){const ee=Jn[it];oe=ee.vertexShader,W=ee.fragmentShader}else oe=S.vertexShader,W=S.fragmentShader,c.update(S),tt=c.getVertexShaderID(S),xt=c.getFragmentShaderID(S);const rt=e.getRenderTarget(),Ct=e.state.buffers.depth.getReversed(),Dt=k.isInstancedMesh===!0,zt=k.isBatchedMesh===!0,ge=!!S.map,Xt=!!S.matcap,be=!!$,D=!!S.aoMap,bn=!!S.lightMap,Ht=!!S.bumpMap,Gt=!!S.normalMap,wt=!!S.displacementMap,ue=!!S.emissiveMap,At=!!S.metalnessMap,E=!!S.roughnessMap,g=S.anisotropy>0,N=S.clearcoat>0,q=S.dispersion>0,Z=S.iridescence>0,G=S.sheen>0,yt=S.transmission>0,st=g&&!!S.anisotropyMap,ht=N&&!!S.clearcoatMap,qt=N&&!!S.clearcoatNormalMap,J=N&&!!S.clearcoatRoughnessMap,dt=Z&&!!S.iridescenceMap,Rt=Z&&!!S.iridescenceThicknessMap,Pt=G&&!!S.sheenColorMap,ft=G&&!!S.sheenRoughnessMap,Vt=!!S.specularMap,Ft=!!S.specularColorMap,ce=!!S.specularIntensityMap,R=yt&&!!S.transmissionMap,nt=yt&&!!S.thicknessMap,z=!!S.gradientMap,Y=!!S.alphaMap,ct=S.alphaTest>0,ot=!!S.alphaHash,It=!!S.extensions;let Se=Wi;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Se=e.toneMapping);const We={shaderID:it,shaderType:S.type,shaderName:S.name,vertexShader:oe,fragmentShader:W,defines:S.defines,customVertexShaderID:tt,customFragmentShaderID:xt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:zt,batchingColor:zt&&k._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&k.instanceColor!==null,instancingMorph:Dt&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?e.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:vs,alphaToCoverage:!!S.alphaToCoverage,map:ge,matcap:Xt,envMap:be,envMapMode:be&&$.mapping,envMapCubeUVHeight:H,aoMap:D,lightMap:bn,bumpMap:Ht,normalMap:Gt,displacementMap:d&&wt,emissiveMap:ue,normalMapObjectSpace:Gt&&S.normalMapType===I0,normalMapTangentSpace:Gt&&S.normalMapType===D0,metalnessMap:At,roughnessMap:E,anisotropy:g,anisotropyMap:st,clearcoat:N,clearcoatMap:ht,clearcoatNormalMap:qt,clearcoatRoughnessMap:J,dispersion:q,iridescence:Z,iridescenceMap:dt,iridescenceThicknessMap:Rt,sheen:G,sheenColorMap:Pt,sheenRoughnessMap:ft,specularMap:Vt,specularColorMap:Ft,specularIntensityMap:ce,transmission:yt,transmissionMap:R,thicknessMap:nt,gradientMap:z,opaque:S.transparent===!1&&S.blending===Zr&&S.alphaToCoverage===!1,alphaMap:Y,alphaTest:ct,alphaHash:ot,combine:S.combine,mapUv:ge&&v(S.map.channel),aoMapUv:D&&v(S.aoMap.channel),lightMapUv:bn&&v(S.lightMap.channel),bumpMapUv:Ht&&v(S.bumpMap.channel),normalMapUv:Gt&&v(S.normalMap.channel),displacementMapUv:wt&&v(S.displacementMap.channel),emissiveMapUv:ue&&v(S.emissiveMap.channel),metalnessMapUv:At&&v(S.metalnessMap.channel),roughnessMapUv:E&&v(S.roughnessMap.channel),anisotropyMapUv:st&&v(S.anisotropyMap.channel),clearcoatMapUv:ht&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:qt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:ft&&v(S.sheenRoughnessMap.channel),specularMapUv:Vt&&v(S.specularMap.channel),specularColorMapUv:Ft&&v(S.specularColorMap.channel),specularIntensityMapUv:ce&&v(S.specularIntensityMap.channel),transmissionMapUv:R&&v(S.transmissionMap.channel),thicknessMapUv:nt&&v(S.thicknessMap.channel),alphaMapUv:Y&&v(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Gt||g),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(ge||Y),fog:!!j,useFog:S.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ct,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:kt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:e.shadowMap.enabled&&w.length>0,shadowMapType:e.shadowMap.type,toneMapping:Se,decodeVideoTexture:ge&&S.map.isVideoTexture===!0&&Yt.getTransfer(S.map.colorSpace)===ie,decodeVideoTextureEmissive:ue&&S.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(S.emissiveMap.colorSpace)===ie,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===vi,flipSided:S.side===tn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:It&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(It&&S.extensions.multiDraw===!0||zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return We.vertexUv1s=l.has(1),We.vertexUv2s=l.has(2),We.vertexUv3s=l.has(3),l.clear(),We}function f(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const w in S.defines)M.push(w),M.push(S.defines[w]);return S.isRawShaderMaterial===!1&&(b(M,S),T(M,S),M.push(e.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function b(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function T(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){const M=_[S.type];let w;if(M){const V=Jn[M];w=l_.clone(V.uniforms)}else w=S.uniforms;return w}function B(S,M){let w;for(let V=0,k=h.length;V<k;V++){const j=h[V];if(j.cacheKey===M){w=j,++w.usedTimes;break}}return w===void 0&&(w=new Ev(e,M,S,s),h.push(w)),w}function C(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function A(S){c.remove(S)}function I(){c.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:y,acquireProgram:B,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:I}}function Rv(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let a=e.get(o);return a===void 0&&(a={},e.set(o,a)),a}function i(o){e.delete(o)}function r(o,a,c){e.get(o)[a]=c}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:s}}function Cv(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Vu(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Wu(){const e=[];let t=0;const n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function o(u,d,m,_,v,p){let f=e[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:m,groupOrder:_,renderOrder:u.renderOrder,z:v,group:p},e[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=m,f.groupOrder=_,f.renderOrder=u.renderOrder,f.z=v,f.group=p),t++,f}function a(u,d,m,_,v,p){const f=o(u,d,m,_,v,p);m.transmission>0?i.push(f):m.transparent===!0?r.push(f):n.push(f)}function c(u,d,m,_,v,p){const f=o(u,d,m,_,v,p);m.transmission>0?i.unshift(f):m.transparent===!0?r.unshift(f):n.unshift(f)}function l(u,d){n.length>1&&n.sort(u||Cv),i.length>1&&i.sort(d||Vu),r.length>1&&r.sort(d||Vu)}function h(){for(let u=t,d=e.length;u<d;u++){const m=e[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:h,sort:l}}function Pv(){let e=new WeakMap;function t(i,r){const s=e.get(i);let o;return s===void 0?(o=new Wu,e.set(i,[o])):r>=s.length?(o=new Wu,s.push(o)):o=s[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function Lv(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new U,color:new Zt};break;case"SpotLight":n={position:new U,direction:new U,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":n={color:new Zt,position:new U,halfWidth:new U,halfHeight:new U};break}return e[t.id]=n,n}}}function Dv(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Bt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Bt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let Iv=0;function Uv(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function Nv(e){const t=new Lv,n=Dv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const r=new U,s=new Re,o=new Re;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,_=0,v=0,p=0,f=0,b=0,T=0,y=0,B=0,C=0,A=0;l.sort(Uv);for(let S=0,M=l.length;S<M;S++){const w=l[S],V=w.color,k=w.intensity,j=w.distance,K=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=V.r*k,u+=V.g*k,d+=V.b*k;else if(w.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(w.sh.coefficients[X],k);A++}else if(w.isDirectionalLight){const X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const $=w.shadow,H=n.get(w);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=K,i.directionalShadowMatrix[m]=w.shadow.matrix,b++}i.directional[m]=X,m++}else if(w.isSpotLight){const X=t.get(w);X.position.setFromMatrixPosition(w.matrixWorld),X.color.copy(V).multiplyScalar(k),X.distance=j,X.coneCos=Math.cos(w.angle),X.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),X.decay=w.decay,i.spot[v]=X;const $=w.shadow;if(w.map&&(i.spotLightMap[B]=w.map,B++,$.updateMatrices(w),w.castShadow&&C++),i.spotLightMatrix[v]=$.matrix,w.castShadow){const H=n.get(w);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,i.spotShadow[v]=H,i.spotShadowMap[v]=K,y++}v++}else if(w.isRectAreaLight){const X=t.get(w);X.color.copy(V).multiplyScalar(k),X.halfWidth.set(w.width*.5,0,0),X.halfHeight.set(0,w.height*.5,0),i.rectArea[p]=X,p++}else if(w.isPointLight){const X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),X.distance=w.distance,X.decay=w.decay,w.castShadow){const $=w.shadow,H=n.get(w);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,H.shadowCameraNear=$.camera.near,H.shadowCameraFar=$.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=w.shadow.matrix,T++}i.point[_]=X,_++}else if(w.isHemisphereLight){const X=t.get(w);X.skyColor.copy(w.color).multiplyScalar(k),X.groundColor.copy(w.groundColor).multiplyScalar(k),i.hemi[f]=X,f++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=et.LTC_FLOAT_1,i.rectAreaLTC2=et.LTC_FLOAT_2):(i.rectAreaLTC1=et.LTC_HALF_1,i.rectAreaLTC2=et.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const I=i.hash;(I.directionalLength!==m||I.pointLength!==_||I.spotLength!==v||I.rectAreaLength!==p||I.hemiLength!==f||I.numDirectionalShadows!==b||I.numPointShadows!==T||I.numSpotShadows!==y||I.numSpotMaps!==B||I.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=p,i.point.length=_,i.hemi.length=f,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+B-C,i.spotLightMap.length=B,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,I.directionalLength=m,I.pointLength=_,I.spotLength=v,I.rectAreaLength=p,I.hemiLength=f,I.numDirectionalShadows=b,I.numPointShadows=T,I.numSpotShadows=y,I.numSpotMaps=B,I.numLightProbes=A,i.version=Iv++)}function c(l,h){let u=0,d=0,m=0,_=0,v=0;const p=h.matrixWorldInverse;for(let f=0,b=l.length;f<b;f++){const T=l[f];if(T.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),u++}else if(T.isSpotLight){const y=i.spot[m];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),m++}else if(T.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),o.identity(),s.copy(T.matrixWorld),s.premultiply(p),o.extractRotation(s),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),d++}else if(T.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:i}}function Xu(e){const t=new Nv(e),n=[],i=[];function r(h){l.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function o(h){i.push(h)}function a(){t.setup(n)}function c(h){t.setupView(n,h)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Fv(e){let t=new WeakMap;function n(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Xu(e),t.set(r,[a])):s>=o.length?(a=new Xu(e),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:n,dispose:i}}class Ov extends no{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=P0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bv extends no{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const kv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hv(e,t,n){let i=new Nf;const r=new Bt,s=new Bt,o=new we,a=new Ov({depthPacking:L0}),c=new Bv,l={},h=n.maxTextureSize,u={[qi]:tn,[tn]:qi,[vi]:vi},d=new Yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Bt},radius:{value:4}},vertexShader:kv,fragmentShader:zv}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Xn;_.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ti(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uf;let f=this.type;this.render=function(C,A,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const S=e.getRenderTarget(),M=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),V=e.state;V.setBlending(Vi),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const k=f!==gi&&this.type===gi,j=f===gi&&this.type!==gi;for(let K=0,X=C.length;K<X;K++){const $=C[K],H=$.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const it=H.getFrameExtents();if(r.multiply(it),s.copy(H.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/it.x),r.x=s.x*it.x,H.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/it.y),r.y=s.y*it.y,H.mapSize.y=s.y)),H.map===null||k===!0||j===!0){const Tt=this.type!==gi?{minFilter:Vn,magFilter:Vn}:{};H.map!==null&&H.map.dispose(),H.map=new Mr(r.x,r.y,Tt),H.map.texture.name=$.name+".shadowMap",H.camera.updateProjectionMatrix()}e.setRenderTarget(H.map),e.clear();const lt=H.getViewportCount();for(let Tt=0;Tt<lt;Tt++){const kt=H.getViewport(Tt);o.set(s.x*kt.x,s.y*kt.y,s.x*kt.z,s.y*kt.w),V.viewport(o),H.updateMatrices($,Tt),i=H.getFrustum(),y(A,I,H.camera,$,this.type)}H.isPointLightShadow!==!0&&this.type===gi&&b(H,I),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,e.setRenderTarget(S,M,w)};function b(C,A){const I=t.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Mr(r.x,r.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(A,null,I,d,v,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(A,null,I,m,v,null)}function T(C,A,I,S){let M=null;const w=I.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(w!==void 0)M=w;else if(M=I.isPointLight===!0?c:a,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=M.uuid,k=A.uuid;let j=l[V];j===void 0&&(j={},l[V]=j);let K=j[k];K===void 0&&(K=M.clone(),j[k]=K,A.addEventListener("dispose",B)),M=K}if(M.visible=A.visible,M.wireframe=A.wireframe,S===gi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=e.properties.get(M);V.light=I}return M}function y(C,A,I,S,M){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===gi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,C.matrixWorld);const k=t.update(C),j=C.material;if(Array.isArray(j)){const K=k.groups;for(let X=0,$=K.length;X<$;X++){const H=K[X],it=j[H.materialIndex];if(it&&it.visible){const lt=T(C,it,S,M);C.onBeforeShadow(e,C,A,I,k,lt,H),e.renderBufferDirect(I,null,k,lt,C,H),C.onAfterShadow(e,C,A,I,k,lt,H)}}}else if(j.visible){const K=T(C,j,S,M);C.onBeforeShadow(e,C,A,I,k,K,null),e.renderBufferDirect(I,null,k,K,C,null),C.onAfterShadow(e,C,A,I,k,K,null)}}const V=C.children;for(let k=0,j=V.length;k<j;k++)y(V[k],A,I,S,M)}function B(C){C.target.removeEventListener("dispose",B);for(const I in l){const S=l[I],M=C.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Gv={[Pc]:Lc,[Dc]:Nc,[Ic]:Fc,[es]:Uc,[Lc]:Pc,[Nc]:Dc,[Fc]:Ic,[Uc]:es};function Vv(e,t){function n(){let R=!1;const nt=new we;let z=null;const Y=new we(0,0,0,0);return{setMask:function(ct){z!==ct&&!R&&(e.colorMask(ct,ct,ct,ct),z=ct)},setLocked:function(ct){R=ct},setClear:function(ct,ot,It,Se,We){We===!0&&(ct*=Se,ot*=Se,It*=Se),nt.set(ct,ot,It,Se),Y.equals(nt)===!1&&(e.clearColor(ct,ot,It,Se),Y.copy(nt))},reset:function(){R=!1,z=null,Y.set(-1,0,0,0)}}}function i(){let R=!1,nt=!1,z=null,Y=null,ct=null;return{setReversed:function(ot){if(nt!==ot){const It=t.get("EXT_clip_control");nt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT);const Se=ct;ct=null,this.setClear(Se)}nt=ot},getReversed:function(){return nt},setTest:function(ot){ot?rt(e.DEPTH_TEST):Ct(e.DEPTH_TEST)},setMask:function(ot){z!==ot&&!R&&(e.depthMask(ot),z=ot)},setFunc:function(ot){if(nt&&(ot=Gv[ot]),Y!==ot){switch(ot){case Pc:e.depthFunc(e.NEVER);break;case Lc:e.depthFunc(e.ALWAYS);break;case Dc:e.depthFunc(e.LESS);break;case es:e.depthFunc(e.LEQUAL);break;case Ic:e.depthFunc(e.EQUAL);break;case Uc:e.depthFunc(e.GEQUAL);break;case Nc:e.depthFunc(e.GREATER);break;case Fc:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}Y=ot}},setLocked:function(ot){R=ot},setClear:function(ot){ct!==ot&&(nt&&(ot=1-ot),e.clearDepth(ot),ct=ot)},reset:function(){R=!1,z=null,Y=null,ct=null,nt=!1}}}function r(){let R=!1,nt=null,z=null,Y=null,ct=null,ot=null,It=null,Se=null,We=null;return{setTest:function(ee){R||(ee?rt(e.STENCIL_TEST):Ct(e.STENCIL_TEST))},setMask:function(ee){nt!==ee&&!R&&(e.stencilMask(ee),nt=ee)},setFunc:function(ee,Fn,hi){(z!==ee||Y!==Fn||ct!==hi)&&(e.stencilFunc(ee,Fn,hi),z=ee,Y=Fn,ct=hi)},setOp:function(ee,Fn,hi){(ot!==ee||It!==Fn||Se!==hi)&&(e.stencilOp(ee,Fn,hi),ot=ee,It=Fn,Se=hi)},setLocked:function(ee){R=ee},setClear:function(ee){We!==ee&&(e.clearStencil(ee),We=ee)},reset:function(){R=!1,nt=null,z=null,Y=null,ct=null,ot=null,It=null,Se=null,We=null}}}const s=new n,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,m=[],_=null,v=!1,p=null,f=null,b=null,T=null,y=null,B=null,C=null,A=new Zt(0,0,0),I=0,S=!1,M=null,w=null,V=null,k=null,j=null;const K=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,$=0;const H=e.getParameter(e.VERSION);H.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=$>=1):H.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=$>=2);let it=null,lt={};const Tt=e.getParameter(e.SCISSOR_BOX),kt=e.getParameter(e.VIEWPORT),oe=new we().fromArray(Tt),W=new we().fromArray(kt);function tt(R,nt,z,Y){const ct=new Uint8Array(4),ot=e.createTexture();e.bindTexture(R,ot),e.texParameteri(R,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(R,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let It=0;It<z;It++)R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY?e.texImage3D(nt,0,e.RGBA,1,1,Y,0,e.RGBA,e.UNSIGNED_BYTE,ct):e.texImage2D(nt+It,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ct);return ot}const xt={};xt[e.TEXTURE_2D]=tt(e.TEXTURE_2D,e.TEXTURE_2D,1),xt[e.TEXTURE_CUBE_MAP]=tt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[e.TEXTURE_2D_ARRAY]=tt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),xt[e.TEXTURE_3D]=tt(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(e.DEPTH_TEST),o.setFunc(es),Ht(!1),Gt(Zh),rt(e.CULL_FACE),D(Vi);function rt(R){h[R]!==!0&&(e.enable(R),h[R]=!0)}function Ct(R){h[R]!==!1&&(e.disable(R),h[R]=!1)}function Dt(R,nt){return u[R]!==nt?(e.bindFramebuffer(R,nt),u[R]=nt,R===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=nt),R===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=nt),!0):!1}function zt(R,nt){let z=m,Y=!1;if(R){z=d.get(nt),z===void 0&&(z=[],d.set(nt,z));const ct=R.textures;if(z.length!==ct.length||z[0]!==e.COLOR_ATTACHMENT0){for(let ot=0,It=ct.length;ot<It;ot++)z[ot]=e.COLOR_ATTACHMENT0+ot;z.length=ct.length,Y=!0}}else z[0]!==e.BACK&&(z[0]=e.BACK,Y=!0);Y&&e.drawBuffers(z)}function ge(R){return _!==R?(e.useProgram(R),_=R,!0):!1}const Xt={[ar]:e.FUNC_ADD,[i0]:e.FUNC_SUBTRACT,[r0]:e.FUNC_REVERSE_SUBTRACT};Xt[s0]=e.MIN,Xt[o0]=e.MAX;const be={[a0]:e.ZERO,[c0]:e.ONE,[l0]:e.SRC_COLOR,[Rc]:e.SRC_ALPHA,[m0]:e.SRC_ALPHA_SATURATE,[f0]:e.DST_COLOR,[u0]:e.DST_ALPHA,[h0]:e.ONE_MINUS_SRC_COLOR,[Cc]:e.ONE_MINUS_SRC_ALPHA,[p0]:e.ONE_MINUS_DST_COLOR,[d0]:e.ONE_MINUS_DST_ALPHA,[_0]:e.CONSTANT_COLOR,[g0]:e.ONE_MINUS_CONSTANT_COLOR,[v0]:e.CONSTANT_ALPHA,[x0]:e.ONE_MINUS_CONSTANT_ALPHA};function D(R,nt,z,Y,ct,ot,It,Se,We,ee){if(R===Vi){v===!0&&(Ct(e.BLEND),v=!1);return}if(v===!1&&(rt(e.BLEND),v=!0),R!==n0){if(R!==p||ee!==S){if((f!==ar||y!==ar)&&(e.blendEquation(e.FUNC_ADD),f=ar,y=ar),ee)switch(R){case Zr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case wc:e.blendFunc(e.ONE,e.ONE);break;case $h:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Jh:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Zr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case wc:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case $h:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Jh:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}b=null,T=null,B=null,C=null,A.set(0,0,0),I=0,p=R,S=ee}return}ct=ct||nt,ot=ot||z,It=It||Y,(nt!==f||ct!==y)&&(e.blendEquationSeparate(Xt[nt],Xt[ct]),f=nt,y=ct),(z!==b||Y!==T||ot!==B||It!==C)&&(e.blendFuncSeparate(be[z],be[Y],be[ot],be[It]),b=z,T=Y,B=ot,C=It),(Se.equals(A)===!1||We!==I)&&(e.blendColor(Se.r,Se.g,Se.b,We),A.copy(Se),I=We),p=R,S=!1}function bn(R,nt){R.side===vi?Ct(e.CULL_FACE):rt(e.CULL_FACE);let z=R.side===tn;nt&&(z=!z),Ht(z),R.blending===Zr&&R.transparent===!1?D(Vi):D(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),s.setMask(R.colorWrite);const Y=R.stencilWrite;a.setTest(Y),Y&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),ue(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?rt(e.SAMPLE_ALPHA_TO_COVERAGE):Ct(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(R){M!==R&&(R?e.frontFace(e.CW):e.frontFace(e.CCW),M=R)}function Gt(R){R!==Qm?(rt(e.CULL_FACE),R!==w&&(R===Zh?e.cullFace(e.BACK):R===t0?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ct(e.CULL_FACE),w=R}function wt(R){R!==V&&(X&&e.lineWidth(R),V=R)}function ue(R,nt,z){R?(rt(e.POLYGON_OFFSET_FILL),(k!==nt||j!==z)&&(e.polygonOffset(nt,z),k=nt,j=z)):Ct(e.POLYGON_OFFSET_FILL)}function At(R){R?rt(e.SCISSOR_TEST):Ct(e.SCISSOR_TEST)}function E(R){R===void 0&&(R=e.TEXTURE0+K-1),it!==R&&(e.activeTexture(R),it=R)}function g(R,nt,z){z===void 0&&(it===null?z=e.TEXTURE0+K-1:z=it);let Y=lt[z];Y===void 0&&(Y={type:void 0,texture:void 0},lt[z]=Y),(Y.type!==R||Y.texture!==nt)&&(it!==z&&(e.activeTexture(z),it=z),e.bindTexture(R,nt||xt[R]),Y.type=R,Y.texture=nt)}function N(){const R=lt[it];R!==void 0&&R.type!==void 0&&(e.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function q(){try{e.compressedTexImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{e.compressedTexImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function G(){try{e.texSubImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function yt(){try{e.texSubImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function st(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ht(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function qt(){try{e.texStorage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function J(){try{e.texStorage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function dt(){try{e.texImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Rt(){try{e.texImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Pt(R){oe.equals(R)===!1&&(e.scissor(R.x,R.y,R.z,R.w),oe.copy(R))}function ft(R){W.equals(R)===!1&&(e.viewport(R.x,R.y,R.z,R.w),W.copy(R))}function Vt(R,nt){let z=l.get(nt);z===void 0&&(z=new WeakMap,l.set(nt,z));let Y=z.get(R);Y===void 0&&(Y=e.getUniformBlockIndex(nt,R.name),z.set(R,Y))}function Ft(R,nt){const Y=l.get(nt).get(R);c.get(nt)!==Y&&(e.uniformBlockBinding(nt,Y,R.__bindingPointIndex),c.set(nt,Y))}function ce(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),h={},it=null,lt={},u={},d=new WeakMap,m=[],_=null,v=!1,p=null,f=null,b=null,T=null,y=null,B=null,C=null,A=new Zt(0,0,0),I=0,S=!1,M=null,w=null,V=null,k=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),W.set(0,0,e.canvas.width,e.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:rt,disable:Ct,bindFramebuffer:Dt,drawBuffers:zt,useProgram:ge,setBlending:D,setMaterial:bn,setFlipSided:Ht,setCullFace:Gt,setLineWidth:wt,setPolygonOffset:ue,setScissorTest:At,activeTexture:E,bindTexture:g,unbindTexture:N,compressedTexImage2D:q,compressedTexImage3D:Z,texImage2D:dt,texImage3D:Rt,updateUBOMapping:Vt,uniformBlockBinding:Ft,texStorage2D:qt,texStorage3D:J,texSubImage2D:G,texSubImage3D:yt,compressedTexSubImage2D:st,compressedTexSubImage3D:ht,scissor:Pt,viewport:ft,reset:ce}}function qu(e,t,n,i){const r=Wv(i);switch(n){case gf:return e*t;case xf:return e*t;case Mf:return e*t*2;case yf:return e*t/r.components*r.byteLength;case Bl:return e*t/r.components*r.byteLength;case Sf:return e*t*2/r.components*r.byteLength;case kl:return e*t*2/r.components*r.byteLength;case vf:return e*t*3/r.components*r.byteLength;case Gn:return e*t*4/r.components*r.byteLength;case zl:return e*t*4/r.components*r.byteLength;case jo:case Ko:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Zo:case $o:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Gc:case Wc:return Math.max(e,16)*Math.max(t,8)/4;case Hc:case Vc:return Math.max(e,8)*Math.max(t,8)/2;case Xc:case qc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Yc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Kc:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Zc:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case $c:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Jc:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Qc:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case tl:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case el:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case nl:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case il:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case rl:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case sl:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ol:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case al:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Jo:case cl:case ll:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ef:case hl:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ul:case dl:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Wv(e){switch(e){case Ei:case pf:return{byteLength:1,components:1};case Ys:case mf:case Qs:return{byteLength:2,components:1};case Fl:case Ol:return{byteLength:2,components:4};case xr:case Nl:case Mi:return{byteLength:4,components:1};case _f:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function Xv(e,t,n,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Bt,h=new WeakMap;let u;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,g){return m?new OffscreenCanvas(E,g):ra("canvas")}function v(E,g,N){let q=1;const Z=At(E);if((Z.width>N||Z.height>N)&&(q=N/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const G=Math.floor(q*Z.width),yt=Math.floor(q*Z.height);u===void 0&&(u=_(G,yt));const st=g?_(G,yt):u;return st.width=G,st.height=yt,st.getContext("2d").drawImage(E,0,0,G,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+G+"x"+yt+")."),st}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function p(E){return E.generateMipmaps}function f(E){e.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?e.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function T(E,g,N,q,Z=!1){if(E!==null){if(e[E]!==void 0)return e[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let G=g;if(g===e.RED&&(N===e.FLOAT&&(G=e.R32F),N===e.HALF_FLOAT&&(G=e.R16F),N===e.UNSIGNED_BYTE&&(G=e.R8)),g===e.RED_INTEGER&&(N===e.UNSIGNED_BYTE&&(G=e.R8UI),N===e.UNSIGNED_SHORT&&(G=e.R16UI),N===e.UNSIGNED_INT&&(G=e.R32UI),N===e.BYTE&&(G=e.R8I),N===e.SHORT&&(G=e.R16I),N===e.INT&&(G=e.R32I)),g===e.RG&&(N===e.FLOAT&&(G=e.RG32F),N===e.HALF_FLOAT&&(G=e.RG16F),N===e.UNSIGNED_BYTE&&(G=e.RG8)),g===e.RG_INTEGER&&(N===e.UNSIGNED_BYTE&&(G=e.RG8UI),N===e.UNSIGNED_SHORT&&(G=e.RG16UI),N===e.UNSIGNED_INT&&(G=e.RG32UI),N===e.BYTE&&(G=e.RG8I),N===e.SHORT&&(G=e.RG16I),N===e.INT&&(G=e.RG32I)),g===e.RGB_INTEGER&&(N===e.UNSIGNED_BYTE&&(G=e.RGB8UI),N===e.UNSIGNED_SHORT&&(G=e.RGB16UI),N===e.UNSIGNED_INT&&(G=e.RGB32UI),N===e.BYTE&&(G=e.RGB8I),N===e.SHORT&&(G=e.RGB16I),N===e.INT&&(G=e.RGB32I)),g===e.RGBA_INTEGER&&(N===e.UNSIGNED_BYTE&&(G=e.RGBA8UI),N===e.UNSIGNED_SHORT&&(G=e.RGBA16UI),N===e.UNSIGNED_INT&&(G=e.RGBA32UI),N===e.BYTE&&(G=e.RGBA8I),N===e.SHORT&&(G=e.RGBA16I),N===e.INT&&(G=e.RGBA32I)),g===e.RGB&&N===e.UNSIGNED_INT_5_9_9_9_REV&&(G=e.RGB9_E5),g===e.RGBA){const yt=Z?fa:Yt.getTransfer(q);N===e.FLOAT&&(G=e.RGBA32F),N===e.HALF_FLOAT&&(G=e.RGBA16F),N===e.UNSIGNED_BYTE&&(G=yt===ie?e.SRGB8_ALPHA8:e.RGBA8),N===e.UNSIGNED_SHORT_4_4_4_4&&(G=e.RGBA4),N===e.UNSIGNED_SHORT_5_5_5_1&&(G=e.RGB5_A1)}return(G===e.R16F||G===e.R32F||G===e.RG16F||G===e.RG32F||G===e.RGBA16F||G===e.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function y(E,g){let N;return E?g===null||g===xr||g===rs?N=e.DEPTH24_STENCIL8:g===Mi?N=e.DEPTH32F_STENCIL8:g===Ys&&(N=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===xr||g===rs?N=e.DEPTH_COMPONENT24:g===Mi?N=e.DEPTH_COMPONENT32F:g===Ys&&(N=e.DEPTH_COMPONENT16),N}function B(E,g){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Vn&&E.minFilter!==Qn?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function C(E){const g=E.target;g.removeEventListener("dispose",C),I(g),g.isVideoTexture&&h.delete(g)}function A(E){const g=E.target;g.removeEventListener("dispose",A),M(g)}function I(E){const g=i.get(E);if(g.__webglInit===void 0)return;const N=E.source,q=d.get(N);if(q){const Z=q[g.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(E),Object.keys(q).length===0&&d.delete(N)}i.remove(E)}function S(E){const g=i.get(E);e.deleteTexture(g.__webglTexture);const N=E.source,q=d.get(N);delete q[g.__cacheKey],o.memory.textures--}function M(E){const g=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(g.__webglFramebuffer[q]))for(let Z=0;Z<g.__webglFramebuffer[q].length;Z++)e.deleteFramebuffer(g.__webglFramebuffer[q][Z]);else e.deleteFramebuffer(g.__webglFramebuffer[q]);g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer[q])}else{if(Array.isArray(g.__webglFramebuffer))for(let q=0;q<g.__webglFramebuffer.length;q++)e.deleteFramebuffer(g.__webglFramebuffer[q]);else e.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&e.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&e.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let q=0;q<g.__webglColorRenderbuffer.length;q++)g.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(g.__webglColorRenderbuffer[q]);g.__webglDepthRenderbuffer&&e.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=E.textures;for(let q=0,Z=N.length;q<Z;q++){const G=i.get(N[q]);G.__webglTexture&&(e.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(N[q])}i.remove(E)}let w=0;function V(){w=0}function k(){const E=w;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),w+=1,E}function j(E){const g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function K(E,g){const N=i.get(E);if(E.isVideoTexture&&wt(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const q=E.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(N,E,g);return}}n.bindTexture(e.TEXTURE_2D,N.__webglTexture,e.TEXTURE0+g)}function X(E,g){const N=i.get(E);if(E.version>0&&N.__version!==E.version){W(N,E,g);return}n.bindTexture(e.TEXTURE_2D_ARRAY,N.__webglTexture,e.TEXTURE0+g)}function $(E,g){const N=i.get(E);if(E.version>0&&N.__version!==E.version){W(N,E,g);return}n.bindTexture(e.TEXTURE_3D,N.__webglTexture,e.TEXTURE0+g)}function H(E,g){const N=i.get(E);if(E.version>0&&N.__version!==E.version){tt(N,E,g);return}n.bindTexture(e.TEXTURE_CUBE_MAP,N.__webglTexture,e.TEXTURE0+g)}const it={[kc]:e.REPEAT,[hr]:e.CLAMP_TO_EDGE,[zc]:e.MIRRORED_REPEAT},lt={[Vn]:e.NEAREST,[C0]:e.NEAREST_MIPMAP_NEAREST,[mo]:e.NEAREST_MIPMAP_LINEAR,[Qn]:e.LINEAR,[Ha]:e.LINEAR_MIPMAP_NEAREST,[ur]:e.LINEAR_MIPMAP_LINEAR},Tt={[U0]:e.NEVER,[z0]:e.ALWAYS,[N0]:e.LESS,[Tf]:e.LEQUAL,[F0]:e.EQUAL,[k0]:e.GEQUAL,[O0]:e.GREATER,[B0]:e.NOTEQUAL};function kt(E,g){if(g.type===Mi&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Qn||g.magFilter===Ha||g.magFilter===mo||g.magFilter===ur||g.minFilter===Qn||g.minFilter===Ha||g.minFilter===mo||g.minFilter===ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(E,e.TEXTURE_WRAP_S,it[g.wrapS]),e.texParameteri(E,e.TEXTURE_WRAP_T,it[g.wrapT]),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,it[g.wrapR]),e.texParameteri(E,e.TEXTURE_MAG_FILTER,lt[g.magFilter]),e.texParameteri(E,e.TEXTURE_MIN_FILTER,lt[g.minFilter]),g.compareFunction&&(e.texParameteri(E,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(E,e.TEXTURE_COMPARE_FUNC,Tt[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Vn||g.minFilter!==mo&&g.minFilter!==ur||g.type===Mi&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");e.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function oe(E,g){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",C));const q=g.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const G=j(g);if(G!==E.__cacheKey){Z[G]===void 0&&(Z[G]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Z[G].usedTimes++;const yt=Z[E.__cacheKey];yt!==void 0&&(Z[E.__cacheKey].usedTimes--,yt.usedTimes===0&&S(g)),E.__cacheKey=G,E.__webglTexture=Z[G].texture}return N}function W(E,g,N){let q=e.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),g.isData3DTexture&&(q=e.TEXTURE_3D);const Z=oe(E,g),G=g.source;n.bindTexture(q,E.__webglTexture,e.TEXTURE0+N);const yt=i.get(G);if(G.version!==yt.__version||Z===!0){n.activeTexture(e.TEXTURE0+N);const st=Yt.getPrimaries(Yt.workingColorSpace),ht=g.colorSpace===Hi?null:Yt.getPrimaries(g.colorSpace),qt=g.colorSpace===Hi||st===ht?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let J=v(g.image,!1,r.maxTextureSize);J=ue(g,J);const dt=s.convert(g.format,g.colorSpace),Rt=s.convert(g.type);let Pt=T(g.internalFormat,dt,Rt,g.colorSpace,g.isVideoTexture);kt(q,g);let ft;const Vt=g.mipmaps,Ft=g.isVideoTexture!==!0,ce=yt.__version===void 0||Z===!0,R=G.dataReady,nt=B(g,J);if(g.isDepthTexture)Pt=y(g.format===ss,g.type),ce&&(Ft?n.texStorage2D(e.TEXTURE_2D,1,Pt,J.width,J.height):n.texImage2D(e.TEXTURE_2D,0,Pt,J.width,J.height,0,dt,Rt,null));else if(g.isDataTexture)if(Vt.length>0){Ft&&ce&&n.texStorage2D(e.TEXTURE_2D,nt,Pt,Vt[0].width,Vt[0].height);for(let z=0,Y=Vt.length;z<Y;z++)ft=Vt[z],Ft?R&&n.texSubImage2D(e.TEXTURE_2D,z,0,0,ft.width,ft.height,dt,Rt,ft.data):n.texImage2D(e.TEXTURE_2D,z,Pt,ft.width,ft.height,0,dt,Rt,ft.data);g.generateMipmaps=!1}else Ft?(ce&&n.texStorage2D(e.TEXTURE_2D,nt,Pt,J.width,J.height),R&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,J.width,J.height,dt,Rt,J.data)):n.texImage2D(e.TEXTURE_2D,0,Pt,J.width,J.height,0,dt,Rt,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ft&&ce&&n.texStorage3D(e.TEXTURE_2D_ARRAY,nt,Pt,Vt[0].width,Vt[0].height,J.depth);for(let z=0,Y=Vt.length;z<Y;z++)if(ft=Vt[z],g.format!==Gn)if(dt!==null)if(Ft){if(R)if(g.layerUpdates.size>0){const ct=qu(ft.width,ft.height,g.format,g.type);for(const ot of g.layerUpdates){const It=ft.data.subarray(ot*ct/ft.data.BYTES_PER_ELEMENT,(ot+1)*ct/ft.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,z,0,0,ot,ft.width,ft.height,1,dt,It)}g.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,z,0,0,0,ft.width,ft.height,J.depth,dt,ft.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,z,Pt,ft.width,ft.height,J.depth,0,ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?R&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,z,0,0,0,ft.width,ft.height,J.depth,dt,Rt,ft.data):n.texImage3D(e.TEXTURE_2D_ARRAY,z,Pt,ft.width,ft.height,J.depth,0,dt,Rt,ft.data)}else{Ft&&ce&&n.texStorage2D(e.TEXTURE_2D,nt,Pt,Vt[0].width,Vt[0].height);for(let z=0,Y=Vt.length;z<Y;z++)ft=Vt[z],g.format!==Gn?dt!==null?Ft?R&&n.compressedTexSubImage2D(e.TEXTURE_2D,z,0,0,ft.width,ft.height,dt,ft.data):n.compressedTexImage2D(e.TEXTURE_2D,z,Pt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?R&&n.texSubImage2D(e.TEXTURE_2D,z,0,0,ft.width,ft.height,dt,Rt,ft.data):n.texImage2D(e.TEXTURE_2D,z,Pt,ft.width,ft.height,0,dt,Rt,ft.data)}else if(g.isDataArrayTexture)if(Ft){if(ce&&n.texStorage3D(e.TEXTURE_2D_ARRAY,nt,Pt,J.width,J.height,J.depth),R)if(g.layerUpdates.size>0){const z=qu(J.width,J.height,g.format,g.type);for(const Y of g.layerUpdates){const ct=J.data.subarray(Y*z/J.data.BYTES_PER_ELEMENT,(Y+1)*z/J.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,Y,J.width,J.height,1,dt,Rt,ct)}g.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,dt,Rt,J.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Pt,J.width,J.height,J.depth,0,dt,Rt,J.data);else if(g.isData3DTexture)Ft?(ce&&n.texStorage3D(e.TEXTURE_3D,nt,Pt,J.width,J.height,J.depth),R&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,dt,Rt,J.data)):n.texImage3D(e.TEXTURE_3D,0,Pt,J.width,J.height,J.depth,0,dt,Rt,J.data);else if(g.isFramebufferTexture){if(ce)if(Ft)n.texStorage2D(e.TEXTURE_2D,nt,Pt,J.width,J.height);else{let z=J.width,Y=J.height;for(let ct=0;ct<nt;ct++)n.texImage2D(e.TEXTURE_2D,ct,Pt,z,Y,0,dt,Rt,null),z>>=1,Y>>=1}}else if(Vt.length>0){if(Ft&&ce){const z=At(Vt[0]);n.texStorage2D(e.TEXTURE_2D,nt,Pt,z.width,z.height)}for(let z=0,Y=Vt.length;z<Y;z++)ft=Vt[z],Ft?R&&n.texSubImage2D(e.TEXTURE_2D,z,0,0,dt,Rt,ft):n.texImage2D(e.TEXTURE_2D,z,Pt,dt,Rt,ft);g.generateMipmaps=!1}else if(Ft){if(ce){const z=At(J);n.texStorage2D(e.TEXTURE_2D,nt,Pt,z.width,z.height)}R&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,dt,Rt,J)}else n.texImage2D(e.TEXTURE_2D,0,Pt,dt,Rt,J);p(g)&&f(q),yt.__version=G.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function tt(E,g,N){if(g.image.length!==6)return;const q=oe(E,g),Z=g.source;n.bindTexture(e.TEXTURE_CUBE_MAP,E.__webglTexture,e.TEXTURE0+N);const G=i.get(Z);if(Z.version!==G.__version||q===!0){n.activeTexture(e.TEXTURE0+N);const yt=Yt.getPrimaries(Yt.workingColorSpace),st=g.colorSpace===Hi?null:Yt.getPrimaries(g.colorSpace),ht=g.colorSpace===Hi||yt===st?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const qt=g.isCompressedTexture||g.image[0].isCompressedTexture,J=g.image[0]&&g.image[0].isDataTexture,dt=[];for(let Y=0;Y<6;Y++)!qt&&!J?dt[Y]=v(g.image[Y],!0,r.maxCubemapSize):dt[Y]=J?g.image[Y].image:g.image[Y],dt[Y]=ue(g,dt[Y]);const Rt=dt[0],Pt=s.convert(g.format,g.colorSpace),ft=s.convert(g.type),Vt=T(g.internalFormat,Pt,ft,g.colorSpace),Ft=g.isVideoTexture!==!0,ce=G.__version===void 0||q===!0,R=Z.dataReady;let nt=B(g,Rt);kt(e.TEXTURE_CUBE_MAP,g);let z;if(qt){Ft&&ce&&n.texStorage2D(e.TEXTURE_CUBE_MAP,nt,Vt,Rt.width,Rt.height);for(let Y=0;Y<6;Y++){z=dt[Y].mipmaps;for(let ct=0;ct<z.length;ct++){const ot=z[ct];g.format!==Gn?Pt!==null?Ft?R&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct,0,0,ot.width,ot.height,Pt,ot.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct,Vt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct,0,0,ot.width,ot.height,Pt,ft,ot.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct,Vt,ot.width,ot.height,0,Pt,ft,ot.data)}}}else{if(z=g.mipmaps,Ft&&ce){z.length>0&&nt++;const Y=At(dt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,nt,Vt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(J){Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,dt[Y].width,dt[Y].height,Pt,ft,dt[Y].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Vt,dt[Y].width,dt[Y].height,0,Pt,ft,dt[Y].data);for(let ct=0;ct<z.length;ct++){const It=z[ct].image[Y].image;Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct+1,0,0,It.width,It.height,Pt,ft,It.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct+1,Vt,It.width,It.height,0,Pt,ft,It.data)}}else{Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Pt,ft,dt[Y]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Vt,Pt,ft,dt[Y]);for(let ct=0;ct<z.length;ct++){const ot=z[ct];Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct+1,0,0,Pt,ft,ot.image[Y]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ct+1,Vt,Pt,ft,ot.image[Y])}}}p(g)&&f(e.TEXTURE_CUBE_MAP),G.__version=Z.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function xt(E,g,N,q,Z,G){const yt=s.convert(N.format,N.colorSpace),st=s.convert(N.type),ht=T(N.internalFormat,yt,st,N.colorSpace),qt=i.get(g),J=i.get(N);if(J.__renderTarget=g,!qt.__hasExternalTextures){const dt=Math.max(1,g.width>>G),Rt=Math.max(1,g.height>>G);Z===e.TEXTURE_3D||Z===e.TEXTURE_2D_ARRAY?n.texImage3D(Z,G,ht,dt,Rt,g.depth,0,yt,st,null):n.texImage2D(Z,G,ht,dt,Rt,0,yt,st,null)}n.bindFramebuffer(e.FRAMEBUFFER,E),Gt(g)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,Z,J.__webglTexture,0,Ht(g)):(Z===e.TEXTURE_2D||Z>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,Z,J.__webglTexture,G),n.bindFramebuffer(e.FRAMEBUFFER,null)}function rt(E,g,N){if(e.bindRenderbuffer(e.RENDERBUFFER,E),g.depthBuffer){const q=g.depthTexture,Z=q&&q.isDepthTexture?q.type:null,G=y(g.stencilBuffer,Z),yt=g.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=Ht(g);Gt(g)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,st,G,g.width,g.height):N?e.renderbufferStorageMultisample(e.RENDERBUFFER,st,G,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,G,g.width,g.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,yt,e.RENDERBUFFER,E)}else{const q=g.textures;for(let Z=0;Z<q.length;Z++){const G=q[Z],yt=s.convert(G.format,G.colorSpace),st=s.convert(G.type),ht=T(G.internalFormat,yt,st,G.colorSpace),qt=Ht(g);N&&Gt(g)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,qt,ht,g.width,g.height):Gt(g)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,qt,ht,g.width,g.height):e.renderbufferStorage(e.RENDERBUFFER,ht,g.width,g.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ct(E,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(g.depthTexture);q.__renderTarget=g,(!q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K(g.depthTexture,0);const Z=q.__webglTexture,G=Ht(g);if(g.depthTexture.format===$r)Gt(g)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Z,0);else if(g.depthTexture.format===ss)Gt(g)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Dt(E){const g=i.get(E),N=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){const q=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),q){const Z=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),g.__depthDisposeCallback=Z}g.__boundDepthTexture=q}if(E.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ct(g.__webglFramebuffer,E)}else if(N){g.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer[q]),g.__webglDepthbuffer[q]===void 0)g.__webglDepthbuffer[q]=e.createRenderbuffer(),rt(g.__webglDepthbuffer[q],E,!1);else{const Z=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=g.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,G)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=e.createRenderbuffer(),rt(g.__webglDepthbuffer,E,!1);else{const q=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Z=g.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Z),e.framebufferRenderbuffer(e.FRAMEBUFFER,q,e.RENDERBUFFER,Z)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function zt(E,g,N){const q=i.get(E);g!==void 0&&xt(q.__webglFramebuffer,E,E.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),N!==void 0&&Dt(E)}function ge(E){const g=E.texture,N=i.get(E),q=i.get(g);E.addEventListener("dispose",A);const Z=E.textures,G=E.isWebGLCubeRenderTarget===!0,yt=Z.length>1;if(yt||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=g.version,o.memory.textures++),G){N.__webglFramebuffer=[];for(let st=0;st<6;st++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[st]=[];for(let ht=0;ht<g.mipmaps.length;ht++)N.__webglFramebuffer[st][ht]=e.createFramebuffer()}else N.__webglFramebuffer[st]=e.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let st=0;st<g.mipmaps.length;st++)N.__webglFramebuffer[st]=e.createFramebuffer()}else N.__webglFramebuffer=e.createFramebuffer();if(yt)for(let st=0,ht=Z.length;st<ht;st++){const qt=i.get(Z[st]);qt.__webglTexture===void 0&&(qt.__webglTexture=e.createTexture(),o.memory.textures++)}if(E.samples>0&&Gt(E)===!1){N.__webglMultisampledFramebuffer=e.createFramebuffer(),N.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let st=0;st<Z.length;st++){const ht=Z[st];N.__webglColorRenderbuffer[st]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,N.__webglColorRenderbuffer[st]);const qt=s.convert(ht.format,ht.colorSpace),J=s.convert(ht.type),dt=T(ht.internalFormat,qt,J,ht.colorSpace,E.isXRRenderTarget===!0),Rt=Ht(E);e.renderbufferStorageMultisample(e.RENDERBUFFER,Rt,dt,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+st,e.RENDERBUFFER,N.__webglColorRenderbuffer[st])}e.bindRenderbuffer(e.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=e.createRenderbuffer(),rt(N.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(G){n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),kt(e.TEXTURE_CUBE_MAP,g);for(let st=0;st<6;st++)if(g.mipmaps&&g.mipmaps.length>0)for(let ht=0;ht<g.mipmaps.length;ht++)xt(N.__webglFramebuffer[st][ht],E,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht);else xt(N.__webglFramebuffer[st],E,g,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);p(g)&&f(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(yt){for(let st=0,ht=Z.length;st<ht;st++){const qt=Z[st],J=i.get(qt);n.bindTexture(e.TEXTURE_2D,J.__webglTexture),kt(e.TEXTURE_2D,qt),xt(N.__webglFramebuffer,E,qt,e.COLOR_ATTACHMENT0+st,e.TEXTURE_2D,0),p(qt)&&f(e.TEXTURE_2D)}n.unbindTexture()}else{let st=e.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(st=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(st,q.__webglTexture),kt(st,g),g.mipmaps&&g.mipmaps.length>0)for(let ht=0;ht<g.mipmaps.length;ht++)xt(N.__webglFramebuffer[ht],E,g,e.COLOR_ATTACHMENT0,st,ht);else xt(N.__webglFramebuffer,E,g,e.COLOR_ATTACHMENT0,st,0);p(g)&&f(st),n.unbindTexture()}E.depthBuffer&&Dt(E)}function Xt(E){const g=E.textures;for(let N=0,q=g.length;N<q;N++){const Z=g[N];if(p(Z)){const G=b(E),yt=i.get(Z).__webglTexture;n.bindTexture(G,yt),f(G),n.unbindTexture()}}}const be=[],D=[];function bn(E){if(E.samples>0){if(Gt(E)===!1){const g=E.textures,N=E.width,q=E.height;let Z=e.COLOR_BUFFER_BIT;const G=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,yt=i.get(E),st=g.length>1;if(st)for(let ht=0;ht<g.length;ht++)n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let ht=0;ht<g.length;ht++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=e.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=e.STENCIL_BUFFER_BIT)),st){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,yt.__webglColorRenderbuffer[ht]);const qt=i.get(g[ht]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,qt,0)}e.blitFramebuffer(0,0,N,q,0,0,N,q,Z,e.NEAREST),c===!0&&(be.length=0,D.length=0,be.push(e.COLOR_ATTACHMENT0+ht),E.depthBuffer&&E.resolveDepthBuffer===!1&&(be.push(G),D.push(G),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,D)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,be))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),st)for(let ht=0;ht<g.length;ht++){n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,yt.__webglColorRenderbuffer[ht]);const qt=i.get(g[ht]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,yt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,qt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const g=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[g])}}}function Ht(E){return Math.min(r.maxSamples,E.samples)}function Gt(E){const g=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function wt(E){const g=o.render.frame;h.get(E)!==g&&(h.set(E,g),E.update())}function ue(E,g){const N=E.colorSpace,q=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==vs&&N!==Hi&&(Yt.getTransfer(N)===ie?(q!==Gn||Z!==Ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function At(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=V,this.setTexture2D=K,this.setTexture2DArray=X,this.setTexture3D=$,this.setTextureCube=H,this.rebindTextures=zt,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=Xt,this.updateMultisampleRenderTarget=bn,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Gt}function qv(e,t){function n(i,r=Hi){let s;const o=Yt.getTransfer(r);if(i===Ei)return e.UNSIGNED_BYTE;if(i===Fl)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ol)return e.UNSIGNED_SHORT_5_5_5_1;if(i===_f)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===pf)return e.BYTE;if(i===mf)return e.SHORT;if(i===Ys)return e.UNSIGNED_SHORT;if(i===Nl)return e.INT;if(i===xr)return e.UNSIGNED_INT;if(i===Mi)return e.FLOAT;if(i===Qs)return e.HALF_FLOAT;if(i===gf)return e.ALPHA;if(i===vf)return e.RGB;if(i===Gn)return e.RGBA;if(i===xf)return e.LUMINANCE;if(i===Mf)return e.LUMINANCE_ALPHA;if(i===$r)return e.DEPTH_COMPONENT;if(i===ss)return e.DEPTH_STENCIL;if(i===yf)return e.RED;if(i===Bl)return e.RED_INTEGER;if(i===Sf)return e.RG;if(i===kl)return e.RG_INTEGER;if(i===zl)return e.RGBA_INTEGER;if(i===jo||i===Ko||i===Zo||i===$o)if(o===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===jo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ko)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===$o)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===jo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ko)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===$o)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Hc||i===Gc||i===Vc||i===Wc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Hc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Gc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xc||i===qc||i===Yc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Xc||i===qc)return o===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Yc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===jc||i===Kc||i===Zc||i===$c||i===Jc||i===Qc||i===tl||i===el||i===nl||i===il||i===rl||i===sl||i===ol||i===al)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===jc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Kc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===$c)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Jc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tl)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===el)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===nl)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===il)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===rl)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===sl)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ol)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===al)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Jo||i===cl||i===ll)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Jo)return o===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ll)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ef||i===hl||i===ul||i===dl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Jo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===hl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ul)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===dl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rs?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}class Yv extends Dn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Fo extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jv={type:"move"};class mc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const p=n.getJointPose(v,i),f=this._getHandJoint(l,v);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,_=.005;l.inputState.pinching&&d>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(jv)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new Fo;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const Kv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $v{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){const r=new en,s=t.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Yi({vertexShader:Kv,fragmentShader:Zv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ti(new ma(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jv extends br{constructor(t,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,_=null;const v=new $v,p=n.getContextAttributes();let f=null,b=null;const T=[],y=[],B=new Bt;let C=null;const A=new Dn;A.viewport=new we;const I=new Dn;I.viewport=new we;const S=[A,I],M=new Yv;let w=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let tt=T[W];return tt===void 0&&(tt=new mc,T[W]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(W){let tt=T[W];return tt===void 0&&(tt=new mc,T[W]=tt),tt.getGripSpace()},this.getHand=function(W){let tt=T[W];return tt===void 0&&(tt=new mc,T[W]=tt),tt.getHandSpace()};function k(W){const tt=y.indexOf(W.inputSource);if(tt===-1)return;const xt=T[tt];xt!==void 0&&(xt.update(W.inputSource,W.frame,l||o),xt.dispatchEvent({type:W.type,data:W.inputSource}))}function j(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",K);for(let W=0;W<T.length;W++){const tt=y[W];tt!==null&&(y[W]=null,T[W].disconnect(tt))}w=null,V=null,v.reset(),t.setRenderTarget(f),m=null,d=null,u=null,r=null,b=null,oe.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(B.width,B.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(f=t.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",j),r.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await n.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(B),r.renderState.layers===void 0){const tt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,tt),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new Mr(m.framebufferWidth,m.framebufferHeight,{format:Gn,type:Ei,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let tt=null,xt=null,rt=null;p.depth&&(rt=p.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,tt=p.stencil?ss:$r,xt=p.stencil?rs:xr);const Ct={colorFormat:n.RGBA8,depthFormat:rt,scaleFactor:s};u=new XRWebGLBinding(r,n),d=u.createProjectionLayer(Ct),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new Mr(d.textureWidth,d.textureHeight,{format:Gn,type:Ei,depthTexture:new Of(d.textureWidth,d.textureHeight,xt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),oe.setContext(r),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K(W){for(let tt=0;tt<W.removed.length;tt++){const xt=W.removed[tt],rt=y.indexOf(xt);rt>=0&&(y[rt]=null,T[rt].disconnect(xt))}for(let tt=0;tt<W.added.length;tt++){const xt=W.added[tt];let rt=y.indexOf(xt);if(rt===-1){for(let Dt=0;Dt<T.length;Dt++)if(Dt>=y.length){y.push(xt),rt=Dt;break}else if(y[Dt]===null){y[Dt]=xt,rt=Dt;break}if(rt===-1)break}const Ct=T[rt];Ct&&Ct.connect(xt)}}const X=new U,$=new U;function H(W,tt,xt){X.setFromMatrixPosition(tt.matrixWorld),$.setFromMatrixPosition(xt.matrixWorld);const rt=X.distanceTo($),Ct=tt.projectionMatrix.elements,Dt=xt.projectionMatrix.elements,zt=Ct[14]/(Ct[10]-1),ge=Ct[14]/(Ct[10]+1),Xt=(Ct[9]+1)/Ct[5],be=(Ct[9]-1)/Ct[5],D=(Ct[8]-1)/Ct[0],bn=(Dt[8]+1)/Dt[0],Ht=zt*D,Gt=zt*bn,wt=rt/(-D+bn),ue=wt*-D;if(tt.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ue),W.translateZ(wt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ct[10]===-1)W.projectionMatrix.copy(tt.projectionMatrix),W.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const At=zt+wt,E=ge+wt,g=Ht-ue,N=Gt+(rt-ue),q=Xt*ge/E*At,Z=be*ge/E*At;W.projectionMatrix.makePerspective(g,N,q,Z,At,E),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function it(W,tt){tt===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(tt.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let tt=W.near,xt=W.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(xt=v.depthFar)),M.near=I.near=A.near=tt,M.far=I.far=A.far=xt,(w!==M.near||V!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,V=M.far),A.layers.mask=W.layers.mask|2,I.layers.mask=W.layers.mask|4,M.layers.mask=A.layers.mask|I.layers.mask;const rt=W.parent,Ct=M.cameras;it(M,rt);for(let Dt=0;Dt<Ct.length;Dt++)it(Ct[Dt],rt);Ct.length===2?H(M,A,I):M.projectionMatrix.copy(A.projectionMatrix),lt(W,M,rt)};function lt(W,tt,xt){xt===null?W.matrix.copy(tt.matrixWorld):(W.matrix.copy(xt.matrixWorld),W.matrix.invert(),W.matrix.multiply(tt.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(tt.projectionMatrix),W.projectionMatrixInverse.copy(tt.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=fl*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Tt=null;function kt(W,tt){if(h=tt.getViewerPose(l||o),_=tt,h!==null){const xt=h.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let rt=!1;xt.length!==M.cameras.length&&(M.cameras.length=0,rt=!0);for(let Dt=0;Dt<xt.length;Dt++){const zt=xt[Dt];let ge=null;if(m!==null)ge=m.getViewport(zt);else{const be=u.getViewSubImage(d,zt);ge=be.viewport,Dt===0&&(t.setRenderTargetTextures(b,be.colorTexture,d.ignoreDepthValues?void 0:be.depthStencilTexture),t.setRenderTarget(b))}let Xt=S[Dt];Xt===void 0&&(Xt=new Dn,Xt.layers.enable(Dt),Xt.viewport=new we,S[Dt]=Xt),Xt.matrix.fromArray(zt.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(zt.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(ge.x,ge.y,ge.width,ge.height),Dt===0&&(M.matrix.copy(Xt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),rt===!0&&M.cameras.push(Xt)}const Ct=r.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Dt=u.getDepthInformation(xt[0]);Dt&&Dt.isValid&&Dt.texture&&v.init(t,Dt,r.renderState)}}for(let xt=0;xt<T.length;xt++){const rt=y[xt],Ct=T[xt];rt!==null&&Ct!==void 0&&Ct.update(rt,tt,l||o)}Tt&&Tt(W,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),_=null}const oe=new Ff;oe.setAnimationLoop(kt),this.setAnimationLoop=function(W){Tt=W},this.dispose=function(){}}}const ir=new Ti,Qv=new Re;function tx(e,t){function n(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Df(e)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,b,T,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),u(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,y)):f.isMeshMatcapMaterial?(s(p,f),_(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),v(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?c(p,f,b,T):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,n(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===tn&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,n(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===tn&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,n(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,n(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const b=t.get(f),T=b.envMap,y=b.envMapRotation;T&&(p.envMap.value=T,ir.copy(y),ir.x*=-1,ir.y*=-1,ir.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ir.y*=-1,ir.z*=-1),p.envMapRotation.value.setFromMatrix4(Qv.makeRotationFromEuler(ir)),p.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,b,T){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*b,p.scale.value=T*.5,f.map&&(p.map.value=f.map,n(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,b){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===tn&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){const b=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ex(e,t,n,i){let r={},s={},o=[];const a=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,T){const y=T.program;i.uniformBlockBinding(b,y)}function l(b,T){let y=r[b.id];y===void 0&&(_(b),y=h(b),r[b.id]=y,b.addEventListener("dispose",p));const B=T.program;i.updateUBOMapping(b,B);const C=t.render.frame;s[b.id]!==C&&(d(b),s[b.id]=C)}function h(b){const T=u();b.__bindingPointIndex=T;const y=e.createBuffer(),B=b.__size,C=b.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,B,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,T,y),y}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const T=r[b.id],y=b.uniforms,B=b.__cache;e.bindBuffer(e.UNIFORM_BUFFER,T);for(let C=0,A=y.length;C<A;C++){const I=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,M=I.length;S<M;S++){const w=I[S];if(m(w,C,S,B)===!0){const V=w.__offset,k=Array.isArray(w.value)?w.value:[w.value];let j=0;for(let K=0;K<k.length;K++){const X=k[K],$=v(X);typeof X=="number"||typeof X=="boolean"?(w.__data[0]=X,e.bufferSubData(e.UNIFORM_BUFFER,V+j,w.__data)):X.isMatrix3?(w.__data[0]=X.elements[0],w.__data[1]=X.elements[1],w.__data[2]=X.elements[2],w.__data[3]=0,w.__data[4]=X.elements[3],w.__data[5]=X.elements[4],w.__data[6]=X.elements[5],w.__data[7]=0,w.__data[8]=X.elements[6],w.__data[9]=X.elements[7],w.__data[10]=X.elements[8],w.__data[11]=0):(X.toArray(w.__data,j),j+=$.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,V,w.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(b,T,y,B){const C=b.value,A=T+"_"+y;if(B[A]===void 0)return typeof C=="number"||typeof C=="boolean"?B[A]=C:B[A]=C.clone(),!0;{const I=B[A];if(typeof C=="number"||typeof C=="boolean"){if(I!==C)return B[A]=C,!0}else if(I.equals(C)===!1)return I.copy(C),!0}return!1}function _(b){const T=b.uniforms;let y=0;const B=16;for(let A=0,I=T.length;A<I;A++){const S=Array.isArray(T[A])?T[A]:[T[A]];for(let M=0,w=S.length;M<w;M++){const V=S[M],k=Array.isArray(V.value)?V.value:[V.value];for(let j=0,K=k.length;j<K;j++){const X=k[j],$=v(X),H=y%B,it=H%$.boundary,lt=H+it;y+=it,lt!==0&&B-lt<$.storage&&(y+=B-lt),V.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=y,y+=$.storage}}}const C=y%B;return C>0&&(y+=B-C),b.__size=y,b.__cache={},this}function v(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),T}function p(b){const T=b.target;T.removeEventListener("dispose",p);const y=o.indexOf(T.__bindingPointIndex);o.splice(y,1),e.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function f(){for(const b in r)e.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:f}}class nx{constructor(t={}){const{canvas:n=V0(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const _=new Uint32Array(4),v=new Int32Array(4);let p=null,f=null;const b=[],T=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ln,this.toneMapping=Wi,this.toneMappingExposure=1;const y=this;let B=!1,C=0,A=0,I=null,S=-1,M=null;const w=new we,V=new we;let k=null;const j=new Zt(0);let K=0,X=n.width,$=n.height,H=1,it=null,lt=null;const Tt=new we(0,0,X,$),kt=new we(0,0,X,$);let oe=!1;const W=new Nf;let tt=!1,xt=!1;const rt=new Re,Ct=new Re,Dt=new U,zt=new we,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function be(){return I===null?H:1}let D=i;function bn(x,P){return n.getContext(x,P)}try{const x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ul}`),n.addEventListener("webglcontextlost",Y,!1),n.addEventListener("webglcontextrestored",ct,!1),n.addEventListener("webglcontextcreationerror",ot,!1),D===null){const P="webgl2";if(D=bn(P,x),D===null)throw bn(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ht,Gt,wt,ue,At,E,g,N,q,Z,G,yt,st,ht,qt,J,dt,Rt,Pt,ft,Vt,Ft,ce,R;function nt(){Ht=new a2(D),Ht.init(),Ft=new qv(D,Ht),Gt=new t2(D,Ht,t,Ft),wt=new Vv(D,Ht),Gt.reverseDepthBuffer&&d&&wt.buffers.depth.setReversed(!0),ue=new h2(D),At=new Rv,E=new Xv(D,Ht,wt,At,Gt,Ft,ue),g=new n2(y),N=new o2(y),q=new __(D),ce=new J1(D,q),Z=new c2(D,q,ue,ce),G=new d2(D,Z,q,ue),Pt=new u2(D,Gt,E),J=new e2(At),yt=new wv(y,g,N,Ht,Gt,ce,J),st=new tx(y,At),ht=new Pv,qt=new Fv(Ht),Rt=new $1(y,g,N,wt,G,m,c),dt=new Hv(y,G,Gt),R=new ex(D,ue,Gt,wt),ft=new Q1(D,Ht,ue),Vt=new l2(D,Ht,ue),ue.programs=yt.programs,y.capabilities=Gt,y.extensions=Ht,y.properties=At,y.renderLists=ht,y.shadowMap=dt,y.state=wt,y.info=ue}nt();const z=new Jv(y,D);this.xr=z,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const x=Ht.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ht.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(X,$,!1))},this.getSize=function(x){return x.set(X,$)},this.setSize=function(x,P,F=!0){if(z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=x,$=P,n.width=Math.floor(x*H),n.height=Math.floor(P*H),F===!0&&(n.style.width=x+"px",n.style.height=P+"px"),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(X*H,$*H).floor()},this.setDrawingBufferSize=function(x,P,F){X=x,$=P,H=F,n.width=Math.floor(x*F),n.height=Math.floor(P*F),this.setViewport(0,0,x,P)},this.getCurrentViewport=function(x){return x.copy(w)},this.getViewport=function(x){return x.copy(Tt)},this.setViewport=function(x,P,F,O){x.isVector4?Tt.set(x.x,x.y,x.z,x.w):Tt.set(x,P,F,O),wt.viewport(w.copy(Tt).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(kt)},this.setScissor=function(x,P,F,O){x.isVector4?kt.set(x.x,x.y,x.z,x.w):kt.set(x,P,F,O),wt.scissor(V.copy(kt).multiplyScalar(H).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(x){wt.setScissorTest(oe=x)},this.setOpaqueSort=function(x){it=x},this.setTransparentSort=function(x){lt=x},this.getClearColor=function(x){return x.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(x=!0,P=!0,F=!0){let O=0;if(x){let L=!1;if(I!==null){const Q=I.texture.format;L=Q===zl||Q===kl||Q===Bl}if(L){const Q=I.texture.type,at=Q===Ei||Q===xr||Q===Ys||Q===rs||Q===Fl||Q===Ol,pt=Rt.getClearColor(),mt=Rt.getClearAlpha(),Lt=pt.r,Ut=pt.g,_t=pt.b;at?(_[0]=Lt,_[1]=Ut,_[2]=_t,_[3]=mt,D.clearBufferuiv(D.COLOR,0,_)):(v[0]=Lt,v[1]=Ut,v[2]=_t,v[3]=mt,D.clearBufferiv(D.COLOR,0,v))}else O|=D.COLOR_BUFFER_BIT}P&&(O|=D.DEPTH_BUFFER_BIT),F&&(O|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Y,!1),n.removeEventListener("webglcontextrestored",ct,!1),n.removeEventListener("webglcontextcreationerror",ot,!1),ht.dispose(),qt.dispose(),At.dispose(),g.dispose(),N.dispose(),G.dispose(),ce.dispose(),R.dispose(),yt.dispose(),z.dispose(),z.removeEventListener("sessionstart",Gh),z.removeEventListener("sessionend",Vh),$i.stop()};function Y(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;const x=ue.autoReset,P=dt.enabled,F=dt.autoUpdate,O=dt.needsUpdate,L=dt.type;nt(),ue.autoReset=x,dt.enabled=P,dt.autoUpdate=F,dt.needsUpdate=O,dt.type=L}function ot(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function It(x){const P=x.target;P.removeEventListener("dispose",It),Se(P)}function Se(x){We(x),At.remove(x)}function We(x){const P=At.get(x).programs;P!==void 0&&(P.forEach(function(F){yt.releaseProgram(F)}),x.isShaderMaterial&&yt.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,F,O,L,Q){P===null&&(P=ge);const at=L.isMesh&&L.matrixWorld.determinant()<0,pt=Ym(x,P,F,O,L);wt.setMaterial(O,at);let mt=F.index,Lt=1;if(O.wireframe===!0){if(mt=Z.getWireframeAttribute(F),mt===void 0)return;Lt=2}const Ut=F.drawRange,_t=F.attributes.position;let Kt=Ut.start*Lt,le=(Ut.start+Ut.count)*Lt;Q!==null&&(Kt=Math.max(Kt,Q.start*Lt),le=Math.min(le,(Q.start+Q.count)*Lt)),mt!==null?(Kt=Math.max(Kt,0),le=Math.min(le,mt.count)):_t!=null&&(Kt=Math.max(Kt,0),le=Math.min(le,_t.count));const de=le-Kt;if(de<0||de===1/0)return;ce.setup(L,O,pt,F,mt);let nn,Qt=ft;if(mt!==null&&(nn=q.get(mt),Qt=Vt,Qt.setIndex(nn)),L.isMesh)O.wireframe===!0?(wt.setLineWidth(O.wireframeLinewidth*be()),Qt.setMode(D.LINES)):Qt.setMode(D.TRIANGLES);else if(L.isLine){let St=O.linewidth;St===void 0&&(St=1),wt.setLineWidth(St*be()),L.isLineSegments?Qt.setMode(D.LINES):L.isLineLoop?Qt.setMode(D.LINE_LOOP):Qt.setMode(D.LINE_STRIP)}else L.isPoints?Qt.setMode(D.POINTS):L.isSprite&&Qt.setMode(D.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Qt.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))Qt.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{const St=L._multiDrawStarts,ui=L._multiDrawCounts,te=L._multiDrawCount,On=mt?q.get(mt).bytesPerElement:1,Cr=At.get(O).currentProgram.getUniforms();for(let hn=0;hn<te;hn++)Cr.setValue(D,"_gl_DrawID",hn),Qt.render(St[hn]/On,ui[hn])}else if(L.isInstancedMesh)Qt.renderInstances(Kt,de,L.count);else if(F.isInstancedBufferGeometry){const St=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,ui=Math.min(F.instanceCount,St);Qt.renderInstances(Kt,de,ui)}else Qt.render(Kt,de)};function ee(x,P,F){x.transparent===!0&&x.side===vi&&x.forceSinglePass===!1?(x.side=tn,x.needsUpdate=!0,po(x,P,F),x.side=qi,x.needsUpdate=!0,po(x,P,F),x.side=vi):po(x,P,F)}this.compile=function(x,P,F=null){F===null&&(F=x),f=qt.get(F),f.init(P),T.push(f),F.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),x!==F&&x.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),f.setupLights();const O=new Set;return x.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;const Q=L.material;if(Q)if(Array.isArray(Q))for(let at=0;at<Q.length;at++){const pt=Q[at];ee(pt,F,L),O.add(pt)}else ee(Q,F,L),O.add(Q)}),T.pop(),f=null,O},this.compileAsync=function(x,P,F=null){const O=this.compile(x,P,F);return new Promise(L=>{function Q(){if(O.forEach(function(at){At.get(at).currentProgram.isReady()&&O.delete(at)}),O.size===0){L(x);return}setTimeout(Q,10)}Ht.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Fn=null;function hi(x){Fn&&Fn(x)}function Gh(){$i.stop()}function Vh(){$i.start()}const $i=new Ff;$i.setAnimationLoop(hi),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(x){Fn=x,z.setAnimationLoop(x),x===null?$i.stop():$i.start()},z.addEventListener("sessionstart",Gh),z.addEventListener("sessionend",Vh),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(z.cameraAutoUpdate===!0&&z.updateCamera(P),P=z.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,P,I),f=qt.get(x,T.length),f.init(P),T.push(f),Ct.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),W.setFromProjectionMatrix(Ct),xt=this.localClippingEnabled,tt=J.init(this.clippingPlanes,xt),p=ht.get(x,b.length),p.init(),b.push(p),z.enabled===!0&&z.isPresenting===!0){const Q=y.xr.getDepthSensingMesh();Q!==null&&za(Q,P,-1/0,y.sortObjects)}za(x,P,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(it,lt),Xt=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,Xt&&Rt.addToRenderList(p,x),this.info.render.frame++,tt===!0&&J.beginShadows();const F=f.state.shadowsArray;dt.render(F,x,P),tt===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=p.opaque,L=p.transmissive;if(f.setupLights(),P.isArrayCamera){const Q=P.cameras;if(L.length>0)for(let at=0,pt=Q.length;at<pt;at++){const mt=Q[at];Xh(O,L,x,mt)}Xt&&Rt.render(x);for(let at=0,pt=Q.length;at<pt;at++){const mt=Q[at];Wh(p,x,mt,mt.viewport)}}else L.length>0&&Xh(O,L,x,P),Xt&&Rt.render(x),Wh(p,x,P);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),x.isScene===!0&&x.onAfterRender(y,x,P),ce.resetDefaultState(),S=-1,M=null,T.pop(),T.length>0?(f=T[T.length-1],tt===!0&&J.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function za(x,P,F,O){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)f.pushLight(x),x.castShadow&&f.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||W.intersectsSprite(x)){O&&zt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ct);const at=G.update(x),pt=x.material;pt.visible&&p.push(x,at,pt,F,zt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||W.intersectsObject(x))){const at=G.update(x),pt=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),zt.copy(x.boundingSphere.center)):(at.boundingSphere===null&&at.computeBoundingSphere(),zt.copy(at.boundingSphere.center)),zt.applyMatrix4(x.matrixWorld).applyMatrix4(Ct)),Array.isArray(pt)){const mt=at.groups;for(let Lt=0,Ut=mt.length;Lt<Ut;Lt++){const _t=mt[Lt],Kt=pt[_t.materialIndex];Kt&&Kt.visible&&p.push(x,at,Kt,F,zt.z,_t)}}else pt.visible&&p.push(x,at,pt,F,zt.z,null)}}const Q=x.children;for(let at=0,pt=Q.length;at<pt;at++)za(Q[at],P,F,O)}function Wh(x,P,F,O){const L=x.opaque,Q=x.transmissive,at=x.transparent;f.setupLightsView(F),tt===!0&&J.setGlobalState(y.clippingPlanes,F),O&&wt.viewport(w.copy(O)),L.length>0&&fo(L,P,F),Q.length>0&&fo(Q,P,F),at.length>0&&fo(at,P,F),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Xh(x,P,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[O.id]===void 0&&(f.state.transmissionRenderTarget[O.id]=new Mr(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?Qs:Ei,minFilter:ur,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const Q=f.state.transmissionRenderTarget[O.id],at=O.viewport||w;Q.setSize(at.z,at.w);const pt=y.getRenderTarget();y.setRenderTarget(Q),y.getClearColor(j),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),Xt&&Rt.render(F);const mt=y.toneMapping;y.toneMapping=Wi;const Lt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),f.setupLightsView(O),tt===!0&&J.setGlobalState(y.clippingPlanes,O),fo(x,F,O),E.updateMultisampleRenderTarget(Q),E.updateRenderTargetMipmap(Q),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let _t=0,Kt=P.length;_t<Kt;_t++){const le=P[_t],de=le.object,nn=le.geometry,Qt=le.material,St=le.group;if(Qt.side===vi&&de.layers.test(O.layers)){const ui=Qt.side;Qt.side=tn,Qt.needsUpdate=!0,qh(de,F,O,nn,Qt,St),Qt.side=ui,Qt.needsUpdate=!0,Ut=!0}}Ut===!0&&(E.updateMultisampleRenderTarget(Q),E.updateRenderTargetMipmap(Q))}y.setRenderTarget(pt),y.setClearColor(j,K),Lt!==void 0&&(O.viewport=Lt),y.toneMapping=mt}function fo(x,P,F){const O=P.isScene===!0?P.overrideMaterial:null;for(let L=0,Q=x.length;L<Q;L++){const at=x[L],pt=at.object,mt=at.geometry,Lt=O===null?at.material:O,Ut=at.group;pt.layers.test(F.layers)&&qh(pt,P,F,mt,Lt,Ut)}}function qh(x,P,F,O,L,Q){x.onBeforeRender(y,P,F,O,L,Q),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),L.onBeforeRender(y,P,F,O,x,Q),L.transparent===!0&&L.side===vi&&L.forceSinglePass===!1?(L.side=tn,L.needsUpdate=!0,y.renderBufferDirect(F,P,O,L,x,Q),L.side=qi,L.needsUpdate=!0,y.renderBufferDirect(F,P,O,L,x,Q),L.side=vi):y.renderBufferDirect(F,P,O,L,x,Q),x.onAfterRender(y,P,F,O,L,Q)}function po(x,P,F){P.isScene!==!0&&(P=ge);const O=At.get(x),L=f.state.lights,Q=f.state.shadowsArray,at=L.state.version,pt=yt.getParameters(x,L.state,Q,P,F),mt=yt.getProgramCacheKey(pt);let Lt=O.programs;O.environment=x.isMeshStandardMaterial?P.environment:null,O.fog=P.fog,O.envMap=(x.isMeshStandardMaterial?N:g).get(x.envMap||O.environment),O.envMapRotation=O.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,Lt===void 0&&(x.addEventListener("dispose",It),Lt=new Map,O.programs=Lt);let Ut=Lt.get(mt);if(Ut!==void 0){if(O.currentProgram===Ut&&O.lightsStateVersion===at)return jh(x,pt),Ut}else pt.uniforms=yt.getUniforms(x),x.onBeforeCompile(pt,y),Ut=yt.acquireProgram(pt,mt),Lt.set(mt,Ut),O.uniforms=pt.uniforms;const _t=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(_t.clippingPlanes=J.uniform),jh(x,pt),O.needsLights=Km(x),O.lightsStateVersion=at,O.needsLights&&(_t.ambientLightColor.value=L.state.ambient,_t.lightProbe.value=L.state.probe,_t.directionalLights.value=L.state.directional,_t.directionalLightShadows.value=L.state.directionalShadow,_t.spotLights.value=L.state.spot,_t.spotLightShadows.value=L.state.spotShadow,_t.rectAreaLights.value=L.state.rectArea,_t.ltc_1.value=L.state.rectAreaLTC1,_t.ltc_2.value=L.state.rectAreaLTC2,_t.pointLights.value=L.state.point,_t.pointLightShadows.value=L.state.pointShadow,_t.hemisphereLights.value=L.state.hemi,_t.directionalShadowMap.value=L.state.directionalShadowMap,_t.directionalShadowMatrix.value=L.state.directionalShadowMatrix,_t.spotShadowMap.value=L.state.spotShadowMap,_t.spotLightMatrix.value=L.state.spotLightMatrix,_t.spotLightMap.value=L.state.spotLightMap,_t.pointShadowMap.value=L.state.pointShadowMap,_t.pointShadowMatrix.value=L.state.pointShadowMatrix),O.currentProgram=Ut,O.uniformsList=null,Ut}function Yh(x){if(x.uniformsList===null){const P=x.currentProgram.getUniforms();x.uniformsList=ta.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function jh(x,P){const F=At.get(x);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.batchingColor=P.batchingColor,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.instancingMorph=P.instancingMorph,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function Ym(x,P,F,O,L){P.isScene!==!0&&(P=ge),E.resetTextureUnits();const Q=P.fog,at=O.isMeshStandardMaterial?P.environment:null,pt=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:vs,mt=(O.isMeshStandardMaterial?N:g).get(O.envMap||at),Lt=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ut=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),_t=!!F.morphAttributes.position,Kt=!!F.morphAttributes.normal,le=!!F.morphAttributes.color;let de=Wi;O.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(de=y.toneMapping);const nn=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Qt=nn!==void 0?nn.length:0,St=At.get(O),ui=f.state.lights;if(tt===!0&&(xt===!0||x!==M)){const An=x===M&&O.id===S;J.setState(O,x,An)}let te=!1;O.version===St.__version?(St.needsLights&&St.lightsStateVersion!==ui.state.version||St.outputColorSpace!==pt||L.isBatchedMesh&&St.batching===!1||!L.isBatchedMesh&&St.batching===!0||L.isBatchedMesh&&St.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&St.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&St.instancing===!1||!L.isInstancedMesh&&St.instancing===!0||L.isSkinnedMesh&&St.skinning===!1||!L.isSkinnedMesh&&St.skinning===!0||L.isInstancedMesh&&St.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&St.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&St.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&St.instancingMorph===!1&&L.morphTexture!==null||St.envMap!==mt||O.fog===!0&&St.fog!==Q||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==J.numPlanes||St.numIntersection!==J.numIntersection)||St.vertexAlphas!==Lt||St.vertexTangents!==Ut||St.morphTargets!==_t||St.morphNormals!==Kt||St.morphColors!==le||St.toneMapping!==de||St.morphTargetsCount!==Qt)&&(te=!0):(te=!0,St.__version=O.version);let On=St.currentProgram;te===!0&&(On=po(O,P,L));let Cr=!1,hn=!1,Ds=!1;const fe=On.getUniforms(),Kn=St.uniforms;if(wt.useProgram(On.program)&&(Cr=!0,hn=!0,Ds=!0),O.id!==S&&(S=O.id,hn=!0),Cr||M!==x){wt.buffers.depth.getReversed()?(rt.copy(x.projectionMatrix),X0(rt),q0(rt),fe.setValue(D,"projectionMatrix",rt)):fe.setValue(D,"projectionMatrix",x.projectionMatrix),fe.setValue(D,"viewMatrix",x.matrixWorldInverse);const Ci=fe.map.cameraPosition;Ci!==void 0&&Ci.setValue(D,Dt.setFromMatrixPosition(x.matrixWorld)),Gt.logarithmicDepthBuffer&&fe.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&fe.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,hn=!0,Ds=!0)}if(L.isSkinnedMesh){fe.setOptional(D,L,"bindMatrix"),fe.setOptional(D,L,"bindMatrixInverse");const An=L.skeleton;An&&(An.boneTexture===null&&An.computeBoneTexture(),fe.setValue(D,"boneTexture",An.boneTexture,E))}L.isBatchedMesh&&(fe.setOptional(D,L,"batchingTexture"),fe.setValue(D,"batchingTexture",L._matricesTexture,E),fe.setOptional(D,L,"batchingIdTexture"),fe.setValue(D,"batchingIdTexture",L._indirectTexture,E),fe.setOptional(D,L,"batchingColorTexture"),L._colorsTexture!==null&&fe.setValue(D,"batchingColorTexture",L._colorsTexture,E));const Is=F.morphAttributes;if((Is.position!==void 0||Is.normal!==void 0||Is.color!==void 0)&&Pt.update(L,F,On),(hn||St.receiveShadow!==L.receiveShadow)&&(St.receiveShadow=L.receiveShadow,fe.setValue(D,"receiveShadow",L.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Kn.envMap.value=mt,Kn.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&P.environment!==null&&(Kn.envMapIntensity.value=P.environmentIntensity),hn&&(fe.setValue(D,"toneMappingExposure",y.toneMappingExposure),St.needsLights&&jm(Kn,Ds),Q&&O.fog===!0&&st.refreshFogUniforms(Kn,Q),st.refreshMaterialUniforms(Kn,O,H,$,f.state.transmissionRenderTarget[x.id]),ta.upload(D,Yh(St),Kn,E)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(ta.upload(D,Yh(St),Kn,E),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&fe.setValue(D,"center",L.center),fe.setValue(D,"modelViewMatrix",L.modelViewMatrix),fe.setValue(D,"normalMatrix",L.normalMatrix),fe.setValue(D,"modelMatrix",L.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const An=O.uniformsGroups;for(let Ci=0,Pi=An.length;Ci<Pi;Ci++){const Kh=An[Ci];R.update(Kh,On),R.bind(Kh,On)}}return On}function jm(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function Km(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,P,F){At.get(x.texture).__webglTexture=P,At.get(x.depthTexture).__webglTexture=F;const O=At.get(x);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,P){const F=At.get(x);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(x,P=0,F=0){I=x,C=P,A=F;let O=!0,L=null,Q=!1,at=!1;if(x){const mt=At.get(x);if(mt.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(D.FRAMEBUFFER,null),O=!1;else if(mt.__webglFramebuffer===void 0)E.setupRenderTarget(x);else if(mt.__hasExternalTextures)E.rebindTextures(x,At.get(x.texture).__webglTexture,At.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const _t=x.depthTexture;if(mt.__boundDepthTexture!==_t){if(_t!==null&&At.has(_t)&&(x.width!==_t.image.width||x.height!==_t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(x)}}const Lt=x.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(at=!0);const Ut=At.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ut[P])?L=Ut[P][F]:L=Ut[P],Q=!0):x.samples>0&&E.useMultisampledRTT(x)===!1?L=At.get(x).__webglMultisampledFramebuffer:Array.isArray(Ut)?L=Ut[F]:L=Ut,w.copy(x.viewport),V.copy(x.scissor),k=x.scissorTest}else w.copy(Tt).multiplyScalar(H).floor(),V.copy(kt).multiplyScalar(H).floor(),k=oe;if(wt.bindFramebuffer(D.FRAMEBUFFER,L)&&O&&wt.drawBuffers(x,L),wt.viewport(w),wt.scissor(V),wt.setScissorTest(k),Q){const mt=At.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,mt.__webglTexture,F)}else if(at){const mt=At.get(x.texture),Lt=P||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.__webglTexture,F||0,Lt)}S=-1},this.readRenderTargetPixels=function(x,P,F,O,L,Q,at){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=At.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&at!==void 0&&(pt=pt[at]),pt){wt.bindFramebuffer(D.FRAMEBUFFER,pt);try{const mt=x.texture,Lt=mt.format,Ut=mt.type;if(!Gt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-O&&F>=0&&F<=x.height-L&&D.readPixels(P,F,O,L,Ft.convert(Lt),Ft.convert(Ut),Q)}finally{const mt=I!==null?At.get(I).__webglFramebuffer:null;wt.bindFramebuffer(D.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(x,P,F,O,L,Q,at){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=At.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&at!==void 0&&(pt=pt[at]),pt){const mt=x.texture,Lt=mt.format,Ut=mt.type;if(!Gt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=x.width-O&&F>=0&&F<=x.height-L){wt.bindFramebuffer(D.FRAMEBUFFER,pt);const _t=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,_t),D.bufferData(D.PIXEL_PACK_BUFFER,Q.byteLength,D.STREAM_READ),D.readPixels(P,F,O,L,Ft.convert(Lt),Ft.convert(Ut),0);const Kt=I!==null?At.get(I).__webglFramebuffer:null;wt.bindFramebuffer(D.FRAMEBUFFER,Kt);const le=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await W0(D,le,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,_t),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Q),D.deleteBuffer(_t),D.deleteSync(le),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,P=null,F=0){x.isTexture!==!0&&(zs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,x=arguments[1]);const O=Math.pow(2,-F),L=Math.floor(x.image.width*O),Q=Math.floor(x.image.height*O),at=P!==null?P.x:0,pt=P!==null?P.y:0;E.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,F,0,0,at,pt,L,Q),wt.unbindTexture()},this.copyTextureToTexture=function(x,P,F=null,O=null,L=0){x.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,x=arguments[1],P=arguments[2],L=arguments[3]||0,F=null);let Q,at,pt,mt,Lt,Ut,_t,Kt,le;const de=x.isCompressedTexture?x.mipmaps[L]:x.image;F!==null?(Q=F.max.x-F.min.x,at=F.max.y-F.min.y,pt=F.isBox3?F.max.z-F.min.z:1,mt=F.min.x,Lt=F.min.y,Ut=F.isBox3?F.min.z:0):(Q=de.width,at=de.height,pt=de.depth||1,mt=0,Lt=0,Ut=0),O!==null?(_t=O.x,Kt=O.y,le=O.z):(_t=0,Kt=0,le=0);const nn=Ft.convert(P.format),Qt=Ft.convert(P.type);let St;P.isData3DTexture?(E.setTexture3D(P,0),St=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(E.setTexture2DArray(P,0),St=D.TEXTURE_2D_ARRAY):(E.setTexture2D(P,0),St=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const ui=D.getParameter(D.UNPACK_ROW_LENGTH),te=D.getParameter(D.UNPACK_IMAGE_HEIGHT),On=D.getParameter(D.UNPACK_SKIP_PIXELS),Cr=D.getParameter(D.UNPACK_SKIP_ROWS),hn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,de.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,mt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Lt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ut);const Ds=x.isDataArrayTexture||x.isData3DTexture,fe=P.isDataArrayTexture||P.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const Kn=At.get(x),Is=At.get(P),An=At.get(Kn.__renderTarget),Ci=At.get(Is.__renderTarget);wt.bindFramebuffer(D.READ_FRAMEBUFFER,An.__webglFramebuffer),wt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let Pi=0;Pi<pt;Pi++)Ds&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.get(x).__webglTexture,L,Ut+Pi),x.isDepthTexture?(fe&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.get(P).__webglTexture,L,le+Pi),D.blitFramebuffer(mt,Lt,Q,at,_t,Kt,Q,at,D.DEPTH_BUFFER_BIT,D.NEAREST)):fe?D.copyTexSubImage3D(St,L,_t,Kt,le+Pi,mt,Lt,Q,at):D.copyTexSubImage2D(St,L,_t,Kt,le+Pi,mt,Lt,Q,at);wt.bindFramebuffer(D.READ_FRAMEBUFFER,null),wt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else fe?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(St,L,_t,Kt,le,Q,at,pt,nn,Qt,de.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(St,L,_t,Kt,le,Q,at,pt,nn,de.data):D.texSubImage3D(St,L,_t,Kt,le,Q,at,pt,nn,Qt,de):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,L,_t,Kt,Q,at,nn,Qt,de.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,L,_t,Kt,de.width,de.height,nn,de.data):D.texSubImage2D(D.TEXTURE_2D,L,_t,Kt,Q,at,nn,Qt,de);D.pixelStorei(D.UNPACK_ROW_LENGTH,ui),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,te),D.pixelStorei(D.UNPACK_SKIP_PIXELS,On),D.pixelStorei(D.UNPACK_SKIP_ROWS,Cr),D.pixelStorei(D.UNPACK_SKIP_IMAGES,hn),L===0&&P.generateMipmaps&&D.generateMipmap(St),wt.unbindTexture()},this.copyTextureToTexture3D=function(x,P,F=null,O=null,L=0){return x.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,O=arguments[1]||null,x=arguments[2],P=arguments[3],L=arguments[4]||0),zs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,P,F,O,L)},this.initRenderTarget=function(x){At.get(x).__webglFramebuffer===void 0&&E.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?E.setTextureCube(x,0):x.isData3DTexture?E.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?E.setTexture2DArray(x,0):E.setTexture2D(x,0),wt.unbindTexture()},this.resetState=function(){C=0,A=0,I=null,wt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Yt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Yt._getUnpackColorSpace()}}class ix extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ti,this.environmentIntensity=1,this.environmentRotation=new Ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Wl extends no{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Yu=new Re,ml=new Hl,Oo=new pa,Bo=new U;class Gf extends cn{constructor(t=new Xn,n=new Wl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Oo.copy(i.boundingSphere),Oo.applyMatrix4(r),Oo.radius+=s,t.ray.intersectsSphere(Oo)===!1)return;Yu.copy(r).invert(),ml.copy(t.ray).applyMatrix4(Yu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const d=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let _=d,v=m;_<v;_++){const p=l.getX(_);Bo.fromBufferAttribute(u,p),ju(Bo,p,c,r,t,n,this)}}else{const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=d,v=m;_<v;_++)Bo.fromBufferAttribute(u,_),ju(Bo,_,c,r,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ju(e,t,n,i,r,s,o){const a=ml.distanceSqToPoint(e);if(a<n){const c=new U;ml.closestPointToPoint(e,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Vf extends en{constructor(t,n,i,r,s,o,a,c,l){super(t,n,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xl extends Xn{constructor(t=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new U,d=new U,m=[],_=[],v=[],p=[];for(let f=0;f<=i;f++){const b=[],T=f/i;let y=0;f===0&&o===0?y=.5/n:f===i&&c===Math.PI&&(y=-.5/n);for(let B=0;B<=n;B++){const C=B/n;u.x=-t*Math.cos(r+C*s)*Math.sin(o+T*a),u.y=t*Math.cos(o+T*a),u.z=t*Math.sin(r+C*s)*Math.sin(o+T*a),_.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),p.push(C+y,1-T),b.push(l++)}h.push(b)}for(let f=0;f<i;f++)for(let b=0;b<n;b++){const T=h[f][b+1],y=h[f][b],B=h[f+1][b],C=h[f+1][b+1];(f!==0||o>0)&&m.push(T,y,C),(f!==i-1||c<Math.PI)&&m.push(y,B,C)}this.setIndex(m),this.setAttribute("position",new gn(_,3)),this.setAttribute("normal",new gn(v,3)),this.setAttribute("uv",new gn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class rx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ku(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Ku();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function Ku(){return performance.now()}class Zu{constructor(t=1,n=0,i=0){return this.radius=t,this.phi=n,this.theta=i,this}set(t,n,i){return this.radius=t,this.phi=n,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,i){return this.radius=Math.sqrt(t*t+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Je(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class sx extends br{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ul}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ul);const $u={type:"change"},ql={type:"start"},Wf={type:"end"},ko=new Hl,Ju=new ki,ox=Math.cos(70*G0.DEG2RAD),Ie=new U,sn=2*Math.PI,re={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_c=1e-6;class ax extends sx{constructor(t,n=null){super(t,n),this.state=re.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Kr.ROTATE,MIDDLE:Kr.DOLLY,RIGHT:Kr.PAN},this.touches={ONE:qr.ROTATE,TWO:qr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new yr,this._lastTargetPosition=new U,this._quat=new yr().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zu,this._sphericalDelta=new Zu,this._scale=1,this._panOffset=new U,this._rotateStart=new Bt,this._rotateEnd=new Bt,this._rotateDelta=new Bt,this._panStart=new Bt,this._panEnd=new Bt,this._panDelta=new Bt,this._dollyStart=new Bt,this._dollyEnd=new Bt,this._dollyDelta=new Bt,this._dollyDirection=new U,this._mouse=new Bt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=lx.bind(this),this._onPointerDown=cx.bind(this),this._onPointerUp=hx.bind(this),this._onContextMenu=gx.bind(this),this._onMouseWheel=fx.bind(this),this._onKeyDown=px.bind(this),this._onTouchStart=mx.bind(this),this._onTouchMove=_x.bind(this),this._onMouseDown=ux.bind(this),this._onMouseMove=dx.bind(this),this._interceptControlDown=vx.bind(this),this._interceptControlUp=xx.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($u),this.update(),this.state=re.NONE}update(t=null){const n=this.object.position;Ie.copy(n).sub(this.target),Ie.applyQuaternion(this._quat),this._spherical.setFromVector3(Ie),this.autoRotate&&this.state===re.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),r<-Math.PI?r+=sn:r>Math.PI&&(r-=sn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Ie.setFromSpherical(this._spherical),Ie.applyQuaternion(this._quatInverse),n.copy(this.target).add(Ie),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ie.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ie.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ko.origin.copy(this.object.position),ko.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ko.direction))<ox?this.object.lookAt(this.target):(Ju.setFromNormalAndCoplanarPoint(this.object.up,this.target),ko.intersectPlane(Ju,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>_c||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_c||this._lastTargetPosition.distanceToSquared(this.target)>_c?(this.dispatchEvent($u),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){Ie.setFromMatrixColumn(n,0),Ie.multiplyScalar(-t),this._panOffset.add(Ie)}_panUp(t,n){this.screenSpacePanning===!0?Ie.setFromMatrixColumn(n,1):(Ie.setFromMatrixColumn(n,0),Ie.crossVectors(this.object.up,Ie)),Ie.multiplyScalar(t),this._panOffset.add(Ie)}_pan(t,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Ie.copy(r).sub(this.target);let s=Ie.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/n.clientHeight),this._rotateUp(sn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/n.clientHeight),this._rotateUp(sn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),i=t.pageX-n.x,r=t.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+n.x)*.5,a=(t.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new Bt,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function cx(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function lx(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function hx(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Wf),this.state=re.NONE;break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function ux(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Kr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=re.DOLLY;break;case Kr.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=re.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=re.ROTATE}break;case Kr.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=re.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=re.PAN}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(ql)}function dx(e){switch(this.state){case re.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case re.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case re.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function fx(e){this.enabled===!1||this.enableZoom===!1||this.state!==re.NONE||(e.preventDefault(),this.dispatchEvent(ql),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Wf))}function px(e){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(e)}function mx(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case qr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=re.TOUCH_ROTATE;break;case qr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=re.TOUCH_PAN;break;default:this.state=re.NONE}break;case 2:switch(this.touches.TWO){case qr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=re.TOUCH_DOLLY_PAN;break;case qr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=re.TOUCH_DOLLY_ROTATE;break;default:this.state=re.NONE}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(ql)}function _x(e){switch(this._trackPointer(e),this.state){case re.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case re.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case re.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case re.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=re.NONE}}function gx(e){this.enabled!==!1&&e.preventDefault()}function vx(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function xx(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Mx{constructor(){ne(this,"renderer");ne(this,"scene");ne(this,"camera");ne(this,"controls");ne(this,"clock")}init(t){this.renderer=new nx({canvas:t,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.scene=new ix,this.scene.background=new Zt(5),this.camera=new Dn(60,window.innerWidth/window.innerHeight,.1,500),this.camera.position.set(0,0,30),this.controls=new ax(this.camera,t),this.controls.target.set(0,0,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.enablePan=!1,this.controls.minDistance=5,this.controls.maxDistance=80,this.clock=new rx,window.addEventListener("resize",()=>this.onResize())}startLoop(){this.renderer.setAnimationLoop(()=>{const t=this.clock.getDelta(),n=this.clock.getElapsedTime();this.controls.update(),Qe.emit("frame",{delta:t,elapsed:n}),this.renderer.render(this.scene,this.camera)})}onResize(){const t=window.innerWidth,n=window.innerHeight;this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,n)}}const zo=new Mx;class yx{init(t){this.createStarfield(t),this.createNebula(t)}createStarfield(t){const r=new Float32Array(6e3);for(let a=0;a<2e3;a++){const c=Math.random()*Math.PI*2,l=Math.acos(2*Math.random()-1),h=200+(Math.random()-.5)*20;r[a*3]=h*Math.sin(l)*Math.cos(c),r[a*3+1]=h*Math.sin(l)*Math.sin(c),r[a*3+2]=h*Math.cos(l)}const s=new Xn;s.setAttribute("position",new gn(r,3));const o=new Wl({size:.8,sizeAttenuation:!0,color:16777215,transparent:!0,opacity:.6});t.add(new Gf(s,o))}createNebula(t){const n=this.generateNebulaTexture(),i=new Xl(300,32,32),r=new Gl({map:n,side:tn,transparent:!0,opacity:.4});t.add(new ti(i,r))}generateNebulaTexture(){const i=document.createElement("canvas");i.width=512,i.height=256;const r=i.getContext("2d");r.fillStyle="#000008",r.fillRect(0,0,512,256);const s=[{cx:128,cy:80,rx:150,ry:80,color:[40,20,100]},{cx:300,cy:120,rx:120,ry:90,color:[80,20,90]},{cx:200,cy:200,rx:180,ry:60,color:[30,30,120]},{cx:400,cy:60,rx:100,ry:70,color:[100,30,80]},{cx:80,cy:180,rx:130,ry:50,color:[20,40,100]},{cx:450,cy:200,rx:90,ry:60,color:[60,10,90]}];for(const a of s){const c=r.createRadialGradient(a.cx,a.cy,0,a.cx,a.cy,Math.max(a.rx,a.ry)),[l,h,u]=a.color;c.addColorStop(0,`rgba(${l},${h},${u},0.25)`),c.addColorStop(.5,`rgba(${l},${h},${u},0.1)`),c.addColorStop(1,`rgba(${l},${h},${u},0)`),r.fillStyle=c,r.beginPath(),r.ellipse(a.cx,a.cy,a.rx,a.ry,0,0,Math.PI*2),r.fill()}for(let a=0;a<15;a++){const c=Math.random()*512,l=Math.random()*256,h=10+Math.random()*30,u=220+Math.random()*100,d=r.createRadialGradient(c,l,0,c,l,h);d.addColorStop(0,`hsla(${u},80%,60%,0.15)`),d.addColorStop(1,`hsla(${u},80%,60%,0)`),r.fillStyle=d,r.fillRect(c-h,l-h,h*2,h*2)}const o=new Vf(i);return o.needsUpdate=!0,o}}const Sx=new yx;function Ex(e=64){const t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d"),i=e/2,r=n.createRadialGradient(i,i,0,i,i,i);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.2,"rgba(255,255,255,0.9)"),r.addColorStop(.4,"rgba(255,255,255,0.6)"),r.addColorStop(.7,"rgba(255,255,255,0.2)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,e,e);const s=new Vf(t);return s.needsUpdate=!0,s}const Tx={count:1e4,baseSize:.24,spread:20,colorCycleSpeed:.3};class bx{constructor(){ne(this,"points");ne(this,"geometry");ne(this,"positionAttr");ne(this,"colorAttr");ne(this,"velocity");ne(this,"acceleration");ne(this,"baseHue");ne(this,"count",0);ne(this,"spread",20);ne(this,"colorCycleSpeed",.3)}init(t,n={}){const i={...Tx,...n};this.count=i.count,this.spread=i.spread,this.colorCycleSpeed=i.colorCycleSpeed;const r=this.count,s=new Float32Array(r*3),o=new Float32Array(r*3);this.velocity=new Float32Array(r*3),this.acceleration=new Float32Array(r*3),this.baseHue=new Float32Array(r);for(let l=0;l<r;l++){const h=l*3;let u,d,m;do u=(Math.random()-.5)*2,d=(Math.random()-.5)*2,m=(Math.random()-.5)*2;while(u*u+d*d+m*m>1);const _=this.spread*(.3+Math.random()*.7);s[h]=u*_,s[h+1]=d*_,s[h+2]=m*_;const v=Math.random();this.baseHue[l]=v;const p=new Zt;p.setHSL(v,.7,.6),o[h]=p.r,o[h+1]=p.g,o[h+2]=p.b,this.velocity[h]=(Math.random()-.5)*.5,this.velocity[h+1]=(Math.random()-.5)*.5,this.velocity[h+2]=(Math.random()-.5)*.5}this.geometry=new Xn,this.positionAttr=new gn(s,3),this.colorAttr=new gn(o,3),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("color",this.colorAttr);const a=Ex(),c=new Wl({size:i.baseSize,sizeAttenuation:!0,map:a,transparent:!0,blending:wc,depthWrite:!1,vertexColors:!0});this.points=new Gf(this.geometry,c),t.add(this.points),Qe.on("frame",({delta:l,elapsed:h})=>this.update(l,h))}update(t,n){const i=this.positionAttr.array,r=this.colorAttr.array,s=this.velocity,o=this.acceleration,a=this.count,c=this.spread*2.5;t=Math.min(t,.05);for(let l=0;l<a;l++){const h=l*3;s[h]+=o[h]*t,s[h+1]+=o[h+1]*t,s[h+2]+=o[h+2]*t,i[h]+=s[h]*t,i[h+1]+=s[h+1]*t,i[h+2]+=s[h+2]*t,s[h]*=.98,s[h+1]*=.98,s[h+2]*=.98;const u=Math.sqrt(i[h]**2+i[h+1]**2+i[h+2]**2);if(u>c){const v=c/u;i[h]*=v,i[h+1]*=v,i[h+2]*=v,s[h]*=-.5,s[h+1]*=-.5,s[h+2]*=-.5}o[h]=0,o[h+1]=0,o[h+2]=0;const d=(this.baseHue[l]+Math.sin(n*this.colorCycleSpeed+l*.1)*.08+1)%1,m=.5+Math.sin(n*1.5+l*.3)*.1,_=new Zt;_.setHSL(d,.7,m),r[h]=_.r,r[h+1]=_.g,r[h+2]=_.b}this.positionAttr.needsUpdate=!0,this.colorAttr.needsUpdate=!0}applyRadialForce(t,n,i){const r=this.positionAttr.array,s=this.acceleration,o=this.count,a=i*i;for(let c=0;c<o;c++){const l=c*3,h=r[l]-t.x,u=r[l+1]-t.y,d=r[l+2]-t.z,m=h*h+u*u+d*d;if(m<a&&m>.001){const _=Math.sqrt(m),v=1-_/i,p=n*v/_;s[l]+=h*p,s[l+1]+=u*p,s[l+2]+=d*p}}}applyDirectionalForce(t,n){const i=this.acceleration,r=this.count,s=t.x*n,o=t.y*n,a=t.z*n;for(let c=0;c<r;c++){const l=c*3;i[l]+=s,i[l+1]+=o,i[l+2]+=a}}applyVortex(t,n,i,r){const s=this.positionAttr.array,o=this.acceleration,a=this.count,c=r*r,l=Math.sqrt(n.x**2+n.y**2+n.z**2)||1,h=n.x/l,u=n.y/l,d=n.z/l;for(let m=0;m<a;m++){const _=m*3,v=s[_]-t.x,p=s[_+1]-t.y,f=s[_+2]-t.z,b=v*v+p*p+f*f;if(b<c&&b>.001){const T=Math.sqrt(b),y=1-T/r,B=u*f-d*p,C=d*v-h*f,A=h*p-u*v,I=i*y/T;o[_]+=B*I,o[_+1]+=C*I,o[_+2]+=A*I}}}triggerBurst(t,n){const i=this.positionAttr.array,r=this.velocity,s=this.count;for(let o=0;o<s;o++){const a=o*3,c=i[a]-t.x,l=i[a+1]-t.y,h=i[a+2]-t.z,u=Math.sqrt(c*c+l*l+h*h)||1,d=n/u;r[a]+=c*d,r[a+1]+=l*d,r[a+2]+=h*d}}triggerPulse(t,n,i){const r=this.positionAttr.array,s=this.acceleration,o=this.count,a=i%10*n,c=3;for(let l=0;l<o;l++){const h=l*3,u=r[h]-t.x,d=r[h+1]-t.y,m=r[h+2]-t.z,_=Math.sqrt(u*u+d*d+m*m),v=Math.abs(_-a);if(v<c){const f=(1-v/c)*2/(_||1);s[h]+=u*f,s[h+1]+=d*f,s[h+2]+=m*f}}}applyTurbulence(t,n,i,r){const s=this.positionAttr.array,o=this.acceleration,a=this.count;for(let c=0;c<a;c++){const l=c*3,h=s[l]-t.x,u=s[l+1]-t.y,d=s[l+2]-t.z,m=h*h+u*u+d*d,_=15;if(m<_*_){const v=r*i+c*.7;o[l]+=Math.sin(v*1.1)*n,o[l+1]+=Math.cos(v*.9)*n,o[l+2]+=Math.sin(v*1.3)*n}}}setGlobalColorShift(t){for(let n=0;n<this.count;n++)this.baseHue[n]=(this.baseHue[n]+t)%1}getCount(){return this.count}}const he=new bx;class Ax{constructor(){ne(this,"current",null);ne(this,"transitionProgress",1);ne(this,"transitionSpeed",3);ne(this,"lastElapsed",0)}init(){Qe.on("gesture:update",t=>this.onGesture(t)),Qe.on("gesture:changed",t=>this.onGestureChanged(t)),Qe.on("keyboard:gesture",t=>this.onGesture(t)),Qe.on("frame",({elapsed:t})=>this.onFrame(t))}onGesture(t){this.current=t}onGestureChanged(t){t.type!=="none"&&he.triggerBurst(t.origin,3),this.transitionProgress=0}onFrame(t){var o;if(!this.current||this.current.type==="none")return;const n=t-this.lastElapsed;this.lastElapsed=t,this.transitionProgress=Math.min(1,this.transitionProgress+this.transitionSpeed*n);const i=this.current.intensity*this.transitionProgress,r=this.current,s=r.origin;switch(r.type){case"open_palm":he.applyRadialForce(s,i*2,15);break;case"closed_fist":he.applyRadialForce(s,-i*3,12);break;case"pinch":he.applyVortex(s,{x:0,y:0,z:1},i*4,8);break;case"pointing":{const a=r.direction||{x:0,y:0,z:-1};he.applyDirectionalForce(a,i*3);break}case"peace":he.applyRadialForce(s,i*1.5,15),he.applyVortex(s,{x:0,y:1,z:0},i*2,10);break;case"rock":he.applyTurbulence(s,i*.5,8,t);break;case"thumbs_up":he.applyDirectionalForce({x:0,y:1,z:0},i*1.5),he.applyTurbulence(s,i*.3,4,t);break;case"swipe_left":he.applyDirectionalForce({x:-1,y:0,z:0},i*5);break;case"swipe_right":he.applyDirectionalForce({x:1,y:0,z:0},i*5);break;case"swipe_up":he.applyDirectionalForce({x:0,y:1,z:0},i*5);break;case"swipe_down":he.applyDirectionalForce({x:0,y:-1,z:0},i*6),he.applyRadialForce(s,-i*2,20);break;case"two_spread":he.triggerBurst(s,i*4),he.applyRadialForce(s,i*2,30);break;case"two_clap":he.triggerBurst(s,i*6),he.applyRadialForce(s,-i*3,10);break;case"two_pull":{const a=r.direction||{x:1,y:0,z:0};he.applyDirectionalForce(a,i*2),he.applyDirectionalForce({x:-a.x,y:-a.y,z:-a.z},i*2);break}case"two_push":he.applyRadialForce(s,-i*4,20);break;case"two_orbit":he.applyVortex(s,{x:0,y:1,z:0},i*2,20);break;case"two_mirror":he.applyRadialForce(s,i*1.5,20);break;case"two_scale":he.applyRadialForce(s,i*(((o=r.direction)==null?void 0:o.x)||1)*2,25);break}}}const wx=new Ax,Rx={1:"open_palm",2:"closed_fist",3:"pinch",4:"pointing",5:"peace",6:"rock",7:"thumbs_up",8:"swipe_left",9:"swipe_right",0:"swipe_up",q:"swipe_down",w:"two_spread",e:"two_clap"};class Cx{constructor(){ne(this,"active",!1)}init(){window.addEventListener("keydown",t=>this.onKeyDown(t)),this.active=!0}onKeyDown(t){if(!this.active)return;const n=Rx[t.key];if(!n)return;t.preventDefault();const i={type:n,confidence:1,origin:{x:0,y:0,z:0},intensity:.8,handedness:"right",timestamp:performance.now()};n==="swipe_left"&&(i.direction={x:-1,y:0,z:0}),n==="swipe_right"&&(i.direction={x:1,y:0,z:0}),n==="swipe_up"&&(i.direction={x:0,y:1,z:0}),n==="swipe_down"&&(i.direction={x:0,y:-1,z:0}),Qe.emit("keyboard:gesture",i),Qe.emit("gesture:changed",i)}}const Px=new Cx;var as=typeof self<"u"?self:{};function Xf(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=as,r=0;r<n.length;r++)if((i=i[n[r]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function rr(){throw Error("Invalid UTF8")}function Qu(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let Ho,gc;const Lx=typeof TextDecoder<"u";let Dx;const Ix=typeof TextEncoder<"u";function qf(e){if(Ix)e=(Dx||(Dx=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let r=0;r<e.length;r++){var t=e.charCodeAt(r);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&r<e.length){const s=e.charCodeAt(++r);if(s>=56320&&s<=57343){t=1024*(t-55296)+s-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}r--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function Yf(e){as.setTimeout((()=>{throw e}),0)}var _l,Ux=Xf(610401301,!1),td=Xf(748402147,!0);function ed(){var e=as.navigator;return e&&(e=e.userAgent)?e:""}const nd=as.navigator;function ga(e){return ga[" "](e),e}_l=nd&&nd.userAgentData||null,ga[" "]=function(){};const jf={};let Gs=null;function Nx(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let r=0;return(function(s,o){function a(l){for(;c<s.length;){const h=s.charAt(c++),u=Gs[h];if(u!=null)return u;if(!/^[\s\xa0]*$/.test(h))throw Error("Unknown base64 encoding at char: "+h)}return l}Kf();let c=0;for(;;){const l=a(-1),h=a(0),u=a(64),d=a(64);if(d===64&&l===-1)break;o(l<<2|h>>4),u!=64&&(o(h<<4&240|u>>2),d!=64&&o(u<<6&192|d))}})(e,(function(s){i[r++]=s})),r!==n?i.subarray(0,r):i}function Kf(){if(!Gs){Gs={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));jf[n]=i;for(let r=0;r<i.length;r++){const s=i[r];Gs[s]===void 0&&(Gs[s]=r)}}}}var Fx=typeof Uint8Array<"u",Zf=!(!(Ux&&_l&&_l.brands.length>0)&&(ed().indexOf("Trident")!=-1||ed().indexOf("MSIE")!=-1))&&typeof btoa=="function";const id=/[-_.]/g,Ox={"-":"+",_:"/",".":"="};function Bx(e){return Ox[e]||""}function $f(e){if(!Zf)return Nx(e);e=id.test(e)?e.replace(id,Bx):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function Yl(e){return Fx&&e!=null&&e instanceof Uint8Array}var cs={};function Sr(){return kx||(kx=new ii(null,cs))}function jl(e){Jf(cs);var t=e.g;return(t=t==null||Yl(t)?t:typeof t=="string"?$f(t):null)==null?t:e.g=t}var ii=class{h(){return new Uint8Array(jl(this)||0)}constructor(e,t){if(Jf(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let kx,zx;function Jf(e){if(e!==cs)throw Error("illegal external caller")}function Qf(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function gl(e){return Qf(e=Error(e),"warning"),e}function ls(e,t){if(e!=null){var n=zx??(zx={}),i=n[e]||0;i>=t||(n[e]=i+1,Qf(e=Error(),"incident"),Yf(e))}}function Ms(){return typeof BigInt=="function"}var ys=typeof Symbol=="function"&&typeof Symbol()=="symbol";function si(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var Hx=si("jas",void 0,!0),rd=si(void 0,"0di"),ks=si(void 0,"1oa"),vn=si(void 0,Symbol()),Gx=si(void 0,"0ub"),Vx=si(void 0,"0ubs"),vl=si(void 0,"0ubsb"),Wx=si(void 0,"0actk"),hs=si("m_m","Pa",!0),sd=si();const tp={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},ep=Object.defineProperties,gt=ys?Hx:"Ga";var Ar;const od=[];function ro(e,t){ys||gt in e||ep(e,tp),e[gt]|=t}function ke(e,t){ys||gt in e||ep(e,tp),e[gt]=t}function so(e){return ro(e,34),e}function js(e){return ro(e,8192),e}ke(od,7),Ar=Object.freeze(od);var us={};function Mn(e,t){return t===void 0?e.h!==Er&&!!(2&(0|e.v[gt])):!!(2&t)&&e.h!==Er}const Er={};function Kl(e,t){if(e!=null){if(typeof e=="string")e=e?new ii(e,cs):Sr();else if(e.constructor!==ii)if(Yl(e))e=e.length?new ii(new Uint8Array(e),cs):Sr();else{if(!t)throw Error();e=void 0}}return e}class ad{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var Xx=Object.freeze({});function np(e,t,n){const i=128&t?0:-1,r=e.length;var s;(s=!!r)&&(s=(s=e[r-1])!=null&&typeof s=="object"&&s.constructor===Object);const o=r+(s?-1:0);for(t=128&t?1:0;t<o;t++)n(t-i,e[t]);if(s){e=e[r-1];for(const a in e)!isNaN(a)&&n(+a,e[a])}}var ip={};function Ss(e){return 128&e?ip:void 0}function va(e){return e.Na=!0,e}var qx=va((e=>typeof e=="number")),cd=va((e=>typeof e=="string")),Yx=va((e=>typeof e=="boolean")),xa=typeof as.BigInt=="function"&&typeof as.BigInt(0)=="bigint";function xn(e){var t=e;if(cd(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(qx(t)&&!Number.isSafeInteger(t))throw Error(String(t));return xa?BigInt(e):e=Yx(e)?e?"1":"0":cd(e)?e.trim()||"0":String(e)}var xl=va((e=>xa?e>=Kx&&e<=$x:e[0]==="-"?ld(e,jx):ld(e,Zx)));const jx=Number.MIN_SAFE_INTEGER.toString(),Kx=xa?BigInt(Number.MIN_SAFE_INTEGER):void 0,Zx=Number.MAX_SAFE_INTEGER.toString(),$x=xa?BigInt(Number.MAX_SAFE_INTEGER):void 0;function ld(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],r=t[n];if(i>r)return!1;if(i<r)return!0}}const Jx=typeof Uint8Array.prototype.slice=="function";let Qx,ve=0,Pe=0;function hd(e){const t=e>>>0;ve=t,Pe=(e-t)/4294967296>>>0}function ds(e){if(e<0){hd(-e);const[t,n]=Jl(ve,Pe);ve=t>>>0,Pe=n>>>0}else hd(e)}function Zl(e){const t=Qx||(Qx=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),Pe=0,ve=t.getUint32(0,!0)}function rp(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:Ks(e,t)}function t3(e,t){return xn(Ms()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):Ks(e,t))}function sp(e,t){return Ms()?xn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):xn($l(e,t))}function Ks(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else Ms()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+ud(n)+ud(e));return n}function ud(e){return e=String(e),"0000000".slice(e.length)+e}function $l(e,t){if(2147483648&t)if(Ms())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=Jl(e,t);e="-"+Ks(n,i)}else e=Ks(e,t);return e}function Ma(e){if(e.length<16)ds(Number(e));else if(Ms())e=BigInt(e),ve=Number(e&BigInt(4294967295))>>>0,Pe=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");Pe=ve=0;const n=e.length;for(let i=t,r=(n-t)%6+t;r<=n;i=r,r+=6){const s=Number(e.slice(i,r));Pe*=1e6,ve=1e6*ve+s,ve>=4294967296&&(Pe+=Math.trunc(ve/4294967296),Pe>>>=0,ve>>>=0)}if(t){const[i,r]=Jl(ve,Pe);ve=i,Pe=r}}}function Jl(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function Wn(e){return Array.prototype.slice.call(e)}const oo=typeof BigInt=="function"?BigInt.asIntN:void 0,e3=typeof BigInt=="function"?BigInt.asUintN:void 0,Tr=Number.isSafeInteger,ya=Number.isFinite,fs=Math.trunc,n3=xn(0);function Vs(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function ei(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function Zs(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function op(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const i3=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function ao(e){switch(typeof e){case"bigint":return!0;case"number":return ya(e);case"string":return i3.test(e);default:return!1}}function Es(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return ya(e)?0|e:void 0}function ap(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return ya(e)?e>>>0:void 0}function cp(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(Ma(e),$l(ve,Pe))}function Ql(e){if(e=fs(e),!Tr(e)){ds(e);var t=ve,n=Pe;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=rp(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function lp(e){var t=fs(Number(e));return Tr(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),cp(e))}function hp(e){var t=fs(Number(e));return Tr(t)?xn(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),Ms()?xn(oo(64,BigInt(e))):xn(cp(e)))}function up(e){return Tr(e)?e=xn(Ql(e)):(e=fs(e),Tr(e)?e=String(e):(ds(e),e=$l(ve,Pe)),e=xn(e)),e}function sa(e){const t=typeof e;return e==null?e:t==="bigint"?xn(oo(64,e)):ao(e)?t==="string"?hp(e):up(e):void 0}function dp(e){if(typeof e!="string")throw Error();return e}function co(e){if(e!=null&&typeof e!="string")throw Error();return e}function Ve(e){return e==null||typeof e=="string"?e:void 0}function th(e,t,n,i){return e!=null&&e[hs]===us?e:Array.isArray(e)?((i=(n=0|e[gt])|32&i|2&i)!==n&&ke(e,i),new t(e)):(n?2&i?((e=t[rd])||(so((e=new t).v),e=t[rd]=e),t=e):t=new t:t=void 0,t)}function r3(e,t,n){if(t)t:{if(!ao(t=e))throw gl("int64");switch(typeof t){case"string":t=hp(t);break t;case"bigint":t=xn(oo(64,t));break t;default:t=up(t)}}else t=sa(e);return(e=t)==null?n?n3:void 0:e}const s3={};let o3=(function(){try{return ga(new class extends Map{constructor(){super()}}),!1}catch{return!0}})();class vc{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const a3=o3?(Object.setPrototypeOf(vc.prototype,Map.prototype),Object.defineProperties(vc.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),vc):class extends Map{constructor(){super()}};function dd(e){return e}function xc(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var bi=class extends a3{constructor(e,t,n=dd,i=dd){super(),this.J=0|e[gt],this.K=t,this.S=n,this.fa=this.K?c3:i;for(let r=0;r<e.length;r++){const s=e[r],o=n(s[0],!1,!0);let a=s[1];t?a===void 0&&(a=null):a=i(s[1],!1,!0,void 0,void 0,this.J),super.set(o,a)}}V(e){return js(Array.from(super.entries(),e))}clear(){xc(this),super.clear()}delete(e){return xc(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new ad(e,l3,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new ad(e,bi.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach(((n,i,r)=>{e.call(t,r.get(i),i,r)})):super.forEach(e,t)}set(e,t){return xc(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function c3(e,t,n,i,r,s){return e=th(e,i,n,s),r&&(e=nh(e)),e}function l3(e){return[e,this.get(e)]}let h3;function fd(){return h3||(h3=new bi(so([]),void 0,void 0,void 0,s3))}function Sa(e){return vn?e[vn]:void 0}function oa(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}bi.prototype.toJSON=void 0;var Ml=class{};const u3={Ka:!0};function d3(e,t){t<100||ls(Vx,1)}function Ea(e,t,n,i){const r=i!==void 0;i=!!i;var s,o=vn;!r&&ys&&o&&(s=e[o])&&oa(s,d3),o=[];var a=e.length;let c;s=4294967295;let l=!1;const h=!!(64&t),u=h?128&t?0:-1:void 0;1&t||(c=a&&e[a-1],c!=null&&typeof c=="object"&&c.constructor===Object?s=--a:c=void 0,!h||128&t||r||(l=!0,s=s-u+u)),t=void 0;for(var d=0;d<a;d++){let m=e[d];if(m!=null&&(m=n(m,i))!=null)if(h&&d>=s){const _=d-u;(t??(t={}))[_]=m}else o[d]=m}if(c)for(let m in c){if((a=c[m])==null||(a=n(a,i))==null)continue;let _;d=+m,h&&!Number.isNaN(d)&&(_=d+u)<s?o[_]=a:(t??(t={}))[m]=a}return t&&(l?o.push(t):o[s]=t),r&&vn&&(e=Sa(e))&&e instanceof Ml&&(o[vn]=(function(m){const _=new Ml;return oa(m,((v,p,f)=>{_[p]=Wn(f)})),_.da=m.da,_})(e)),o}function f3(e){return e[0]=$s(e[0]),e[1]=$s(e[1]),e}function $s(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return xl(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[gt];return e.length===0&&1&t?void 0:Ea(e,t,$s)}if(e!=null&&e[hs]===us)return fp(e);if(e instanceof ii){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if(Zf){for(var n="",i=0,r=t.length-10240;i<r;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),Kf(),n=jf[n],i=Array(Math.floor(t.length/3)),r=n[64]||"";let l=0,h=0;for(;l<t.length-2;l+=3){var s=t[l],o=t[l+1],a=t[l+2],c=n[s>>2];s=n[(3&s)<<4|o>>4],o=n[(15&o)<<2|a>>6],a=n[63&a],i[h++]=c+s+o+a}switch(c=0,a=r,t.length-l){case 2:a=n[(15&(c=t[l+1]))<<2]||r;case 1:t=t[l],i[h]=n[t>>2]+n[(3&t)<<4|c>>4]+a+r}t=i.join("")}e=e.g=t}return e}return e instanceof bi?e=e.size!==0?e.V(f3):void 0:void 0}return e}let p3,m3;function fp(e){return Ea(e=e.v,0|e[gt],$s)}function pr(e,t){return pp(e,t[0],t[1])}function pp(e,t,n,i=0){if(e==null){var r=32;n?(e=[n],r|=128):e=[],t&&(r=-16760833&r|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(r=0|e[gt],td&&1&r)throw Error("rfarr");if(2048&r&&!(2&r)&&(function(){if(td)throw Error("carr");ls(Wx,5)})(),256&r)throw Error("farr");if(64&r)return(r|i)!==r&&ke(e,r|i),e;if(n&&(r|=128,n!==e[0]))throw Error("mid");t:{r|=64;var s=(n=e).length;if(s){var o=s-1;const c=n[o];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((o-=t=128&r?0:-1)>=1024)throw Error("pvtlmt");for(var a in c)(s=+a)<o&&(n[s+t]=c[a],delete c[a]);r=-16760833&r|(1023&o)<<14;break t}}if(t){if((a=Math.max(t,s-(128&r?0:-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&a)<<14}}}return ke(e,64|r|i),e}function _3(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[gt];return e.length===0&&1&n?void 0:pd(e,n,t)}if(e!=null&&e[hs]===us)return md(e);if(e instanceof bi){if(2&(t=e.J))return e;if(!e.size)return;if(n=so(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let r=i[1];r=r==null||typeof r!="object"?void 0:r!=null&&r[hs]===us?md(r):Array.isArray(r)?pd(r,0|r[gt],!!(32&t)):void 0,i[1]=r}return n}return e instanceof ii?e:void 0}function pd(e,t,n){return 2&t||(!n||4096&t||16&t?e=Ts(e,t,!1,n&&!(16&t)):(ro(e,34),4&t&&Object.freeze(e))),e}function eh(e,t,n){return e=new e.constructor(t),n&&(e.h=Er),e.m=Er,e}function md(e){const t=e.v,n=0|t[gt];return Mn(e,n)?e:ih(e,t,n)?eh(e,t):Ts(t,n)}function Ts(e,t,n,i){return i??(i=!!(34&t)),e=Ea(e,t,_3,i),i=32,n&&(i|=2),ke(e,t=16769217&t|i),e}function nh(e){const t=e.v,n=0|t[gt];return Mn(e,n)?ih(e,t,n)?eh(e,t,!0):new e.constructor(Ts(t,n,!1)):e}function bs(e){if(e.h!==Er)return!1;var t=e.v;return ro(t=Ts(t,0|t[gt]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function As(e){if(!bs(e)&&Mn(e,0|e.v[gt]))throw Error()}function wr(e,t){t===void 0&&(t=0|e[gt]),32&t&&!(4096&t)&&ke(e,4096|t)}function ih(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(ke(t,2|n),e.h=Er,!0)}const mp=xn(0),Oi={};function xe(e,t,n,i,r){if((t=Ai(e.v,t,n,r))!==null||i&&e.m!==Er)return t}function Ai(e,t,n,i){if(t===-1)return null;const r=t+(n?0:-1),s=e.length-1;let o,a;if(!(s<1+(n?0:-1))){if(r>=s)if(o=e[s],o!=null&&typeof o=="object"&&o.constructor===Object)n=o[t],a=!0;else{if(r!==s)return;n=o}else n=e[r];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return a?o[t]=i:e[r]=i,i}return n}}function se(e,t,n,i){As(e),Ne(e=e.v,0|e[gt],t,n,i)}function Ne(e,t,n,i,r){const s=n+(r?0:-1);var o=e.length-1;if(o>=1+(r?0:-1)&&s>=o){const a=e[o];if(a!=null&&typeof a=="object"&&a.constructor===Object)return a[n]=i,t}return s<=o?(e[s]=i,t):(i!==void 0&&(n>=(o=(t??(t=0|e[gt]))>>14&1023||536870912)?i!=null&&(e[o+(r?0:-1)]={[n]:i}):e[s]=i),t)}function dr(){return Xx===void 0?2:4}function fr(e,t,n,i,r){let s=e.v,o=0|s[gt];i=Mn(e,o)?1:i,r=!!r||i===3,i===2&&bs(e)&&(s=e.v,o=0|s[gt]);let a=(e=rh(s,t))===Ar?7:0|e[gt],c=sh(a,o);var l=!(4&c);if(l){4&c&&(e=Wn(e),a=0,c=_r(c,o),o=Ne(s,o,t,e));let h=0,u=0;for(;h<e.length;h++){const d=n(e[h]);d!=null&&(e[u++]=d)}u<h&&(e.length=u),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==a&&(ke(e,c),2&c&&Object.freeze(e)),_p(e,c,s,o,t,i,l,r)}function _p(e,t,n,i,r,s,o,a){let c=t;return s===1||s===4&&(2&t||!(16&t)&&32&i)?mr(t)||((t|=!e.length||o&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==c&&ke(e,t),Object.freeze(e)):(s===2&&mr(t)&&(e=Wn(e),c=0,t=_r(t,i),i=Ne(n,i,r,e)),mr(t)||(a||(t|=16),t!==c&&ke(e,t))),2&t||!(4096&t||16&t)||wr(n,i),e}function rh(e,t,n){return e=Ai(e,t,n),Array.isArray(e)?e:Ar}function sh(e,t){return 2&t&&(e|=2),1|e}function mr(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function gp(e){return Kl(e,!0)}function vp(e){e=Wn(e);for(let t=0;t<e.length;t++){const n=e[t]=Wn(e[t]);Array.isArray(n[1])&&(n[1]=so(n[1]))}return js(e)}function zi(e,t,n,i){As(e),Ne(e=e.v,0|e[gt],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function ws(e,t,n){if(2&t)throw Error();const i=Ss(t);let r=rh(e,n,i),s=r===Ar?7:0|r[gt],o=sh(s,t);return(2&o||mr(o)||16&o)&&(o===s||mr(o)||ke(r,o),r=Wn(r),s=0,o=_r(o,t),Ne(e,t,n,r,i)),o&=-13,o!==s&&ke(r,o),r}function Mc(e,t){var n=lm;return ah(oh(e=e.v),e,void 0,n)===t?t:-1}function oh(e){if(ys)return e[ks]??(e[ks]=new Map);if(ks in e)return e[ks];const t=new Map;return Object.defineProperty(e,ks,{value:t}),t}function xp(e,t,n,i,r){const s=oh(e),o=ah(s,e,t,n,r);return o!==i&&(o&&(t=Ne(e,t,o,void 0,r)),s.set(n,i)),t}function ah(e,t,n,i,r){let s=e.get(i);if(s!=null)return s;s=0;for(let o=0;o<i.length;o++){const a=i[o];Ai(t,a,r)!=null&&(s!==0&&(n=Ne(t,n,s,void 0,r)),s=a)}return e.set(i,s),s}function ch(e,t,n){let i=0|e[gt];const r=Ss(i),s=Ai(e,n,r);let o;if(s!=null&&s[hs]===us){if(!Mn(s))return bs(s),s.v;o=s.v}else Array.isArray(s)&&(o=s);if(o){const a=0|o[gt];2&a&&(o=Ts(o,a))}return o=pr(o,t),o!==s&&Ne(e,i,n,o,r),o}function Mp(e,t,n,i,r){let s=!1;if((i=Ai(e,i,r,(o=>{const a=th(o,n,!1,t);return s=a!==o&&a!=null,a})))!=null)return s&&!Mn(i)&&wr(e,t),i}function $t(e,t,n,i){let r=e.v,s=0|r[gt];if((t=Mp(r,s,t,n,i))==null)return t;if(s=0|r[gt],!Mn(e,s)){const o=nh(t);o!==t&&(bs(e)&&(r=e.v,s=0|r[gt]),s=Ne(r,s,n,t=o,i),wr(r,s))}return t}function yp(e,t,n,i,r,s,o,a){var c=Mn(e,n);s=c?1:s,o=!!o||s===3,c=a&&!c,(s===2||c)&&bs(e)&&(n=0|(t=e.v)[gt]);var l=(e=rh(t,r))===Ar?7:0|e[gt],h=sh(l,n);if(a=!(4&h)){var u=e,d=n;const m=!!(2&h);m&&(d|=2);let _=!m,v=!0,p=0,f=0;for(;p<u.length;p++){const b=th(u[p],i,!1,d);if(b instanceof i){if(!m){const T=Mn(b);_&&(_=!T),v&&(v=T)}u[f++]=b}}f<p&&(u.length=f),h|=4,h=v?-4097&h:4096|h,h=_?8|h:-9&h}if(h!==l&&(ke(e,h),2&h&&Object.freeze(e)),c&&!(8&h||!e.length&&(s===1||s===4&&(2&h||!(16&h)&&32&n)))){for(mr(h)&&(e=Wn(e),h=_r(h,n),n=Ne(t,n,r,e)),i=e,c=h,l=0;l<i.length;l++)(u=i[l])!==(h=nh(u))&&(i[l]=h);c|=8,ke(e,h=c=i.length?4096|c:-4097&c)}return _p(e,h,t,n,r,s,a,o)}function wi(e,t,n){const i=e.v;return yp(e,i,0|i[gt],t,n,dr(),!1,!0)}function Sp(e){return e==null&&(e=void 0),e}function bt(e,t,n,i,r){return se(e,n,i=Sp(i),r),i&&!Mn(i)&&wr(e.v),e}function Ws(e,t,n,i){t:{var r=i=Sp(i);As(e);const s=e.v;let o=0|s[gt];if(r==null){const a=oh(s);if(ah(a,s,o,n)!==t)break t;a.set(n,0)}else o=xp(s,o,n,t);Ne(s,o,t,r)}i&&!Mn(i)&&wr(e.v)}function _r(e,t){return-273&(2&t?2|e:-3&e)}function lh(e,t,n,i){var r=i;As(e),e=yp(e,i=e.v,0|i[gt],n,t,2,!0),r=r??new n,e.push(r),t=n=e===Ar?7:0|e[gt],(r=Mn(r))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&ke(e,n),r||wr(i)}function In(e,t,n){return Es(xe(e,t,void 0,n))}function Ae(e,t){return xe(e,t,void 0,void 0,ei)??0}function Ri(e,t,n){if(n!=null){if(typeof n!="number"||!ya(n))throw gl("int32");n|=0}se(e,t,n)}function Et(e,t,n){se(e,t,Vs(n))}function yn(e,t,n){zi(e,t,co(n),"")}function aa(e,t,n){{As(e);const o=e.v;let a=0|o[gt];if(n==null)Ne(o,a,t);else{var i=e=n===Ar?7:0|n[gt],r=mr(e),s=r||Object.isFrozen(n);for(r||(e=0),s||(n=Wn(n),i=0,e=_r(e,a),s=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,r=0;r<n.length;r++){const c=n[r],l=dp(c);Object.is(c,l)||(s&&(n=Wn(n),i=0,e=_r(e,a),s=!1),n[r]=l)}e!==i&&(s&&(n=Wn(n),e=_r(e,a)),ke(n,e)),Ne(o,a,t,n)}}}function Ta(e,t,n){As(e),fr(e,t,Ve,2,!0).push(dp(n))}var Wr=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function hh(e,t){if(typeof e=="string")return new Wr($f(e),t);if(Array.isArray(e))return new Wr(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new Wr(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new Wr(e,!1);if(e.constructor===ii)return t=jl(e)||new Uint8Array(0),new Wr(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new Wr(e,!1);throw Error()}function uh(e,t){let n,i=0,r=0,s=0;const o=e.h;let a=e.g;do n=o[a++],i|=(127&n)<<s,s+=7;while(s<32&&128&n);if(s>32)for(r|=(127&n)>>4,s=3;s<32&&128&n;s+=7)n=o[a++],r|=(127&n)<<s;if(gr(e,a),!(128&n))return t(i>>>0,r>>>0);throw Error()}function dh(e){let t=0,n=e.g;const i=n+10,r=e.h;for(;n<i;){const s=r[n++];if(t|=s,(128&s)==0)return gr(e,n),!!(127&t)}throw Error()}function ji(e){const t=e.h;let n=e.g,i=t[n++],r=127&i;if(128&i&&(i=t[n++],r|=(127&i)<<7,128&i&&(i=t[n++],r|=(127&i)<<14,128&i&&(i=t[n++],r|=(127&i)<<21,128&i&&(i=t[n++],r|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return gr(e,n),r}function ri(e){return ji(e)>>>0}function ca(e){var t=e.h;const n=e.g;var i=t[n],r=t[n+1];const s=t[n+2];return t=t[n+3],gr(e,e.g+4),e=2*((r=(i<<0|r<<8|s<<16|t<<24)>>>0)>>31)+1,i=r>>>23&255,r&=8388607,i==255?r?NaN:e*(1/0):i==0?1401298464324817e-60*e*r:e*Math.pow(2,i-150)*(r+8388608)}function g3(e){return ji(e)}function gr(e,t){if(e.g=t,t>e.l)throw Error()}function Ep(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function Tp(e,t){if(t==0)return Sr();var n=Ep(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):Jx?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Sr():new ii(n,cs)}var _d=[];function bp(e,t,n,i){if(la.length){const r=la.pop();return r.o(i),r.g.init(e,t,n,i),r}return new v3(e,t,n,i)}function Ap(e){e.g.clear(),e.l=-1,e.h=-1,la.length<100&&la.push(e)}function wp(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=ri(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function ea(e){switch(e.h){case 0:e.h!=0?ea(e):dh(e.g);break;case 1:gr(e=e.g,e.g+8);break;case 2:if(e.h!=2)ea(e);else{var t=ri(e.g);gr(e=e.g,e.g+t)}break;case 5:gr(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!wp(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}ea(e)}break;default:throw Error()}}function lo(e,t,n){const i=e.g.l;var r=ri(e.g);let s=(r=e.g.g+r)-i;if(s<=0&&(e.g.l=r,n(t,e,void 0,void 0,void 0),s=r-e.g.g),s)throw Error();return e.g.g=r,e.g.l=i,t}function fh(e){var t=ri(e.g),n=Ep(e=e.g,t);if(e=e.h,Lx){var i,r=e;(i=gc)||(i=gc=new TextDecoder("utf-8",{fatal:!0})),t=n+t,r=n===0&&t===r.length?r:r.subarray(n,t);try{var s=i.decode(r)}catch(a){if(Ho===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),Ho=!0}catch{Ho=!1}}throw!Ho&&(gc=void 0),a}}else{t=(s=n)+t,n=[];let a,c=null;for(;s<t;){var o=e[s++];o<128?n.push(o):o<224?s>=t?rr():(a=e[s++],o<194||(192&a)!=128?(s--,rr()):n.push((31&o)<<6|63&a)):o<240?s>=t-1?rr():(a=e[s++],(192&a)!=128||o===224&&a<160||o===237&&a>=160||(192&(i=e[s++]))!=128?(s--,rr()):n.push((15&o)<<12|(63&a)<<6|63&i)):o<=244?s>=t-2?rr():(a=e[s++],(192&a)!=128||a-144+(o<<28)>>30!=0||(192&(i=e[s++]))!=128||(192&(r=e[s++]))!=128?(s--,rr()):(o=(7&o)<<18|(63&a)<<12|(63&i)<<6|63&r,o-=65536,n.push(55296+(o>>10&1023),56320+(1023&o)))):rr(),n.length>=8192&&(c=Qu(c,n),n.length=0)}s=Qu(c,n)}return s}function Rp(e){const t=ri(e.g);return Tp(e.g,t)}function ba(e,t,n){var i=ri(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var v3=class{constructor(e,t,n,i){if(_d.length){const r=_d.pop();r.init(e,t,n,i),e=r}else e=new class{constructor(r,s,o,a){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(r,s,o,a)}init(r,s,o,{Y:a=!1,ea:c=!1}={}){this.Y=a,this.ea=c,r&&(r=hh(r,this.ea),this.h=r.buffer,this.j=r.g,this.m=s||0,this.l=o!==void 0?this.m+o:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},la=[];function gd(e){return e?/^\d+$/.test(e)?(Ma(e),new yl(ve,Pe)):null:x3||(x3=new yl(0,0))}var yl=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let x3;function vd(e){return e?/^-?\d+$/.test(e)?(Ma(e),new Sl(ve,Pe)):null:M3||(M3=new Sl(0,0))}var Sl=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let M3;function Qr(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function Rs(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function Aa(e,t){if(t>=0)Rs(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function ph(e){var t=ve;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function ps(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function Un(e,t,n){Rs(e.g,8*t+n)}function mh(e,t){return Un(e,t,2),t=e.g.end(),ps(e,t),t.push(e.h),t}function _h(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function wa(e,t,n){Un(e,t,2),Rs(e.g,n.length),ps(e,e.g.end()),ps(e,n)}function ha(e,t,n,i){n!=null&&(t=mh(e,t),i(n,e),_h(e,t))}function oi(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var gh=oi(),Cp=oi(),vh=oi(),xh=oi(),Mh=oi(),Pp=oi(),y3=oi(),Ra=oi(),Lp=oi(),Dp=oi();function ai(e,t,n){var i=e.v;vn&&vn in i&&(i=i[vn])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var vt=class{constructor(e,t){this.v=pp(e,t,void 0,2048)}toJSON(){return fp(this)}j(){var r;var e=nM,t=this.v,n=e.g,i=vn;if(ys&&i&&((r=t[i])==null?void 0:r[n])!=null&&ls(Gx,3),t=e.g,sd&&vn&&sd===void 0&&(i=(n=this.v)[vn])&&(i=i.da))try{i(n,t,u3)}catch(s){Yf(s)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[gt];return ih(this,e,t)?eh(this,e,!0):new this.constructor(Ts(e,t,!1))}};vt.prototype[hs]=us,vt.prototype.toString=function(){return this.v.toString()};var Cs=class{constructor(e,t,n){this.g=e,this.h=t,e=gh,this.l=!!e&&n===e||!1}};function Ca(e,t){return new Cs(e,t,gh)}function Ip(e,t,n,i,r){ha(e,n,Op(t,i),r)}const S3=Ca((function(e,t,n,i,r){return e.h===2&&(lo(e,ch(t,i,n),r),!0)}),Ip),E3=Ca((function(e,t,n,i,r){return e.h===2&&(lo(e,ch(t,i,n),r),!0)}),Ip);var Pa=Symbol(),La=Symbol(),El=Symbol(),xd=Symbol(),Md=Symbol();let Up,Np;function Rr(e,t,n,i){var r=i[e];if(r)return r;(r={}).qa=i,r.T=(function(u){switch(typeof u){case"boolean":return p3||(p3=[0,void 0,!0]);case"number":return u>0?void 0:u===0?m3||(m3=[0,void 0]):[-u,void 0];case"string":return[0,u];case"object":return u}})(i[0]);var s=i[1];let o=1;s&&s.constructor===Object&&(r.ba=s,typeof(s=i[++o])=="function"&&(r.ma=!0,Up??(Up=s),Np??(Np=i[o+1]),s=i[o+=2]));const a={};for(;s&&Array.isArray(s)&&s.length&&typeof s[0]=="number"&&s[0]>0;){for(var c=0;c<s.length;c++)a[s[c]]=s;s=i[++o]}for(c=1;s!==void 0;){let u;typeof s=="number"&&(c+=s,s=i[++o]);var l=void 0;if(s instanceof Cs?u=s:(u=S3,o--),u==null?void 0:u.l){s=i[++o],l=i;var h=o;typeof s=="function"&&(s=s(),l[h]=s),l=s}for(h=c+1,typeof(s=i[++o])=="number"&&s<0&&(h-=s,s=i[++o]);c<h;c++){const d=a[c];l?n(r,c,u,l,d):t(r,c,u,d)}}return i[e]=r}function Fp(e){return Array.isArray(e)?e[0]instanceof Cs?e:[E3,e]:[e,void 0]}function Op(e,t){return e instanceof vt?e.v:Array.isArray(e)?pr(e,t):void 0}function yh(e,t,n,i){const r=n.g;e[t]=i?(s,o,a)=>r(s,o,a,i):r}function Sh(e,t,n,i,r){const s=n.g;let o,a;e[t]=(c,l,h)=>s(c,l,h,a||(a=Rr(La,yh,Sh,i).T),o||(o=Eh(i)),r)}function Eh(e){let t=e[El];if(t!=null)return t;const n=Rr(La,yh,Sh,e);return t=n.ma?(i,r)=>Up(i,r,n):(i,r)=>{for(;wp(r)&&r.h!=4;){var s=r.l,o=n[s];if(o==null){var a=n.ba;a&&(a=a[s])&&(a=b3(a))!=null&&(o=n[s]=a)}if(o==null||!o(r,i,s)){if(o=(a=r).m,ea(a),a.ha)var c=void 0;else c=a.g.g-o,a.g.g=o,c=Tp(a.g,c);o=void 0,a=i,c&&((o=a[vn]??(a[vn]=new Ml))[s]??(o[s]=[])).push(c)}}return(i=Sa(i))&&(i.da=n.qa[Md]),!0},e[El]=t,e[Md]=T3.bind(e),t}function T3(e,t,n,i){var r=this[La];const s=this[El],o=pr(void 0,r.T),a=Sa(e);if(a){var c=!1,l=r.ba;if(l){if(r=(h,u,d)=>{if(d.length!==0)if(l[u])for(const m of d){h=bp(m);try{c=!0,s(o,h)}finally{Ap(h)}}else i==null||i(e,u,d)},t==null)oa(a,r);else if(a!=null){const h=a[t];h&&r(a,t,h)}if(c){let h=0|e[gt];if(2&h&&2048&h&&!(n!=null&&n.Ka))throw Error();const u=Ss(h),d=(m,_)=>{if(Ai(e,m,u)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}_!=null&&(h=Ne(e,h,m,_,u)),delete a[m]};t==null?np(o,0|o[gt],((m,_)=>{d(m,_)})):d(t,Ai(o,t,u))}}}}function b3(e){const t=(e=Fp(e))[0].g;if(e=e[1]){const n=Eh(e),i=Rr(La,yh,Sh,e).T;return(r,s,o)=>t(r,s,o,i,n)}return t}function Da(e,t,n){e[t]=n.h}function Ia(e,t,n,i){let r,s;const o=n.h;e[t]=(a,c,l)=>o(a,c,l,s||(s=Rr(Pa,Da,Ia,i).T),r||(r=Bp(i)))}function Bp(e){let t=e[xd];if(!t){const n=Rr(Pa,Da,Ia,e);t=(i,r)=>kp(i,r,n),e[xd]=t}return t}function kp(e,t,n){np(e,0|e[gt],((i,r)=>{if(r!=null){var s=(function(o,a){var c=o[a];if(c)return c;if((c=o.ba)&&(c=c[a])){var l=(c=Fp(c))[0].h;if(c=c[1]){const h=Bp(c),u=Rr(Pa,Da,Ia,c).T;c=o.ma?Np(u,h):(d,m,_)=>l(d,m,_,u,h)}else c=l;return o[a]=c}})(n,i);s?s(t,r,i):i<500||ls(vl,3)}})),(e=Sa(e))&&oa(e,((i,r,s)=>{for(ps(t,t.g.end()),i=0;i<s.length;i++)ps(t,jl(s[i])||new Uint8Array(0))}))}const A3=xn(0);function Ps(e,t){if(Array.isArray(t)){var n=0|t[gt];if(4&n)return t;for(var i=0,r=0;i<t.length;i++){const s=e(t[i]);s!=null&&(t[r++]=s)}return r<i&&(t.length=r),(e=-1537&(5|n))!==n&&ke(t,e),2&e&&Object.freeze(t),t}}function Ke(e,t,n){return new Cs(e,t,n)}function Ls(e,t,n){return new Cs(e,t,n)}function Ze(e,t,n){Ne(e,0|e[gt],t,n,Ss(0|e[gt]))}var w3=Ca((function(e,t,n,i,r){if(e.h!==2)return!1;if(e=Wn(e=lo(e,pr([void 0,void 0],i),r)),r=Ss(i=0|t[gt]),2&i)throw Error();let s=Ai(t,n,r);if(s instanceof bi)(2&s.J)!=0?(s=s.V(),s.push(e),Ne(t,i,n,s,r)):s.Ma(e);else if(Array.isArray(s)){var o=0|s[gt];8192&o||ke(s,o|=8192),2&o&&(s=vp(s),Ne(t,i,n,s,r)),s.push(e)}else Ne(t,i,n,js([e]),r);return!0}),(function(e,t,n,i,r){if(t instanceof bi)t.forEach(((s,o)=>{ha(e,n,pr([o,s],i),r)}));else if(Array.isArray(t)){for(let s=0;s<t.length;s++){const o=t[s];Array.isArray(o)&&ha(e,n,pr(o,i),r)}js(t)}}));function zp(e,t,n){(t=ei(t))!=null&&(Un(e,n,5),e=e.g,Zl(t),ph(e))}function Hp(e,t,n){if(t=(function(i){if(i==null)return i;const r=typeof i;if(r==="bigint")return String(oo(64,i));if(ao(i)){if(r==="string")return lp(i);if(r==="number")return Ql(i)}})(t),t!=null&&(typeof t=="string"&&vd(t),t!=null))switch(Un(e,n,0),typeof t){case"number":e=e.g,ds(t),Qr(e,ve,Pe);break;case"bigint":n=BigInt.asUintN(64,t),n=new Sl(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Qr(e.g,n.h,n.g);break;default:n=vd(t),Qr(e.g,n.h,n.g)}}function Gp(e,t,n){(t=Es(t))!=null&&t!=null&&(Un(e,n,0),Aa(e.g,t))}function Vp(e,t,n){(t=op(t))!=null&&(Un(e,n,0),e.g.g.push(t?1:0))}function Wp(e,t,n){(t=Ve(t))!=null&&wa(e,n,qf(t))}function Xp(e,t,n,i,r){ha(e,n,Op(t,i),r)}function qp(e,t,n){(t=t==null||typeof t=="string"||t instanceof ii?t:void 0)!=null&&wa(e,n,hh(t,!0).buffer)}function Yp(e,t,n){(t=ap(t))!=null&&t!=null&&(Un(e,n,0),Rs(e.g,t))}function jp(e,t,n){return(e.h===5||e.h===2)&&(t=ws(t,0|t[gt],n),e.h==2?ba(e,ca,t):t.push(ca(e.g)),!0)}var Le=Ke((function(e,t,n){return e.h===5&&(Ze(t,n,ca(e.g)),!0)}),zp,Ra),R3=Ls(jp,(function(e,t,n){if((t=Ps(ei,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&(Un(i,r,5),i=i.g,Zl(s),ph(i))}}),Ra),Th=Ls(jp,(function(e,t,n){if((t=Ps(ei,t))!=null&&t.length){Un(e,n,2),Rs(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,Zl(t[i]),ph(n)}}),Ra),C3=Ke((function(e,t,n){return e.h===5&&(Ze(t,n,(e=ca(e.g))===0?void 0:e),!0)}),zp,Ra),Ki=Ke((function(e,t,n){return e.h!==0?e=!1:(Ze(t,n,uh(e.g,sp)),e=!0),e}),Hp,Pp),yc=Ke((function(e,t,n){return e.h!==0?t=!1:(Ze(t,n,(e=uh(e.g,sp))===A3?void 0:e),t=!0),t}),Hp,Pp),P3=Ke((function(e,t,n){return e.h!==0?e=!1:(Ze(t,n,uh(e.g,t3)),e=!0),e}),(function(e,t,n){if(t=(function(i){if(i==null)return i;var r=typeof i;if(r==="bigint")return String(e3(64,i));if(ao(i)){if(r==="string")return r=fs(Number(i)),Tr(r)&&r>=0?i=String(r):((r=i.indexOf("."))!==-1&&(i=i.substring(0,r)),(r=i[0]!=="-"&&((r=i.length)<20||r===20&&i<="18446744073709551615"))||(Ma(i),i=Ks(ve,Pe))),i;if(r==="number")return(i=fs(i))>=0&&Tr(i)||(ds(i),i=rp(ve,Pe)),i}})(t),t!=null&&(typeof t=="string"&&gd(t),t!=null))switch(Un(e,n,0),typeof t){case"number":e=e.g,ds(t),Qr(e,ve,Pe);break;case"bigint":n=BigInt.asUintN(64,t),n=new yl(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Qr(e.g,n.h,n.g);break;default:n=gd(t),Qr(e.g,n.h,n.g)}}),y3),Ue=Ke((function(e,t,n){return e.h===0&&(Ze(t,n,ji(e.g)),!0)}),Gp,xh),ho=Ls((function(e,t,n){return(e.h===0||e.h===2)&&(t=ws(t,0|t[gt],n),e.h==2?ba(e,ji,t):t.push(ji(e.g)),!0)}),(function(e,t,n){if((t=Ps(Es,t))!=null&&t.length){n=mh(e,n);for(let i=0;i<t.length;i++)Aa(e.g,t[i]);_h(e,n)}}),xh),jr=Ke((function(e,t,n){return e.h===0&&(Ze(t,n,(e=ji(e.g))===0?void 0:e),!0)}),Gp,xh),Me=Ke((function(e,t,n){return e.h===0&&(Ze(t,n,dh(e.g)),!0)}),Vp,Cp),vr=Ke((function(e,t,n){return e.h===0&&(Ze(t,n,(e=dh(e.g))===!1?void 0:e),!0)}),Vp,Cp),Ye=Ls((function(e,t,n){return e.h===2&&(e=fh(e),ws(t,0|t[gt],n).push(e),!0)}),(function(e,t,n){if((t=Ps(Ve,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&wa(i,r,qf(s))}}),vh),Gi=Ke((function(e,t,n){return e.h===2&&(Ze(t,n,(e=fh(e))===""?void 0:e),!0)}),Wp,vh),ae=Ke((function(e,t,n){return e.h===2&&(Ze(t,n,fh(e)),!0)}),Wp,vh),Ge=(function(e,t,n=gh){return new Cs(e,t,n)})((function(e,t,n,i,r){return e.h===2&&(i=pr(void 0,i),ws(t,0|t[gt],n).push(i),lo(e,i,r),!0)}),(function(e,t,n,i,r){if(Array.isArray(t)){for(let s=0;s<t.length;s++)Xp(e,t[s],n,i,r);1&(e=0|t[gt])||ke(t,1|e)}})),me=Ca((function(e,t,n,i,r,s){if(e.h!==2)return!1;let o=0|t[gt];return xp(t,o,s,n,Ss(o)),lo(e,t=ch(t,i,n),r),!0}),Xp),Kp=Ke((function(e,t,n){return e.h===2&&(Ze(t,n,Rp(e)),!0)}),qp,Lp),L3=Ls((function(e,t,n){return(e.h===0||e.h===2)&&(t=ws(t,0|t[gt],n),e.h==2?ba(e,ri,t):t.push(ri(e.g)),!0)}),(function(e,t,n){if((t=Ps(ap,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&(Un(i,r,0),Rs(i.g,s))}}),Mh),D3=Ke((function(e,t,n){return e.h===0&&(Ze(t,n,(e=ri(e.g))===0?void 0:e),!0)}),Yp,Mh),je=Ke((function(e,t,n){return e.h===0&&(Ze(t,n,ji(e.g)),!0)}),(function(e,t,n){(t=Es(t))!=null&&(t=parseInt(t,10),Un(e,n,0),Aa(e.g,t))}),Dp);class I3{constructor(t,n){var i=En;this.g=t,this.h=n,this.m=$t,this.j=bt,this.defaultValue=void 0,this.l=i.Oa!=null?ip:void 0}register(){ga(this)}}function ci(e,t){return new I3(e,t)}function Zi(e,t){return(n,i)=>{{const s={ea:!0};i&&Object.assign(s,i),n=bp(n,void 0,void 0,s);try{const o=new e,a=o.v;Eh(t)(a,n);var r=o}finally{Ap(n)}}return r}}function Ua(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const o=this.g;return this.g=[],o}}}};kp(this.v,t,Rr(Pa,Da,Ia,e)),ps(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,r=i.length;let s=0;for(let o=0;o<r;o++){const a=i[o];n.set(a,s),s+=a.length}return t.l=[n],n}}var yd=class extends vt{constructor(e){super(e)}},Sd=[0,Gi,Ke((function(e,t,n){return e.h===2&&(Ze(t,n,(e=Rp(e))===Sr()?void 0:e),!0)}),(function(e,t,n){if(t!=null){if(t instanceof vt){const i=t.Ra;return void(i?(t=i(t),t!=null&&wa(e,n,hh(t,!0).buffer)):ls(vl,3))}if(Array.isArray(t))return void ls(vl,3)}qp(e,t,n)}),Lp)];let Sc,Ed=globalThis.trustedTypes;function Td(e){var t;return Sc===void 0&&(Sc=(function(){let n=null;if(!Ed)return n;try{const i=r=>r;n=Ed.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n})()),e=(t=Sc)?t.createScriptURL(e):e,new class{constructor(n){this.g=n}toString(){return this.g+""}}(e)}function Go(e,...t){if(t.length===0)return Td(e[0]);let n=e[0];for(let i=0;i<t.length;i++)n+=encodeURIComponent(t[i])+e[i+1];return Td(n)}var Zp=[0,Ue,je,Me,-1,ho,je,-1,Me],U3=class extends vt{constructor(e){super(e)}},$p=[0,Me,ae,Me,je,-1,Ls((function(e,t,n){return(e.h===0||e.h===2)&&(t=ws(t,0|t[gt],n),e.h==2?ba(e,g3,t):t.push(ji(e.g)),!0)}),(function(e,t,n){if((t=Ps(Es,t))!=null&&t.length){n=mh(e,n);for(let i=0;i<t.length;i++)Aa(e.g,t[i]);_h(e,n)}}),Dp),ae,-1,[0,Me,-1],je,Me,-1],Jp=[0,3,Me,-1,2,[0,[2],Ue,me,[0,Ke((function(e,t,n){return e.h===0&&(Ze(t,n,ri(e.g)),!0)}),Yp,Mh)]],[0,je,Me,je,Me,je,Me,ae,-1],[0,[3,4],ae,-1,me,[0,Ue],me,[0,je]],[0]],Qp=[0,ae,-2],bd=class extends vt{constructor(e){super(e)}},tm=[0],em=[0,Ue,Me,1,Me,-4],En=class extends vt{constructor(e){super(e,2)}},Fe={};Fe[336783863]=[0,ae,Me,-1,Ue,[0,[1,2,3,4,5,6,7,8,9],me,tm,me,$p,me,Qp,me,em,me,Zp,me,[0,ae,-2],me,[0,ae,je],me,Jp,me,[0,je,-1,Me]],[0,ae],Me,[0,[1,3],[2,4],me,[0,ho],-1,me,[0,Ye],-1,Ge,[0,ae,-1]],ae];var Ad=[0,yc,-1,vr,-3,yc,ho,Gi,jr,yc,-1,vr,jr,vr,-2,Gi];function _e(e,t){Ta(e,3,t)}function Wt(e,t){Ta(e,4,t)}var ln=class extends vt{constructor(e){super(e,500)}o(e){return bt(this,0,7,e)}},Xs=[-1,{}],wd=[0,ae,1,Xs],Rd=[0,ae,Ye,Xs];function Nn(e,t){lh(e,1,ln,t)}function ye(e,t){Ta(e,10,t)}function Jt(e,t){Ta(e,15,t)}var Tn=class extends vt{constructor(e){super(e,500)}o(e){return bt(this,0,1001,e)}},nm=[-500,Ge,[-500,Gi,-1,Ye,-3,[-2,Fe,Me],Ge,Sd,jr,-1,wd,Rd,Ge,[0,Gi,vr],Gi,Ad,jr,Ye,987,Ye],4,Ge,[-500,ae,-1,[-1,{}],998,ae],Ge,[-500,ae,Ye,-1,[-2,{},Me],997,Ye,-1],jr,Ge,[-500,ae,Ye,Xs,998,Ye],Ye,jr,wd,Rd,Ge,[0,Gi,-1,Xs],Ye,-2,Ad,Gi,-1,vr,[0,vr,D3],978,Xs,Ge,Sd];Tn.prototype.g=Ua(nm);var N3=Zi(Tn,nm),F3=class extends vt{constructor(e){super(e)}},im=class extends vt{constructor(e){super(e)}g(){return wi(this,F3,1)}},rm=[0,Ge,[0,Ue,Le,ae,-1]],Na=Zi(im,rm),O3=class extends vt{constructor(e){super(e)}},B3=class extends vt{constructor(e){super(e)}},Ec=class extends vt{constructor(e){super(e)}l(){return $t(this,O3,2)}g(){return wi(this,B3,5)}},sm=Zi(class extends vt{constructor(e){super(e)}},[0,Ye,ho,Th,[0,je,[0,Ue,-3],[0,Le,-3],[0,Ue,-1,[0,Ge,[0,Ue,-2]]],Ge,[0,Le,-1,ae,Le]],ae,-1,Ki,Ge,[0,Ue,Le],Ye,Ki]),om=class extends vt{constructor(e){super(e)}},ts=Zi(class extends vt{constructor(e){super(e)}},[0,Ge,[0,Le,-4]]),am=class extends vt{constructor(e){super(e)}},uo=Zi(class extends vt{constructor(e){super(e)}},[0,Ge,[0,Le,-4]]),k3=class extends vt{constructor(e){super(e)}},z3=[0,Ue,-1,Th,je],cm=class extends vt{constructor(e){super(e)}};cm.prototype.g=Ua([0,Le,-4,Ki]);var H3=class extends vt{constructor(e){super(e)}},G3=Zi(class extends vt{constructor(e){super(e)}},[0,Ge,[0,1,Ue,ae,rm],Ki]),Cd=class extends vt{constructor(e){super(e)}},V3=class extends vt{constructor(e){super(e)}na(){const e=xe(this,1,void 0,void 0,gp);return e??Sr()}},W3=class extends vt{constructor(e){super(e)}},lm=[1,2],X3=Zi(class extends vt{constructor(e){super(e)}},[0,Ge,[0,lm,me,[0,Th],me,[0,Kp],Ue,ae],Ki]),bh=class extends vt{constructor(e){super(e)}},hm=[0,ae,Ue,Le,Ye,-1],Pd=class extends vt{constructor(e){super(e)}},q3=[0,Me,-1],Ld=class extends vt{constructor(e){super(e)}},na=[1,2,3,4,5,6],ua=class extends vt{constructor(e){super(e)}g(){return xe(this,1,void 0,void 0,gp)!=null}l(){return Ve(xe(this,2))!=null}},Te=class extends vt{constructor(e){super(e)}g(){return op(xe(this,2))??!1}},um=[0,Kp,ae,[0,Ue,Ki,-1],[0,P3,Ki]],De=[0,um,Me,[0,na,me,em,me,$p,me,Zp,me,tm,me,Qp,me,Jp],je],Fa=class extends vt{constructor(e){super(e)}},Ah=[0,De,Le,-1,Ue],Y3=ci(502141897,Fa);Fe[502141897]=Ah;var j3=Zi(class extends vt{constructor(e){super(e)}},[0,[0,je,-1,R3,L3],z3]),dm=class extends vt{constructor(e){super(e)}},fm=class extends vt{constructor(e){super(e)}},Tl=[0,De,Le,[0,De],Me],K3=ci(508968150,fm);Fe[508968150]=[0,De,Ah,Tl,Le,[0,[0,um]]],Fe[508968149]=Tl;var Xr=class extends vt{constructor(e){super(e)}l(){return $t(this,bh,2)}g(){se(this,2)}},pm=[0,De,hm];Fe[478825465]=pm;var Z3=class extends vt{constructor(e){super(e)}},mm=class extends vt{constructor(e){super(e)}},wh=class extends vt{constructor(e){super(e)}},Rh=class extends vt{constructor(e){super(e)}},_m=class extends vt{constructor(e){super(e)}},Dd=[0,De,[0,De],pm,-1],gm=[0,De,Le,Ue],Ch=[0,De,Le],vm=[0,De,gm,Ch,Le],$3=ci(479097054,_m);Fe[479097054]=[0,De,vm,Dd],Fe[463370452]=Dd,Fe[464864288]=gm;var J3=ci(462713202,Rh);Fe[462713202]=vm,Fe[474472470]=Ch;var Q3=class extends vt{constructor(e){super(e)}},xm=class extends vt{constructor(e){super(e)}},Mm=class extends vt{constructor(e){super(e)}},ym=class extends vt{constructor(e){super(e)}},Ph=[0,De,Le,-1,Ue],bl=[0,De,Le,Me];ym.prototype.g=Ua([0,De,Ch,[0,De],Ah,Tl,Ph,bl]);var Sm=class extends vt{constructor(e){super(e)}},tM=ci(456383383,Sm);Fe[456383383]=[0,De,hm];var Em=class extends vt{constructor(e){super(e)}},eM=ci(476348187,Em);Fe[476348187]=[0,De,q3];var Tm=class extends vt{constructor(e){super(e)}},Id=class extends vt{constructor(e){super(e)}},bm=[0,je,-1],nM=ci(458105876,class extends vt{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[gt];return e=Mn(this,n),t=(function(i,r,s,o){var a=Id;!o&&bs(i)&&(s=0|(r=i.v)[gt]);var c=Ai(r,2);if(i=!1,c==null){if(o)return fd();c=[]}else if(c.constructor===bi){if(!(2&c.J)||o)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[gt])):c=[];if(o){if(!c.length)return fd();i||(i=!0,so(c))}else i&&(i=!1,js(c),c=vp(c));return!i&&32&s&&ro(c,32),s=Ne(r,s,2,o=new bi(c,a,r3,void 0)),i||wr(r,s),o})(this,t,n,e),!e&&Id&&(t.ra=!0),t}});Fe[458105876]=[0,bm,w3,[!0,Ki,[0,ae,-1,Ye]],[0,ho,Me,je]];var Lh=class extends vt{constructor(e){super(e)}},Am=ci(458105758,Lh);Fe[458105758]=[0,De,ae,bm];var Tc=class extends vt{constructor(e){super(e)}},Ud=[0,C3,-1,vr],iM=class extends vt{constructor(e){super(e)}},wm=class extends vt{constructor(e){super(e)}},Al=[1,2];wm.prototype.g=Ua([0,Al,me,Ud,me,[0,Ge,Ud]]);var Rm=class extends vt{constructor(e){super(e)}},rM=ci(443442058,Rm);Fe[443442058]=[0,De,ae,Ue,Le,Ye,-1,Me,Le],Fe[514774813]=Ph;var Cm=class extends vt{constructor(e){super(e)}},sM=ci(516587230,Cm);function wl(e,t){return t=t?t.clone():new bh,e.displayNamesLocale!==void 0?se(t,1,co(e.displayNamesLocale)):e.displayNamesLocale===void 0&&se(t,1),e.maxResults!==void 0?Ri(t,2,e.maxResults):"maxResults"in e&&se(t,2),e.scoreThreshold!==void 0?Et(t,3,e.scoreThreshold):"scoreThreshold"in e&&se(t,3),e.categoryAllowlist!==void 0?aa(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&se(t,4),e.categoryDenylist!==void 0?aa(t,5,e.categoryDenylist):"categoryDenylist"in e&&se(t,5),t}function Pm(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function Dh(e,t=-1,n=""){return{categories:e.map((i=>({index:In(i,1)??0??-1,score:Ae(i,2)??0,categoryName:Ve(xe(i,3))??""??"",displayName:Ve(xe(i,4))??""??""}))),headIndex:t,headName:n}}function oM(e){const t={classifications:wi(e,H3,1).map((n=>{var i;return Dh(((i=$t(n,im,4))==null?void 0:i.g())??[],In(n,2)??0,Ve(xe(n,3))??"")}))};return(function(n){return n==null?n:typeof n=="bigint"?(xl(n)?n=Number(n):(n=oo(64,n),n=xl(n)?Number(n):String(n)),n):ao(n)?typeof n=="number"?Ql(n):lp(n):void 0})(xe(e,2,void 0,void 0,sa))!=null&&(t.timestampMs=Pm(xe(e,2,void 0,void 0,sa)??mp)),t}function Lm(e){var o,a;var t=fr(e,3,ei,dr()),n=fr(e,2,Es,dr()),i=fr(e,1,Ve,dr()),r=fr(e,9,Ve,dr());const s={categories:[],keypoints:[]};for(let c=0;c<t.length;c++)s.categories.push({score:t[c],index:n[c]??-1,categoryName:i[c]??"",displayName:r[c]??""});if((t=(o=$t(e,Ec,4))==null?void 0:o.l())&&(s.boundingBox={originX:In(t,1,Oi)??0,originY:In(t,2,Oi)??0,width:In(t,3,Oi)??0,height:In(t,4,Oi)??0,angle:0}),(a=$t(e,Ec,4))==null?void 0:a.g().length)for(const c of $t(e,Ec,4).g())s.keypoints.push({x:xe(c,1,void 0,Oi,ei)??0,y:xe(c,2,void 0,Oi,ei)??0,score:xe(c,4,void 0,Oi,ei)??0,label:Ve(xe(c,3,void 0,Oi))??""});return s}function Oa(e){const t=[];for(const n of wi(e,am,1))t.push({x:Ae(n,1)??0,y:Ae(n,2)??0,z:Ae(n,3)??0,visibility:Ae(n,4)??0});return t}function qs(e){const t=[];for(const n of wi(e,om,1))t.push({x:Ae(n,1)??0,y:Ae(n,2)??0,z:Ae(n,3)??0,visibility:Ae(n,4)??0});return t}function Nd(e){return Array.from(e,(t=>t>127?t-256:t))}function Fd(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,r=0;for(let s=0;s<e.length;s++)n+=e[s]*t[s],i+=e[s]*e[s],r+=t[s]*t[s];if(i<=0||r<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*r)}let Vo;Fe[516587230]=[0,De,Ph,bl,Le],Fe[518928384]=bl;const aM=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function Dm(e){if(e)return!0;if(Vo===void 0)try{await WebAssembly.instantiate(aM),Vo=!0}catch{Vo=!1}return Vo}async function Wo(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?"_module":""}${await Dm(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var lr=class{};function Im(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!(function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")})(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function Od(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise(((n,i)=>{t.addEventListener("load",(()=>{n()}),!1),t.addEventListener("error",(r=>{i(r)}),!1),document.body.appendChild(t)}))}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;{const n=self.import;n?await n(e.toString()):await import(e.toString())}}}function Um(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function Mt(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function Bd(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,r]=Um(t);return!e.l||i===e.i.canvas.width&&r===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=r),[i,r]}function kd(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let r=0;r<t.length;r++)i[r]=e.i.stringToNewUTF8(t[r]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const r of i)e.i._free(r);e.i._free(t)}function Zn(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function Bi(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(r,s,o)=>{s?(n(i,o),i=[]):i.push(r)}}lr.forVisionTasks=function(e,t=!1){return Wo("vision",e??Go``,t)},lr.forTextTasks=function(e,t=!1){return Wo("text",e??Go``,t)},lr.forGenAiTasks=function(e,t=!1){return Wo("genai",e??Go``,t)},lr.forAudioTasks=function(e,t=!1){return Wo("audio",e??Go``,t)},lr.isSimdSupported=function(e=!1){return Dm(e)};async function cM(e,t,n,i){return e=await(async(r,s,o,a,c)=>{if(s&&await Od(s),!self.ModuleFactory||o&&(await Od(o),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((s=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(s.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new r(c,a)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:r=>r.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&r.endsWith(".data")?n.assetBinaryPath.toString():r}),await e.o(i),e}function bc(e,t){const n=$t(e.baseOptions,ua,1)||new ua;typeof t=="string"?(se(n,2,co(t)),se(n,1)):t instanceof Uint8Array&&(se(n,1,Kl(t,!1)),se(n,2)),bt(e.baseOptions,0,1,n)}function zd(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map((n=>n.message)).join(", "))}finally{e.H=[]}}function ut(e,t){e.C=Math.max(e.C,t)}function Ba(e,t){e.B=new ln,yn(e.B,2,"PassThroughCalculator"),_e(e.B,"free_memory"),Wt(e.B,"free_memory_unused_out"),ye(t,"free_memory"),Nn(t,e.B)}function ms(e,t){_e(e.B,t),Wt(e.B,t+"_unused_out")}function ka(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var Rl=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,r,s,o,a;if(t){const c=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((r=$t(this.baseOptions,ua,1))!=null&&r.g()||(s=$t(this.baseOptions,ua,1))!=null&&s.l()||(o=e.baseOptions)!=null&&o.modelAssetBuffer||(a=e.baseOptions)!=null&&a.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if((function(l,h){let u=$t(l.baseOptions,Ld,3);if(!u){var d=u=new Ld,m=new bd;Ws(d,4,na,m)}"delegate"in h&&(h.delegate==="GPU"?(h=u,d=new U3,Ws(h,2,na,d)):(h=u,d=new bd,Ws(h,4,na,d))),bt(l.baseOptions,0,3,u)})(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then((l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)})).then((l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),bc(this,"/model.dat"),this.m(),this.L()}));if(c.modelAssetBuffer instanceof Uint8Array)bc(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return(async function(l){const h=[];for(var u=0;;){const{done:d,value:m}=await l.read();if(d)break;h.push(m),u+=m.length}if(h.length===0)return new Uint8Array(0);if(h.length===1)return h[0];l=new Uint8Array(u),u=0;for(const d of h)l.set(d,u),u+=d.length;return l})(c.modelAssetBuffer).then((l=>{bc(this,l),this.m(),this.L()}))}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca((t=>{e=N3(t)})),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener(((n,i)=>{this.H.push(Error(i))})),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,zd(this)}finishProcessing(){this.g.finishProcessing(),zd(this)}close(){this.B=void 0,this.g.closeGraph()}};function Xi(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}Rl.prototype.close=Rl.prototype.close;class lM{constructor(t,n,i,r){this.g=t,this.h=n,this.m=i,this.l=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function Hd(e,t,n){const i=e.g;if(n=Xi(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function Gd(e,t){const n=e.g,i=Xi(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const r=Xi(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=Xi(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new lM(n,i,r,s)}function Ih(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function hM(e,t,n,i){return Ih(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=Gd(e,!0)),n=e.u):(e.A||(e.A=Gd(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function Nm(e,t,n){return Ih(e,t),e=Xi(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function Fm(e,t,n){Ih(e,t),e.B||(e.B=Xi(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function uM(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var Om=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=Xi(e.createProgram(),"Failed to create WebGL program"),this.X=Hd(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=Hd(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function xi(e,t){switch(t){case 0:return e.g.find((n=>n instanceof Uint8Array));case 1:return e.g.find((n=>n instanceof Float32Array));case 2:return e.g.find((n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture));default:throw Error(`Type is not supported: ${t}`)}}function Cl(e){var t=xi(e,1);if(!t){if(t=xi(e,0))t=new Float32Array(t).map((i=>i/255));else{t=new Float32Array(e.width*e.height);const i=_s(e);var n=Uh(e);if(Fm(n,i,Bm(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let r=0,s=0;r<t.length;++r,s+=4)t[r]=n[s]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function Bm(e){let t=xi(e,2);if(!t){const n=_s(e);t=zm(e);const i=Cl(e),r=km(e);n.texImage2D(n.TEXTURE_2D,0,r,e.width,e.height,0,n.RED,n.FLOAT,i),Pl(e)}return t}function _s(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=Xi(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function km(e){if(e=_s(e),!Xo)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))Xo=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Xo=e.R16F}return Xo}function Uh(e){return e.l||(e.l=new Om),e.l}function zm(e){const t=_s(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=xi(e,2);return n||(n=Nm(Uh(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function Pl(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var Xo,He=class{constructor(e,t,n,i,r,s,o){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=r,this.width=s,this.height=o,this.j&&--Vd===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!xi(this,0)}ka(){return!!xi(this,1)}R(){return!!xi(this,2)}ja(){return(t=xi(e=this,0))||(t=Cl(e),t=new Uint8Array(t.map((n=>Math.round(255*n)))),e.g.push(t)),t;var e,t}ia(){return Cl(this)}N(){return Bm(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=_s(this),r=Uh(this);i.activeTexture(i.TEXTURE1),n=Nm(r,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const s=km(this);i.texImage2D(i.TEXTURE_2D,0,s,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),Fm(r,i,n),hM(r,i,!1,(()=>{zm(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),Pl(this)})),uM(r),Pl(this)}}e.push(n)}return new He(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&_s(this).deleteTexture(xi(this,2)),Vd=-1}};He.prototype.close=He.prototype.close,He.prototype.clone=He.prototype.clone,He.prototype.getAsWebGLTexture=He.prototype.N,He.prototype.getAsFloat32Array=He.prototype.ia,He.prototype.getAsUint8Array=He.prototype.ja,He.prototype.hasWebGLTexture=He.prototype.R,He.prototype.hasFloat32Array=He.prototype.ka,He.prototype.hasUint8Array=He.prototype.Fa;var Vd=250;function qn(...e){return e.map((([t,n])=>({start:t,end:n})))}const dM=(function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}})((Wd=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:Im()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,r){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),Mt(this,i||"input_audio",(s=>{Mt(this,r=r||"audio_header",(o=>{this.i._configureAudio(s,o,e,t??0,n)}))}))}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){Zn(this,"__graph_config__",(t=>{e(t)})),Mt(this,"__graph_config__",(t=>{this.i._getGraphConfig(t,void 0)})),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,r){const s=4*e.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(e,this.g/4),Mt(this,i,(o=>{this.i._addAudioToInputStream(this.g,t,n,o,r)}))}addGpuBufferToStream(e,t,n){Mt(this,t,(i=>{const[r,s]=Bd(this,e,i);this.i._addBoundTextureToStream(i,r,s,n)}))}addBoolToStream(e,t,n){Mt(this,t,(i=>{this.i._addBoolToInputStream(e,i,n)}))}addDoubleToStream(e,t,n){Mt(this,t,(i=>{this.i._addDoubleToInputStream(e,i,n)}))}addFloatToStream(e,t,n){Mt(this,t,(i=>{this.i._addFloatToInputStream(e,i,n)}))}addIntToStream(e,t,n){Mt(this,t,(i=>{this.i._addIntToInputStream(e,i,n)}))}addUintToStream(e,t,n){Mt(this,t,(i=>{this.i._addUintToInputStream(e,i,n)}))}addStringToStream(e,t,n){Mt(this,t,(i=>{Mt(this,e,(r=>{this.i._addStringToInputStream(r,i,n)}))}))}addStringRecordToStream(e,t,n){Mt(this,t,(i=>{kd(this,Object.keys(e),(r=>{kd(this,Object.values(e),(s=>{this.i._addFlatHashMapToInputStream(r,s,Object.keys(e).length,i,n)}))}))}))}addProtoToStream(e,t,n,i){Mt(this,n,(r=>{Mt(this,t,(s=>{const o=this.i._malloc(e.length);this.i.HEAPU8.set(e,o),this.i._addProtoToInputStream(o,e.length,s,r,i),this.i._free(o)}))}))}addEmptyPacketToStream(e,t){Mt(this,e,(n=>{this.i._addEmptyPacketToInputStream(n,t)}))}addBoolVectorToStream(e,t,n){Mt(this,t,(i=>{const r=this.i._allocateBoolVector(e.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(r,s);this.i._addBoolVectorToInputStream(r,i,n)}))}addDoubleVectorToStream(e,t,n){Mt(this,t,(i=>{const r=this.i._allocateDoubleVector(e.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(r,s);this.i._addDoubleVectorToInputStream(r,i,n)}))}addFloatVectorToStream(e,t,n){Mt(this,t,(i=>{const r=this.i._allocateFloatVector(e.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(r,s);this.i._addFloatVectorToInputStream(r,i,n)}))}addIntVectorToStream(e,t,n){Mt(this,t,(i=>{const r=this.i._allocateIntVector(e.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(r,s);this.i._addIntVectorToInputStream(r,i,n)}))}addUintVectorToStream(e,t,n){Mt(this,t,(i=>{const r=this.i._allocateUintVector(e.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(r,s);this.i._addUintVectorToInputStream(r,i,n)}))}addStringVectorToStream(e,t,n){Mt(this,t,(i=>{const r=this.i._allocateStringVector(e.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const s of e)Mt(this,s,(o=>{this.i._addStringVectorEntry(r,o)}));this.i._addStringVectorToInputStream(r,i,n)}))}addBoolToInputSidePacket(e,t){Mt(this,t,(n=>{this.i._addBoolToInputSidePacket(e,n)}))}addDoubleToInputSidePacket(e,t){Mt(this,t,(n=>{this.i._addDoubleToInputSidePacket(e,n)}))}addFloatToInputSidePacket(e,t){Mt(this,t,(n=>{this.i._addFloatToInputSidePacket(e,n)}))}addIntToInputSidePacket(e,t){Mt(this,t,(n=>{this.i._addIntToInputSidePacket(e,n)}))}addUintToInputSidePacket(e,t){Mt(this,t,(n=>{this.i._addUintToInputSidePacket(e,n)}))}addStringToInputSidePacket(e,t){Mt(this,t,(n=>{Mt(this,e,(i=>{this.i._addStringToInputSidePacket(i,n)}))}))}addProtoToInputSidePacket(e,t,n){Mt(this,n,(i=>{Mt(this,t,(r=>{const s=this.i._malloc(e.length);this.i.HEAPU8.set(e,s),this.i._addProtoToInputSidePacket(s,e.length,r,i),this.i._free(s)}))}))}addBoolVectorToInputSidePacket(e,t){Mt(this,t,(n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(i,r);this.i._addBoolVectorToInputSidePacket(i,n)}))}addDoubleVectorToInputSidePacket(e,t){Mt(this,t,(n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(i,r);this.i._addDoubleVectorToInputSidePacket(i,n)}))}addFloatVectorToInputSidePacket(e,t){Mt(this,t,(n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(i,r);this.i._addFloatVectorToInputSidePacket(i,n)}))}addIntVectorToInputSidePacket(e,t){Mt(this,t,(n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(i,r);this.i._addIntVectorToInputSidePacket(i,n)}))}addUintVectorToInputSidePacket(e,t){Mt(this,t,(n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(i,r);this.i._addUintVectorToInputSidePacket(i,n)}))}addStringVectorToInputSidePacket(e,t){Mt(this,t,(n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const r of e)Mt(this,r,(s=>{this.i._addStringVectorEntry(i,s)}));this.i._addStringVectorToInputSidePacket(i,n)}))}attachBoolListener(e,t){Zn(this,e,t),Mt(this,e,(n=>{this.i._attachBoolListener(n)}))}attachBoolVectorListener(e,t){Bi(this,e,t),Mt(this,e,(n=>{this.i._attachBoolVectorListener(n)}))}attachIntListener(e,t){Zn(this,e,t),Mt(this,e,(n=>{this.i._attachIntListener(n)}))}attachIntVectorListener(e,t){Bi(this,e,t),Mt(this,e,(n=>{this.i._attachIntVectorListener(n)}))}attachUintListener(e,t){Zn(this,e,t),Mt(this,e,(n=>{this.i._attachUintListener(n)}))}attachUintVectorListener(e,t){Bi(this,e,t),Mt(this,e,(n=>{this.i._attachUintVectorListener(n)}))}attachDoubleListener(e,t){Zn(this,e,t),Mt(this,e,(n=>{this.i._attachDoubleListener(n)}))}attachDoubleVectorListener(e,t){Bi(this,e,t),Mt(this,e,(n=>{this.i._attachDoubleVectorListener(n)}))}attachFloatListener(e,t){Zn(this,e,t),Mt(this,e,(n=>{this.i._attachFloatListener(n)}))}attachFloatVectorListener(e,t){Bi(this,e,t),Mt(this,e,(n=>{this.i._attachFloatVectorListener(n)}))}attachStringListener(e,t){Zn(this,e,t),Mt(this,e,(n=>{this.i._attachStringListener(n)}))}attachStringVectorListener(e,t){Bi(this,e,t),Mt(this,e,(n=>{this.i._attachStringVectorListener(n)}))}attachProtoListener(e,t,n){Zn(this,e,t),Mt(this,e,(i=>{this.i._attachProtoListener(i,n||!1)}))}attachProtoVectorListener(e,t,n){Bi(this,e,t),Mt(this,e,(i=>{this.i._attachProtoVectorListener(i,n||!1)}))}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),Zn(this,e,((i,r)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,r)})),Mt(this,e,(i=>{this.i._attachAudioListener(i,n||!1)}))}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends Wd{get ga(){return this.i}pa(e,t,n){Mt(this,t,(i=>{const[r,s]=Bd(this,e,i);this.ga._addBoundTextureAsImageToStream(i,r,s,n)}))}Z(e,t){Zn(this,e,t),Mt(this,e,(n=>{this.ga._attachImageListener(n)}))}aa(e,t){Bi(this,e,t),Mt(this,e,(n=>{this.ga._attachImageVectorListener(n)}))}}));var Wd,Yn=class extends dM{};async function jt(e,t,n){return(async function(i,r,s,o){return cM(i,r,s,o)})(e,n.canvas??(Im()?void 0:document.createElement("canvas")),t,n)}function Hm(e,t,n,i){if(e.U){const s=new cm;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var r=n.regionOfInterest;if(r.left>=r.right||r.top>=r.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(r.left<0||r.top<0||r.right>1||r.bottom>1)throw Error("Expected RectF values to be in [0,1].");Et(s,1,(r.left+r.right)/2),Et(s,2,(r.top+r.bottom)/2),Et(s,4,r.right-r.left),Et(s,3,r.bottom-r.top)}else Et(s,1,.5),Et(s,2,.5),Et(s,4,1),Et(s,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Et(s,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[o,a]=Um(t);n=Ae(s,3)*a/o,r=Ae(s,4)*o/a,Et(s,4,n),Et(s,3,r)}}e.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function jn(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Hm(e,t,n,e.C+1)}function li(e,t,n,i){var r;if(!((r=e.baseOptions)!=null&&r.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Hm(e,t,n,i)}function gs(e,t,n,i){var r=t.data;const s=t.width,o=s*(t=t.height);if((r instanceof Uint8Array||r instanceof Float32Array)&&r.length!==o)throw Error("Unsupported channel count: "+r.length/o);return e=new He([r],n,!1,e.g.i.canvas,e.P,s,t),i?e.clone():e}var Sn=class extends Rl{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new Om}l(e,t=!0){if("runningMode"in e&&se(this.baseOptions,2,Zs(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};Sn.prototype.close=Sn.prototype.close;var Rn=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},bt(e=this.h=new Fa,0,1,t=new Te),Et(this.h,2,.5),Et(this.h,3,.3)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&Et(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&Et(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},jn(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},li(this,e,n,t),this.j}m(){var e=new Tn;ye(e,"image_in"),ye(e,"norm_rect_in"),Jt(e,"detections");const t=new En;ai(t,Y3,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect_in"),Wt(n,"DETECTIONS:detections"),n.o(t),Nn(e,n),this.g.attachProtoVectorListener("detections",((i,r)=>{for(const s of i)i=sm(s),this.j.detections.push(Lm(i));ut(this,r)})),this.g.attachEmptyPacketListener("detections",(i=>{ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Rn.prototype.detectForVideo=Rn.prototype.G,Rn.prototype.detect=Rn.prototype.F,Rn.prototype.setOptions=Rn.prototype.o,Rn.createFromModelPath=async function(e,t){return jt(Rn,e,{baseOptions:{modelAssetPath:t}})},Rn.createFromModelBuffer=function(e,t){return jt(Rn,e,{baseOptions:{modelAssetBuffer:t}})},Rn.createFromOptions=function(e,t){return jt(Rn,e,t)};var Nh=qn([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),Fh=qn([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),Oh=qn([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Gm=qn([474,475],[475,476],[476,477],[477,474]),Bh=qn([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),kh=qn([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Vm=qn([469,470],[470,471],[471,472],[472,469]),zh=qn([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),Wm=[...Nh,...Fh,...Oh,...Bh,...kh,...zh],Xm=qn([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function Xd(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Ee=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,bt(e=this.h=new fm,0,1,t=new Te),this.A=new dm,bt(this.h,0,3,this.A),this.u=new Fa,bt(this.h,0,2,this.u),Ri(this.u,4,1),Et(this.u,2,.5),Et(this.A,2,.5),Et(this.h,4,.5)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"numFaces"in e&&Ri(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&Et(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&Et(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&Et(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return Xd(this),jn(this,e,t),this.j}G(e,t,n){return Xd(this),li(this,e,n,t),this.j}m(){var e=new Tn;ye(e,"image_in"),ye(e,"norm_rect"),Jt(e,"face_landmarks");const t=new En;ai(t,K3,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),Wt(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),Nn(e,n),this.g.attachProtoVectorListener("face_landmarks",((i,r)=>{for(const s of i)i=uo(s),this.j.faceLandmarks.push(Oa(i));ut(this,r)})),this.g.attachEmptyPacketListener("face_landmarks",(i=>{ut(this,i)})),this.outputFaceBlendshapes&&(Jt(e,"blendshapes"),Wt(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",((i,r)=>{if(this.outputFaceBlendshapes)for(const s of i)i=Na(s),this.j.faceBlendshapes.push(Dh(i.g()??[]));ut(this,r)})),this.g.attachEmptyPacketListener("blendshapes",(i=>{ut(this,i)}))),this.outputFacialTransformationMatrixes&&(Jt(e,"face_geometry"),Wt(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",((i,r)=>{if(this.outputFacialTransformationMatrixes)for(const s of i)(i=$t(i=j3(s),k3,2))&&this.j.facialTransformationMatrixes.push({rows:In(i,1)??0??0,columns:In(i,2)??0??0,data:fr(i,3,ei,dr()).slice()??[]});ut(this,r)})),this.g.attachEmptyPacketListener("face_geometry",(i=>{ut(this,i)}))),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Ee.prototype.detectForVideo=Ee.prototype.G,Ee.prototype.detect=Ee.prototype.F,Ee.prototype.setOptions=Ee.prototype.o,Ee.createFromModelPath=function(e,t){return jt(Ee,e,{baseOptions:{modelAssetPath:t}})},Ee.createFromModelBuffer=function(e,t){return jt(Ee,e,{baseOptions:{modelAssetBuffer:t}})},Ee.createFromOptions=function(e,t){return jt(Ee,e,t)},Ee.FACE_LANDMARKS_LIPS=Nh,Ee.FACE_LANDMARKS_LEFT_EYE=Fh,Ee.FACE_LANDMARKS_LEFT_EYEBROW=Oh,Ee.FACE_LANDMARKS_LEFT_IRIS=Gm,Ee.FACE_LANDMARKS_RIGHT_EYE=Bh,Ee.FACE_LANDMARKS_RIGHT_EYEBROW=kh,Ee.FACE_LANDMARKS_RIGHT_IRIS=Vm,Ee.FACE_LANDMARKS_FACE_OVAL=zh,Ee.FACE_LANDMARKS_CONTOURS=Wm,Ee.FACE_LANDMARKS_TESSELATION=Xm;var Hh=qn([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function qd(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function Yd(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function jd(e,t=!0){const n=[];for(const r of e){var i=Na(r);e=[];for(const s of i.g())i=t&&In(s,1)!=null?In(s,1)??0:-1,e.push({score:Ae(s,2)??0,index:i,categoryName:Ve(xe(s,3))??""??"",displayName:Ve(xe(s,4))??""??""});n.push(e)}return n}var fn=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],bt(e=this.j=new _m,0,1,t=new Te),this.u=new Rh,bt(this.j,0,2,this.u),this.D=new wh,bt(this.u,0,3,this.D),this.A=new mm,bt(this.u,0,2,this.A),this.h=new Z3,bt(this.j,0,3,this.h),Et(this.A,2,.5),Et(this.u,4,.5),Et(this.D,2,.5)}get baseOptions(){return $t(this.j,Te,1)}set baseOptions(e){bt(this.j,0,1,e)}o(e){var r,s,o,a;if(Ri(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&Et(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Et(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Et(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new Xr,n=t,i=wl(e.cannedGesturesClassifierOptions,(r=$t(this.h,Xr,3))==null?void 0:r.l());bt(n,0,2,i),bt(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((s=$t(this.h,Xr,3))==null||s.g());return e.customGesturesClassifierOptions?(bt(n=t=new Xr,0,2,i=wl(e.customGesturesClassifierOptions,(o=$t(this.h,Xr,4))==null?void 0:o.l())),bt(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((a=$t(this.h,Xr,4))==null||a.g()),this.l(e)}Ha(e,t){return qd(this),jn(this,e,t),Yd(this)}Ia(e,t,n){return qd(this),li(this,e,n,t),Yd(this)}m(){var e=new Tn;ye(e,"image_in"),ye(e,"norm_rect"),Jt(e,"hand_gestures"),Jt(e,"hand_landmarks"),Jt(e,"world_hand_landmarks"),Jt(e,"handedness");const t=new En;ai(t,$3,this.j);const n=new ln;yn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),Wt(n,"HAND_GESTURES:hand_gestures"),Wt(n,"LANDMARKS:hand_landmarks"),Wt(n,"WORLD_LANDMARKS:world_hand_landmarks"),Wt(n,"HANDEDNESS:handedness"),n.o(t),Nn(e,n),this.g.attachProtoVectorListener("hand_landmarks",((i,r)=>{for(const s of i){i=uo(s);const o=[];for(const a of wi(i,am,1))o.push({x:Ae(a,1)??0,y:Ae(a,2)??0,z:Ae(a,3)??0,visibility:Ae(a,4)??0});this.landmarks.push(o)}ut(this,r)})),this.g.attachEmptyPacketListener("hand_landmarks",(i=>{ut(this,i)})),this.g.attachProtoVectorListener("world_hand_landmarks",((i,r)=>{for(const s of i){i=ts(s);const o=[];for(const a of wi(i,om,1))o.push({x:Ae(a,1)??0,y:Ae(a,2)??0,z:Ae(a,3)??0,visibility:Ae(a,4)??0});this.worldLandmarks.push(o)}ut(this,r)})),this.g.attachEmptyPacketListener("world_hand_landmarks",(i=>{ut(this,i)})),this.g.attachProtoVectorListener("hand_gestures",((i,r)=>{this.gestures.push(...jd(i,!1)),ut(this,r)})),this.g.attachEmptyPacketListener("hand_gestures",(i=>{ut(this,i)})),this.g.attachProtoVectorListener("handedness",((i,r)=>{this.handedness.push(...jd(i)),ut(this,r)})),this.g.attachEmptyPacketListener("handedness",(i=>{ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function Kd(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}fn.prototype.recognizeForVideo=fn.prototype.Ia,fn.prototype.recognize=fn.prototype.Ha,fn.prototype.setOptions=fn.prototype.o,fn.createFromModelPath=function(e,t){return jt(fn,e,{baseOptions:{modelAssetPath:t}})},fn.createFromModelBuffer=function(e,t){return jt(fn,e,{baseOptions:{modelAssetBuffer:t}})},fn.createFromOptions=function(e,t){return jt(fn,e,t)},fn.HAND_CONNECTIONS=Hh;var an=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],bt(e=this.h=new Rh,0,1,t=new Te),this.u=new wh,bt(this.h,0,3,this.u),this.j=new mm,bt(this.h,0,2,this.j),Ri(this.j,3,1),Et(this.j,2,.5),Et(this.u,2,.5),Et(this.h,4,.5)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"numHands"in e&&Ri(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&Et(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Et(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Et(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],jn(this,e,t),Kd(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],li(this,e,n,t),Kd(this)}m(){var e=new Tn;ye(e,"image_in"),ye(e,"norm_rect"),Jt(e,"hand_landmarks"),Jt(e,"world_hand_landmarks"),Jt(e,"handedness");const t=new En;ai(t,J3,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),Wt(n,"LANDMARKS:hand_landmarks"),Wt(n,"WORLD_LANDMARKS:world_hand_landmarks"),Wt(n,"HANDEDNESS:handedness"),n.o(t),Nn(e,n),this.g.attachProtoVectorListener("hand_landmarks",((i,r)=>{for(const s of i)i=uo(s),this.landmarks.push(Oa(i));ut(this,r)})),this.g.attachEmptyPacketListener("hand_landmarks",(i=>{ut(this,i)})),this.g.attachProtoVectorListener("world_hand_landmarks",((i,r)=>{for(const s of i)i=ts(s),this.worldLandmarks.push(qs(i));ut(this,r)})),this.g.attachEmptyPacketListener("world_hand_landmarks",(i=>{ut(this,i)})),this.g.attachProtoVectorListener("handedness",((i,r)=>{var s=this.handedness,o=s.push;const a=[];for(const c of i){i=Na(c);const l=[];for(const h of i.g())l.push({score:Ae(h,2)??0,index:In(h,1)??0??-1,categoryName:Ve(xe(h,3))??""??"",displayName:Ve(xe(h,4))??""??""});a.push(l)}o.call(s,...a),ut(this,r)})),this.g.attachEmptyPacketListener("handedness",(i=>{ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};an.prototype.detectForVideo=an.prototype.G,an.prototype.detect=an.prototype.F,an.prototype.setOptions=an.prototype.o,an.createFromModelPath=function(e,t){return jt(an,e,{baseOptions:{modelAssetPath:t}})},an.createFromModelBuffer=function(e,t){return jt(an,e,{baseOptions:{modelAssetBuffer:t}})},an.createFromOptions=function(e,t){return jt(an,e,t)},an.HAND_CONNECTIONS=Hh;var qm=qn([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Zd(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function $d(e){try{if(!e.D)return e.h;e.D(e.h)}finally{ka(e)}}function qo(e,t){e=uo(e),t.push(Oa(e))}var pe=class extends Sn{constructor(e,t){super(new Yn(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,bt(e=this.j=new ym,0,1,t=new Te),this.I=new wh,bt(this.j,0,2,this.I),this.W=new Q3,bt(this.j,0,3,this.W),this.u=new Fa,bt(this.j,0,4,this.u),this.O=new dm,bt(this.j,0,5,this.O),this.A=new xm,bt(this.j,0,6,this.A),this.M=new Mm,bt(this.j,0,7,this.M),Et(this.u,2,.5),Et(this.u,3,.3),Et(this.O,2,.5),Et(this.A,2,.5),Et(this.A,3,.3),Et(this.M,2,.5),Et(this.I,2,.5)}get baseOptions(){return $t(this.j,Te,1)}set baseOptions(e){bt(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&Et(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&Et(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&Et(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&Et(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&Et(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&Et(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&Et(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,Zd(this),jn(this,e,i),$d(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Zd(this),li(this,e,r,t),$d(this)}m(){var e=new Tn;ye(e,"input_frames_image"),Jt(e,"pose_landmarks"),Jt(e,"pose_world_landmarks"),Jt(e,"face_landmarks"),Jt(e,"left_hand_landmarks"),Jt(e,"left_hand_world_landmarks"),Jt(e,"right_hand_landmarks"),Jt(e,"right_hand_world_landmarks");const t=new En,n=new yd;yn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),(function(r,s){if(s!=null)if(Array.isArray(s))se(r,2,Ea(s,0,$s));else{if(!(typeof s=="string"||s instanceof ii||Yl(s)))throw Error("invalid value in Any.value field: "+s+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");zi(r,2,Kl(s,!1),Sr())}})(n,this.j.g());const i=new ln;yn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),lh(i,8,yd,n),_e(i,"IMAGE:input_frames_image"),Wt(i,"POSE_LANDMARKS:pose_landmarks"),Wt(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),Wt(i,"FACE_LANDMARKS:face_landmarks"),Wt(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),Wt(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),Wt(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),Wt(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),Nn(e,i),Ba(this,e),this.g.attachProtoListener("pose_landmarks",((r,s)=>{qo(r,this.h.poseLandmarks),ut(this,s)})),this.g.attachEmptyPacketListener("pose_landmarks",(r=>{ut(this,r)})),this.g.attachProtoListener("pose_world_landmarks",((r,s)=>{var o=this.h.poseWorldLandmarks;r=ts(r),o.push(qs(r)),ut(this,s)})),this.g.attachEmptyPacketListener("pose_world_landmarks",(r=>{ut(this,r)})),this.outputPoseSegmentationMasks&&(Wt(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),ms(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",((r,s)=>{this.h.poseSegmentationMasks=[gs(this,r,!0,!this.D)],ut(this,s)})),this.g.attachEmptyPacketListener("pose_segmentation_mask",(r=>{this.h.poseSegmentationMasks=[],ut(this,r)}))),this.g.attachProtoListener("face_landmarks",((r,s)=>{qo(r,this.h.faceLandmarks),ut(this,s)})),this.g.attachEmptyPacketListener("face_landmarks",(r=>{ut(this,r)})),this.outputFaceBlendshapes&&(Jt(e,"extra_blendshapes"),Wt(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",((r,s)=>{var o=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(r=Na(r),o.push(Dh(r.g()??[]))),ut(this,s)})),this.g.attachEmptyPacketListener("extra_blendshapes",(r=>{ut(this,r)}))),this.g.attachProtoListener("left_hand_landmarks",((r,s)=>{qo(r,this.h.leftHandLandmarks),ut(this,s)})),this.g.attachEmptyPacketListener("left_hand_landmarks",(r=>{ut(this,r)})),this.g.attachProtoListener("left_hand_world_landmarks",((r,s)=>{var o=this.h.leftHandWorldLandmarks;r=ts(r),o.push(qs(r)),ut(this,s)})),this.g.attachEmptyPacketListener("left_hand_world_landmarks",(r=>{ut(this,r)})),this.g.attachProtoListener("right_hand_landmarks",((r,s)=>{qo(r,this.h.rightHandLandmarks),ut(this,s)})),this.g.attachEmptyPacketListener("right_hand_landmarks",(r=>{ut(this,r)})),this.g.attachProtoListener("right_hand_world_landmarks",((r,s)=>{var o=this.h.rightHandWorldLandmarks;r=ts(r),o.push(qs(r)),ut(this,s)})),this.g.attachEmptyPacketListener("right_hand_world_landmarks",(r=>{ut(this,r)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};pe.prototype.detectForVideo=pe.prototype.G,pe.prototype.detect=pe.prototype.F,pe.prototype.setOptions=pe.prototype.o,pe.createFromModelPath=function(e,t){return jt(pe,e,{baseOptions:{modelAssetPath:t}})},pe.createFromModelBuffer=function(e,t){return jt(pe,e,{baseOptions:{modelAssetBuffer:t}})},pe.createFromOptions=function(e,t){return jt(pe,e,t)},pe.HAND_CONNECTIONS=Hh,pe.POSE_CONNECTIONS=qm,pe.FACE_LANDMARKS_LIPS=Nh,pe.FACE_LANDMARKS_LEFT_EYE=Fh,pe.FACE_LANDMARKS_LEFT_EYEBROW=Oh,pe.FACE_LANDMARKS_LEFT_IRIS=Gm,pe.FACE_LANDMARKS_RIGHT_EYE=Bh,pe.FACE_LANDMARKS_RIGHT_EYEBROW=kh,pe.FACE_LANDMARKS_RIGHT_IRIS=Vm,pe.FACE_LANDMARKS_FACE_OVAL=zh,pe.FACE_LANDMARKS_CONTOURS=Wm,pe.FACE_LANDMARKS_TESSELATION=Xm;var Cn=class extends Sn{constructor(e,t){super(new Yn(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},bt(e=this.h=new Sm,0,1,t=new Te)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return bt(this.h,0,2,wl(e,$t(this.h,bh,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},jn(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},li(this,e,n,t),this.j}m(){var e=new Tn;ye(e,"input_image"),ye(e,"norm_rect"),Jt(e,"classifications");const t=new En;ai(t,tM,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),_e(n,"IMAGE:input_image"),_e(n,"NORM_RECT:norm_rect"),Wt(n,"CLASSIFICATIONS:classifications"),n.o(t),Nn(e,n),this.g.attachProtoListener("classifications",((i,r)=>{this.j=oM(G3(i)),ut(this,r)})),this.g.attachEmptyPacketListener("classifications",(i=>{ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Cn.prototype.classifyForVideo=Cn.prototype.ta,Cn.prototype.classify=Cn.prototype.sa,Cn.prototype.setOptions=Cn.prototype.o,Cn.createFromModelPath=function(e,t){return jt(Cn,e,{baseOptions:{modelAssetPath:t}})},Cn.createFromModelBuffer=function(e,t){return jt(Cn,e,{baseOptions:{modelAssetBuffer:t}})},Cn.createFromOptions=function(e,t){return jt(Cn,e,t)};var pn=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect",!0),this.h=new Em,this.embeddings={embeddings:[]},bt(e=this.h,0,1,t=new Te)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){var t=this.h,n=$t(this.h,Pd,2);return n=n?n.clone():new Pd,e.l2Normalize!==void 0?se(n,1,Zs(e.l2Normalize)):"l2Normalize"in e&&se(n,1),e.quantize!==void 0?se(n,2,Zs(e.quantize)):"quantize"in e&&se(n,2),bt(t,0,2,n),this.l(e)}za(e,t){return jn(this,e,t),this.embeddings}Aa(e,t,n){return li(this,e,n,t),this.embeddings}m(){var e=new Tn;ye(e,"image_in"),ye(e,"norm_rect"),Jt(e,"embeddings_out");const t=new En;ai(t,eM,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),Wt(n,"EMBEDDINGS:embeddings_out"),n.o(t),Nn(e,n),this.g.attachProtoListener("embeddings_out",((i,r)=>{i=X3(i),this.embeddings=(function(s){return{embeddings:wi(s,W3,1).map((o=>{var l,h;const a={headIndex:In(o,3)??0??-1,headName:Ve(xe(o,4))??""??""};var c=o.v;return Mp(c,0|c[gt],Cd,Mc(o,1))!==void 0?(o=fr(o=$t(o,Cd,Mc(o,1),void 0),1,ei,dr()),a.floatEmbedding=o.slice()):(c=new Uint8Array(0),a.quantizedEmbedding=((h=(l=$t(o,V3,Mc(o,2),void 0))==null?void 0:l.na())==null?void 0:h.h())??c),a})),timestampMs:Pm(xe(s,2,void 0,void 0,sa)??mp)}})(i),ut(this,r)})),this.g.attachEmptyPacketListener("embeddings_out",(i=>{ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};pn.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=Fd(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=Fd(Nd(e.quantizedEmbedding),Nd(t.quantizedEmbedding))}return e},pn.prototype.embedForVideo=pn.prototype.Aa,pn.prototype.embed=pn.prototype.za,pn.prototype.setOptions=pn.prototype.o,pn.createFromModelPath=function(e,t){return jt(pn,e,{baseOptions:{modelAssetPath:t}})},pn.createFromModelBuffer=function(e,t){return jt(pn,e,{baseOptions:{modelAssetBuffer:t}})},pn.createFromOptions=function(e,t){return jt(pn,e,t)};var Ll=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach((n=>{n.close()})),(t=this.categoryMask)==null||t.close()}};function fM(e){var n,i;const t=(function(r){return wi(r,ln,1)})(e.ca()).filter((r=>(Ve(xe(r,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator")));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=$t(t[0],En,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach(((r,s)=>{e.u[Number(s)]=Ve(xe(r,1))??""}))}function Jd(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Qd(e){try{const t=new Ll(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{ka(e)}}Ll.prototype.close=Ll.prototype.close;var on=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Lh,this.A=new Tm,bt(this.h,0,3,this.A),bt(e=this.h,0,1,t=new Te)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?se(this.h,2,co(e.displayNamesLocale)):"displayNamesLocale"in e&&se(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){fM(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,Jd(this),jn(this,e,i),Qd(this)}La(e,t,n,i){const r=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,Jd(this),li(this,e,r,t),Qd(this)}Da(){return this.u}m(){var e=new Tn;ye(e,"image_in"),ye(e,"norm_rect");const t=new En;ai(t,Am,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),n.o(t),Nn(e,n),Ba(this,e),this.outputConfidenceMasks&&(Jt(e,"confidence_masks"),Wt(n,"CONFIDENCE_MASKS:confidence_masks"),ms(this,"confidence_masks"),this.g.aa("confidence_masks",((i,r)=>{this.confidenceMasks=i.map((s=>gs(this,s,!0,!this.j))),ut(this,r)})),this.g.attachEmptyPacketListener("confidence_masks",(i=>{this.confidenceMasks=[],ut(this,i)}))),this.outputCategoryMask&&(Jt(e,"category_mask"),Wt(n,"CATEGORY_MASK:category_mask"),ms(this,"category_mask"),this.g.Z("category_mask",((i,r)=>{this.categoryMask=gs(this,i,!1,!this.j),ut(this,r)})),this.g.attachEmptyPacketListener("category_mask",(i=>{this.categoryMask=void 0,ut(this,i)}))),Jt(e,"quality_scores"),Wt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",((i,r)=>{this.qualityScores=i,ut(this,r)})),this.g.attachEmptyPacketListener("quality_scores",(i=>{this.categoryMask=void 0,ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};on.prototype.getLabels=on.prototype.Da,on.prototype.segmentForVideo=on.prototype.La,on.prototype.segment=on.prototype.segment,on.prototype.setOptions=on.prototype.o,on.createFromModelPath=function(e,t){return jt(on,e,{baseOptions:{modelAssetPath:t}})},on.createFromModelBuffer=function(e,t){return jt(on,e,{baseOptions:{modelAssetBuffer:t}})},on.createFromOptions=function(e,t){return jt(on,e,t)};var Dl=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach((n=>{n.close()})),(t=this.categoryMask)==null||t.close()}};Dl.prototype.close=Dl.prototype.close;var $n=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Lh,this.u=new Tm,bt(this.h,0,3,this.u),bt(e=this.h,0,1,t=new Te)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const r=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new wm,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var s=new Tc;zi(s,3,Zs(!0),!1),zi(s,1,Vs(t.keypoint.x),0),zi(s,2,Vs(t.keypoint.y),0),Ws(i,1,Al,s)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const a=new iM;for(s of t.scribble)zi(t=new Tc,3,Zs(!0),!1),zi(t,1,Vs(s.x),0),zi(t,2,Vs(s.y),0),lh(a,1,Tc,t);Ws(i,2,Al,a)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),jn(this,e,r);t:{try{const a=new Dl(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var o=a;break t}this.j(a)}finally{ka(this)}o=void 0}return o}m(){var e=new Tn;ye(e,"image_in"),ye(e,"roi_in"),ye(e,"norm_rect_in");const t=new En;ai(t,Am,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),_e(n,"IMAGE:image_in"),_e(n,"ROI:roi_in"),_e(n,"NORM_RECT:norm_rect_in"),n.o(t),Nn(e,n),Ba(this,e),this.outputConfidenceMasks&&(Jt(e,"confidence_masks"),Wt(n,"CONFIDENCE_MASKS:confidence_masks"),ms(this,"confidence_masks"),this.g.aa("confidence_masks",((i,r)=>{this.confidenceMasks=i.map((s=>gs(this,s,!0,!this.j))),ut(this,r)})),this.g.attachEmptyPacketListener("confidence_masks",(i=>{this.confidenceMasks=[],ut(this,i)}))),this.outputCategoryMask&&(Jt(e,"category_mask"),Wt(n,"CATEGORY_MASK:category_mask"),ms(this,"category_mask"),this.g.Z("category_mask",((i,r)=>{this.categoryMask=gs(this,i,!1,!this.j),ut(this,r)})),this.g.attachEmptyPacketListener("category_mask",(i=>{this.categoryMask=void 0,ut(this,i)}))),Jt(e,"quality_scores"),Wt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",((i,r)=>{this.qualityScores=i,ut(this,r)})),this.g.attachEmptyPacketListener("quality_scores",(i=>{this.categoryMask=void 0,ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};$n.prototype.segment=$n.prototype.segment,$n.prototype.setOptions=$n.prototype.o,$n.createFromModelPath=function(e,t){return jt($n,e,{baseOptions:{modelAssetPath:t}})},$n.createFromModelBuffer=function(e,t){return jt($n,e,{baseOptions:{modelAssetBuffer:t}})},$n.createFromOptions=function(e,t){return jt($n,e,t)};var Pn=class extends Sn{constructor(e,t){super(new Yn(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},bt(e=this.h=new Rm,0,1,t=new Te)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?se(this.h,2,co(e.displayNamesLocale)):"displayNamesLocale"in e&&se(this.h,2),e.maxResults!==void 0?Ri(this.h,3,e.maxResults):"maxResults"in e&&se(this.h,3),e.scoreThreshold!==void 0?Et(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&se(this.h,4),e.categoryAllowlist!==void 0?aa(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&se(this.h,5),e.categoryDenylist!==void 0?aa(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&se(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},jn(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},li(this,e,n,t),this.j}m(){var e=new Tn;ye(e,"input_frame_gpu"),ye(e,"norm_rect"),Jt(e,"detections");const t=new En;ai(t,rM,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),_e(n,"IMAGE:input_frame_gpu"),_e(n,"NORM_RECT:norm_rect"),Wt(n,"DETECTIONS:detections"),n.o(t),Nn(e,n),this.g.attachProtoVectorListener("detections",((i,r)=>{for(const s of i)i=sm(s),this.j.detections.push(Lm(i));ut(this,r)})),this.g.attachEmptyPacketListener("detections",(i=>{ut(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Pn.prototype.detectForVideo=Pn.prototype.G,Pn.prototype.detect=Pn.prototype.F,Pn.prototype.setOptions=Pn.prototype.o,Pn.createFromModelPath=async function(e,t){return jt(Pn,e,{baseOptions:{modelAssetPath:t}})},Pn.createFromModelBuffer=function(e,t){return jt(Pn,e,{baseOptions:{modelAssetBuffer:t}})},Pn.createFromOptions=function(e,t){return jt(Pn,e,t)};var Il=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach((t=>{t.close()}))}};function tf(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function ef(e){try{const t=new Il(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{ka(e)}}Il.prototype.close=Il.prototype.close;var mn=class extends Sn{constructor(e,t){super(new Yn(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,bt(e=this.h=new Cm,0,1,t=new Te),this.A=new Mm,bt(this.h,0,3,this.A),this.j=new xm,bt(this.h,0,2,this.j),Ri(this.j,4,1),Et(this.j,2,.5),Et(this.A,2,.5),Et(this.h,4,.5)}get baseOptions(){return $t(this.h,Te,1)}set baseOptions(e){bt(this.h,0,1,e)}o(e){return"numPoses"in e&&Ri(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&Et(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&Et(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&Et(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,tf(this),jn(this,e,i),ef(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,tf(this),li(this,e,r,t),ef(this)}m(){var e=new Tn;ye(e,"image_in"),ye(e,"norm_rect"),Jt(e,"normalized_landmarks"),Jt(e,"world_landmarks"),Jt(e,"segmentation_masks");const t=new En;ai(t,sM,this.h);const n=new ln;yn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),_e(n,"IMAGE:image_in"),_e(n,"NORM_RECT:norm_rect"),Wt(n,"NORM_LANDMARKS:normalized_landmarks"),Wt(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),Nn(e,n),Ba(this,e),this.g.attachProtoVectorListener("normalized_landmarks",((i,r)=>{this.landmarks=[];for(const s of i)i=uo(s),this.landmarks.push(Oa(i));ut(this,r)})),this.g.attachEmptyPacketListener("normalized_landmarks",(i=>{this.landmarks=[],ut(this,i)})),this.g.attachProtoVectorListener("world_landmarks",((i,r)=>{this.worldLandmarks=[];for(const s of i)i=ts(s),this.worldLandmarks.push(qs(i));ut(this,r)})),this.g.attachEmptyPacketListener("world_landmarks",(i=>{this.worldLandmarks=[],ut(this,i)})),this.outputSegmentationMasks&&(Wt(n,"SEGMENTATION_MASK:segmentation_masks"),ms(this,"segmentation_masks"),this.g.aa("segmentation_masks",((i,r)=>{this.segmentationMasks=i.map((s=>gs(this,s,!0,!this.u))),ut(this,r)})),this.g.attachEmptyPacketListener("segmentation_masks",(i=>{this.segmentationMasks=[],ut(this,i)}))),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};mn.prototype.detectForVideo=mn.prototype.G,mn.prototype.detect=mn.prototype.F,mn.prototype.setOptions=mn.prototype.o,mn.createFromModelPath=function(e,t){return jt(mn,e,{baseOptions:{modelAssetPath:t}})},mn.createFromModelBuffer=function(e,t){return jt(mn,e,{baseOptions:{modelAssetBuffer:t}})},mn.createFromOptions=function(e,t){return jt(mn,e,t)},mn.POSE_CONNECTIONS=qm;const pM=33;class mM{constructor(){ne(this,"handLandmarker",null);ne(this,"video",null);ne(this,"ready",!1);ne(this,"lastDetectionTime",0);ne(this,"frameId",null)}isReady(){return this.ready}async init(t){this.video=t;try{const n=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:"user"}});t.srcObject=n,await t.play();let i;try{i=await lr.forVisionTasks("/mediapipe/")}catch{console.warn("[HandTracker] Local WASM not found, falling back to CDN"),i=await lr.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm")}this.handLandmarker=await an.createFromOptions(i,{baseOptions:{modelAssetPath:"/mediapipe/hand_landmarker.task",delegate:"GPU"},runningMode:"VIDEO",numHands:2,minHandDetectionConfidence:.5,minTrackingConfidence:.5}),this.ready=!0,Qe.emit("handtracker:ready",void 0),this.detectionLoop()}catch(n){console.warn("[HandTracker] Initialization failed:",n),Qe.emit("handtracker:error",n instanceof Error?n:new Error(String(n)))}}detectionLoop(){this.frameId=requestAnimationFrame(t=>{var n,i,r,s,o,a,c;if(!(!this.ready||!this.handLandmarker||!this.video)){if(t-this.lastDetectionTime>=pM&&(this.lastDetectionTime=t,this.video.readyState>=2))try{const l=this.handLandmarker.detectForVideo(this.video,t),h=[];for(let u=0;u<l.landmarks.length;u++){const d=l.landmarks[u],m=(n=l.worldLandmarks)==null?void 0:n[u];h.push({landmarks:d.map(_=>({x:_.x,y:_.y,z:_.z})),worldLandmarks:m?m.map(_=>({x:_.x,y:_.y,z:_.z})):d.map(_=>({x:_.x,y:_.y,z:_.z})),handedness:((s=(r=(i=l.handednesses)==null?void 0:i[u])==null?void 0:r[0])==null?void 0:s.categoryName)==="Left"?"left":"right",confidence:((c=(a=(o=l.handednesses)==null?void 0:o[u])==null?void 0:a[0])==null?void 0:c.score)??.5})}Qe.emit("hand:data",h)}catch{}this.detectionLoop()}})}dispose(){var t,n;this.frameId!==null&&(cancelAnimationFrame(this.frameId),this.frameId=null),(t=this.video)!=null&&t.srcObject&&(this.video.srcObject.getTracks().forEach(r=>r.stop()),this.video.srcObject=null),(n=this.handLandmarker)==null||n.close(),this.handLandmarker=null,this.ready=!1}}const _M=new mM;function Js(e,t){const n=e.x-t.x,i=e.y-t.y,r=e.z-t.z;return Math.sqrt(n*n+i*i+r*r)}function Yo(e,t,n){const i=e[0],r=e[t],s=e[n];return Js(r,i)>Js(s,i)*1}function gM(e){const t=e[4],n=e[5],i=e[3];return Js(t,n)>Js(i,n)*.8}function sr(e,t){const n=[{extended:gM(e),expected:t.thumb},{extended:Yo(e,8,5),expected:t.index},{extended:Yo(e,12,9),expected:t.middle},{extended:Yo(e,16,13),expected:t.ring},{extended:Yo(e,20,17),expected:t.pinky}];let i=0;for(const r of n)i+=r.extended===r.expected?.2:0;return i}function vM(e){const t=e.landmarks;if(t.length<21)return null;const n=[],i=sr(t,{thumb:!0,index:!0,middle:!0,ring:!0,pinky:!0});i>.6&&n.push({type:"open_palm",confidence:i});const r=sr(t,{thumb:!1,index:!1,middle:!1,ring:!1,pinky:!1});if(r>.6&&n.push({type:"closed_fist",confidence:r}),Js(t[4],t[8])<.06){const u=sr(t,{thumb:!0,index:!0,middle:!1,ring:!1,pinky:!1});n.push({type:"pinch",confidence:Math.max(.7,u)})}const o=sr(t,{thumb:!1,index:!0,middle:!1,ring:!1,pinky:!1});o>.6&&n.push({type:"pointing",confidence:o});const a=sr(t,{thumb:!1,index:!0,middle:!0,ring:!1,pinky:!1});a>.6&&n.push({type:"peace",confidence:a});const c=sr(t,{thumb:!1,index:!0,middle:!1,ring:!1,pinky:!0});c>.6&&n.push({type:"rock",confidence:c});const l=sr(t,{thumb:!0,index:!1,middle:!1,ring:!1,pinky:!1}),h=t[4].y<t[0].y-.05;return l>.6&&h&&n.push({type:"thumbs_up",confidence:l}),n.length===0?null:(n.sort((u,d)=>d.confidence-u.confidence),n[0])}const xM=.3,MM=4;function yM(e,t){if(t.length<MM)return null;const n=t[t.length-1],i=t[Math.max(0,t.length-6)],r=(n.timestamp-i.timestamp)/1e3;if(r<.05)return null;const s=n.landmarks[0],o=i.landmarks[0],a=(s.x-o.x)/r,c=(s.y-o.y)/r,l=Math.sqrt(a*a+c*c);if(l<xM)return null;const h=Math.abs(a),u=Math.abs(c),m=Math.min(l/5,1);let _,v;return h>u?a<0?(_="swipe_left",v={x:-1,y:0,z:0}):(_="swipe_right",v={x:1,y:0,z:0}):c<0?(_="swipe_up",v={x:0,y:1,z:0}):(_="swipe_down",v={x:0,y:-1,z:0}),{type:_,confidence:m,direction:v}}function _n(e,t){return Math.sqrt((e.x-t.x)**2+(e.y-t.y)**2+(e.z-t.z)**2)}function SM(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2,z:(e.z+t.z)/2}}function nf(e){const t=e.landmarks;if(t.length<21)return!1;const n=t[0];let i=0;for(const r of[8,12,16,20]){const s=r-3;_n(t[r],n)>_n(t[s],n)&&i++}return _n(t[4],t[5])>_n(t[3],t[5])*.8&&i++,i>=4}function rf(e){const t=e.landmarks;if(t.length<21)return!1;const n=t[0];let i=0;for(const r of[8,12,16,20]){const s=r-3;_n(t[r],n)>_n(t[s],n)&&i++}return i<=1}function EM(e,t,n,i){const r=e.landmarks[0],s=t.landmarks[0],o=_n(r,s);SM(r,s);const a=[],c=nf(e),l=nf(t),h=rf(e),u=rf(t);let d=0;if(n.length>=4&&i.length>=4){const v=n[Math.max(0,n.length-5)],p=i[Math.max(0,i.length-5)],f=_n(v.landmarks[0],p.landmarks[0]);d=o-f}if(c&&l&&d>.03&&a.push({type:"two_spread",confidence:.8}),c&&l&&d<-.05&&o<.3&&a.push({type:"two_clap",confidence:.9}),h&&u&&d>.03){const v={x:s.x-r.x,y:s.y-r.y,z:s.z-r.z},p=Math.sqrt(v.x**2+v.y**2+v.z**2)||1;v.x/=p,v.y/=p,v.z/=p,a.push({type:"two_pull",confidence:.75,direction:v})}if(h&&u&&d<-.03&&a.push({type:"two_push",confidence:.75}),c&&l){const v=Math.abs(r.y-s.y),p=Math.abs(r.x-s.x);v<.1&&p>.15&&a.push({type:"two_mirror",confidence:.7})}if(n.length>=6&&i.length>=6){const v=sf(n),p=sf(i);if(v<.02&&p>.05){const f=of(i);f>.5&&a.push({type:"two_orbit",confidence:f*.8})}else if(p<.02&&v>.05){const f=of(n);f>.5&&a.push({type:"two_orbit",confidence:f*.8})}}const m=_n(e.landmarks[4],e.landmarks[8])<.08,_=_n(t.landmarks[4],t.landmarks[8])<.08;return m&&_&&Math.abs(d)>.02&&a.push({type:"two_scale",confidence:.7}),a.length===0?null:(a.sort((v,p)=>p.confidence-v.confidence),a[0])}function sf(e){if(e.length<2)return 0;let t=0;for(let n=1;n<e.length;n++)t+=_n(e[n].landmarks[0],e[n-1].landmarks[0]);return t}function of(e){if(e.length<4)return 0;const t=e.map(s=>s.landmarks[0]);let n=0;for(let s=1;s<t.length;s++)n+=_n(t[s],t[s-1]);const i=_n(t[0],t[t.length-1]);if(i<.01)return n>.05?1:0;const r=n/(i*3);return Math.min(r,1)}const TM=10,af=30,cf=20,lf=10;class bM{constructor(){ne(this,"handHistory",new Map);ne(this,"currentGesture","none");ne(this,"gestureStartTime",0)}init(){Qe.on("hand:data",t=>this.onHandData(t))}onHandData(t){const n=performance.now();if(t.length===0){this.emitGesture({type:"none",confidence:0,origin:{x:0,y:0,z:0},intensity:0,handedness:"right",timestamp:n});return}for(const l of t){const h=l.handedness;this.handHistory.has(h)||this.handHistory.set(h,[]);const u=this.handHistory.get(h);u.push({landmarks:l.landmarks,worldLandmarks:l.worldLandmarks,timestamp:n}),u.length>TM&&u.shift()}let i={type:"none",confidence:0},r;if(t.length>=2){const l=t[0],h=t[1],u=this.handHistory.get(l.handedness)||[],d=this.handHistory.get(h.handedness)||[],m=EM(l,h,u,d);m&&m.confidence>i.confidence&&(i=m,r=m.direction)}for(const l of t){const h=this.handHistory.get(l.handedness)||[],u=vM(l);u&&u.confidence>i.confidence&&(i=u);const d=yM(l,h);d&&d.confidence>i.confidence&&(i=d,r=d.direction)}const o=t[0].landmarks[0],a={x:(o.x-.5)*af,y:-(o.y-.5)*cf,z:o.z*lf};if(t.length>=2){const l=t[1].landmarks[0];a.x=((o.x+l.x)/2-.5)*af,a.y=(-(o.y+l.y)/2+.5)*cf,a.z=(o.z+l.z)/2*lf}const c={type:i.type,confidence:i.confidence,origin:a,direction:r,intensity:i.confidence,handedness:t.length>=2?"both":t[0].handedness,timestamp:n};this.emitGesture(c)}emitGesture(t){Qe.emit("gesture:update",t),t.type!==this.currentGesture&&(this.currentGesture=t.type,this.gestureStartTime=t.timestamp,Qe.emit("gesture:changed",t))}}const AM=new bM,wM=document.getElementById("gesture-display"),Ac=document.getElementById("status-display");function RM(e){const t={open_palm:"🖐️ Open Palm",closed_fist:"✊ Closed Fist",pinch:"🤏 Pinch",pointing:"👉 Pointing",peace:"✌️ Peace",rock:"🤘 Rock",thumbs_up:"👍 Thumbs Up",swipe_left:"👈 Swipe Left",swipe_right:"👉 Swipe Right",swipe_up:"👆 Swipe Up",swipe_down:"👇 Swipe Down",two_spread:"🙌 Two Spread",two_clap:"👏 Two Clap",two_pull:"↔️ Two Pull",two_push:"🤜 Two Push",two_orbit:"🔄 Two Orbit",two_mirror:"🪞 Two Mirror",two_scale:"🔍 Two Scale",none:"—"};wM.textContent=t[e.type]||e.type}function hf(){const e=document.getElementById("scene"),t=document.getElementById("camera-feed");zo.init(e),Sx.init(zo.scene),he.init(zo.scene),wx.init(),Px.init(),Qe.on("gesture:update",RM),zo.startLoop(),Ac.textContent="particles ready · keyboard active · loading camera…",_M.init(t).then(()=>{AM.init(),Ac.textContent="camera active · hand tracking ready"}).catch(()=>{Ac.textContent="camera unavailable · keyboard-only mode (1-0 keys)"})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hf):hf();
