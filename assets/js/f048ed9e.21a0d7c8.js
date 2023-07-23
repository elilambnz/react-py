"use strict";(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[962],{3905:(e,t,n)=>{n.r(t),n.d(t,{MDXContext:()=>c,MDXProvider:()=>p,mdx:()=>g,useMDXComponents:()=>d,withMDXComponents:()=>u});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){return function(t){var n=d(t.components);return r.createElement(e,i({},t,{components:n}))}},d=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(c.Provider,{value:t},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=d(n),p=o,m=u["".concat(a,".").concat(p)]||u[p]||f[p]||i;return n?r.createElement(m,l(l({ref:t},c),{},{components:n})):r.createElement(m,l({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},5675:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_position:1},a="Getting Started",l={unversionedId:"introduction/getting-started",id:"introduction/getting-started",title:"Getting Started",description:"Run Python (3.11) code directly in the browser using Pyodide.",source:"@site/docs/introduction/getting-started.md",sourceDirName:"introduction",slug:"/introduction/getting-started",permalink:"/react-py/docs/introduction/getting-started",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Usage",permalink:"/react-py/docs/introduction/usage"}},s={},c=[{value:"Requirements",id:"requirements",level:2},{value:"Installation",id:"installation",level:2},{value:"Limitations",id:"limitations",level:2}],u={toc:c},d="wrapper";function p(e){let{components:t,...n}=e;return(0,o.mdx)(d,(0,r.default)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"getting-started"},"Getting Started"),(0,o.mdx)("p",null,"Run Python (3.11) code directly in the browser using ",(0,o.mdx)("a",{parentName:"p",href:"https://pyodide.org"},"Pyodide"),"."),(0,o.mdx)("p",null,"Learn how to get ",(0,o.mdx)("inlineCode",{parentName:"p"},"react-py")," set up in your project."),(0,o.mdx)("h2",{id:"requirements"},"Requirements"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("a",{parentName:"li",href:"https://reactjs.org"},"React")," version 16.9.0 or above")),(0,o.mdx)("h2",{id:"installation"},"Installation"),(0,o.mdx)("p",null,"Install ",(0,o.mdx)("inlineCode",{parentName:"p"},"react-py")," with:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sh"},"npm install react-py\n")),(0,o.mdx)("h2",{id:"limitations"},"Limitations"),(0,o.mdx)("p",null,"Most of the Python standard library is functional, except from some modules. The following modules can be imported, but are not functional due to the limitations of the WebAssembly VM:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"multiprocessing"),(0,o.mdx)("li",{parentName:"ul"},"threading"),(0,o.mdx)("li",{parentName:"ul"},"sockets")),(0,o.mdx)("p",null,"Learn more about the limitations ",(0,o.mdx)("a",{parentName:"p",href:"https://pyodide.org/en/stable/usage/wasm-constraints.html"},"here"),"."))}p.isMDXComponent=!0}}]);