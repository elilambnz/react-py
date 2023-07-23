"use strict";var __awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(a,i){function o(e){try{l(n.next(e))}catch(t){i(t)}}function s(e){try{l(n.throw(e))}catch(t){i(t)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,s)}l((n=n.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var r,n,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(l){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(o=0)),o;)try{if(r=1,n&&(a=2&s[0]?n.return:s[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,s[1])).done)return a;switch(n=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,n=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(l){s=[6,l],n=0}finally{r=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}},__read=this&&this.__read||function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,a,i=r.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)o.push(n.value)}catch(s){a={error:s}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(a)throw a.error}}return o},__spreadArray=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,a=0,i=t.length;a<i;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))};addEventListener("install",(function(){self.skipWaiting()})),addEventListener("activate",(function(){self.clients.claim()}));var resolvers=new Map;addEventListener("message",(function(e){if("INPUT"===e.data.type){var t=resolvers.get(e.data.id);if(!t||0===t.length)return void console.error("Error handing input: No resolver");t.shift()(new Response(e.data.value,{status:200}))}})),addEventListener("fetch",(function(e){var t=new URL(e.request.url);if("/get_input/"===t.pathname){var r=t.searchParams.get("id"),n=t.searchParams.get("prompt");e.waitUntil(__awaiter(void 0,void 0,void 0,(function(){return __generator(this,(function(e){return self.clients.matchAll().then((function(e){e.forEach((function(e){"window"===e.type&&e.postMessage({type:"AWAITING_INPUT",id:r,prompt:n})}))})),[2]}))})));var a=new Promise((function(e){return resolvers.set(r,__spreadArray(__spreadArray([],__read(resolvers.get(r)||[]),!1),[e],!1))}));e.respondWith(a)}}));