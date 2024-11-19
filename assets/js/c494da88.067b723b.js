"use strict";(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[96],{3388:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var s=n(4848),t=n(8453);const r={sidebar_position:5},i="Usage with Docusaurus",c={id:"introduction/docusaurus-usage",title:"Usage with Docusaurus",description:"react-py is not Server-Side Rendering (SSR) friendly, due to client only APIs such as web workers. To use this package with Docusaurus, ensure it is loaded on the client side only.",source:"@site/docs/introduction/docusaurus-usage.md",sourceDirName:"introduction",slug:"/introduction/docusaurus-usage",permalink:"/react-py/docs/introduction/docusaurus-usage",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Usage with Next.js",permalink:"/react-py/docs/introduction/nextjs-usage"},next:{title:"API Reference",permalink:"/react-py/docs/introduction/api-reference"}},u={},d=[{value:"Adding the <code>PythonProvider</code>",id:"adding-the-pythonprovider",level:2},{value:"Overriding the CodeBlock component",id:"overriding-the-codeblock-component",level:2},{value:"Docusaurus config",id:"docusaurus-config",level:2},{value:"Python Docusaurus Template",id:"python-docusaurus-template",level:2}];function a(e){const o={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,t.useMDXComponents)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.h1,{id:"usage-with-docusaurus",children:"Usage with Docusaurus"}),"\n",(0,s.jsx)(o.admonition,{type:"info",children:(0,s.jsxs)(o.p,{children:[(0,s.jsx)(o.code,{children:"react-py"})," is not Server-Side Rendering (SSR) friendly, due to client only APIs such as web workers. To use this package with ",(0,s.jsx)(o.a,{href:"https://docusaurus.io",children:"Docusaurus"}),", ensure it is loaded on the client side only."]})}),"\n",(0,s.jsxs)(o.h2,{id:"adding-the-pythonprovider",children:["Adding the ",(0,s.jsx)(o.code,{children:"PythonProvider"})]}),"\n",(0,s.jsxs)(o.p,{children:["Wrap your site with the ",(0,s.jsx)(o.code,{children:"<Root>"})," component ",(0,s.jsx)(o.a,{href:"https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root",children:"https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root"}),". Then wrap your site with the ",(0,s.jsx)(o.code,{children:"PythonProvider"})," component:"]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-tsx",children:"import React from 'react'\nimport { PythonProvider } from 'react-py'\n\nexport default function Root({ children }) {\n  return <PythonProvider>{children}</PythonProvider>\n}\n"})}),"\n",(0,s.jsx)(o.h2,{id:"overriding-the-codeblock-component",children:"Overriding the CodeBlock component"}),"\n",(0,s.jsxs)(o.p,{children:["You can override the default CodeBlock by swizzling the component, ",(0,s.jsx)(o.a,{href:"https://docusaurus.io/docs/swizzling",children:"more about swizzling"}),"."]}),"\n",(0,s.jsxs)(o.p,{children:["For a full example, check out an example of a Docusaurus site using ",(0,s.jsx)(o.code,{children:"react-py"})," at ",(0,s.jsx)(o.a,{href:"https://github.com/James-Ansley/python-docusaurus-template",children:"https://github.com/James-Ansley/python-docusaurus-template"}),", specifically ",(0,s.jsx)(o.code,{children:"src/theme/CodeBlock"})," and ",(0,s.jsx)(o.code,{children:"src/components/CodeEditor"}),"."]}),"\n",(0,s.jsx)(o.h2,{id:"docusaurus-config",children:"Docusaurus config"}),"\n",(0,s.jsxs)(o.p,{children:["We've encountered a Webpack issue when bundling a Docusaurus site with this package. The following plugin can be added to ",(0,s.jsx)(o.code,{children:"docusaurus.config.js"})," to resolve this issue:"]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-js",children:"plugins: [\n  async function disableUsedExports() {\n    return {\n      name: 'disable-used-exports',\n      configureWebpack() {\n        return {\n          optimization: {\n            usedExports: false\n          }\n        }\n      }\n    }\n  }\n]\n"})}),"\n",(0,s.jsxs)(o.p,{children:[(0,s.jsx)(o.a,{href:"https://github.com/facebook/docusaurus/issues/8389",children:"Read more about this issue here"}),"."]}),"\n",(0,s.jsx)(o.h2,{id:"python-docusaurus-template",children:"Python Docusaurus Template"}),"\n",(0,s.jsxs)(o.p,{children:["Get started with ",(0,s.jsx)(o.code,{children:"react-py"})," and Docusaurus, you can use the ",(0,s.jsx)(o.a,{href:"https://github.com/James-Ansley/python-docusaurus-template",children:"Python Docusaurus Template"}),'. Click the green "Use this template" button on the repository page to clone, then follow the Docusaurus configuration steps for your specific site.']})]})}function h(e={}){const{wrapper:o}={...(0,t.useMDXComponents)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},8453:(e,o,n)=>{n.r(o),n.d(o,{MDXProvider:()=>c,useMDXComponents:()=>i});var s=n(6540);const t={},r=s.createContext(t);function i(e){const o=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function c(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),s.createElement(r.Provider,{value:o},e.children)}}}]);