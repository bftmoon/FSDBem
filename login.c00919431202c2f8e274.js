!function(t){function e(e){for(var r,a,c=e[0],u=e[1],s=e[2],f=0,p=[];f<c.length;f++)a=c[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(l&&l(e);p.length;)p.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={26:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=o[t]=[e,r]}));e.push(n[2]=r);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.src=function(t){return a.p+""+({29:"npm.jquery.maskedinput"}[t]||t)+"."+{29:"2e5fb5159c8c25a8af8f"}[t]+".js"}(t);var u=new Error;i=function(e){c.onerror=c.onload=null,clearTimeout(s);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,n[1](u)}o[t]=void 0}};var s=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(e)},a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a.oe=function(t){throw console.error(t),t};var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var l=u;i.push(["aVce",2,0,1,3,5,7,8,10,15]),n()}({"1nUP":function(t,e,n){"use strict";(function(t){var r=n("Z5H0"),o=n("hwJT");class i{create(){this.$cards=t(".js-login__card"),r.a.initDefault({registrationClickListener:this._handleRegistrationButtonClick.bind(this)}),o.a.initDefault({loginClickListener:this._handleLoginButtonClick.bind(this)}),i.isLoginLocation()||this.$cards.toggleClass("login__card_hidden")}_handleLoginButtonClick(){this._updateLocation()}_handleRegistrationButtonClick(){this._updateLocation()}_updateLocation(){window.location.search=i.isLoginLocation()?"sign=up":"sign=in"}static isLoginLocation(){return"in"===window.location.search.split("=")[1]}}e.a=i}).call(this,n("EVdn"))},P2cl:function(t,e,n){},aVce:function(t,e,n){"use strict";n.r(e);n("ECeb"),n("P2cl");(new(n("1nUP").a)).create()}});
//# sourceMappingURL=login.c00919431202c2f8e274.js.map