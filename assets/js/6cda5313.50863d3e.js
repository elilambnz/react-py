"use strict";(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[640],{9036:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>l,frontMatter:()=>s,metadata:()=>c,toc:()=>a});var o=t(7624),r=t(2172);const s={sidebar_position:4},i="Usage with Next.js",c={id:"introduction/nextjs-usage",title:"Usage with Next.js",description:"react-py is not Server-Side Rendering (SSR) friendly, due to client only APIs such as web workers. To use this package with Next.js, ensure it is loaded on the client side only.",source:"@site/docs/introduction/nextjs-usage.md",sourceDirName:"introduction",slug:"/introduction/nextjs-usage",permalink:"/react-py/docs/introduction/nextjs-usage",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Usage with Vite",permalink:"/react-py/docs/introduction/vite-usage"},next:{title:"Usage with Docusaurus",permalink:"/react-py/docs/introduction/docusaurus-usage"}},d={},a=[{value:"Adding the <code>PythonProvider</code>",id:"adding-the-pythonprovider",level:2},{value:"Using the <code>usePython</code> hook",id:"using-the-usepython-hook",level:2},{value:"Service worker",id:"service-worker",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,r.useMDXComponents)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"usage-with-nextjs",children:"Usage with Next.js"}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"react-py"})," is not Server-Side Rendering (SSR) friendly, due to client only APIs such as web workers. To use this package with ",(0,o.jsx)(n.a,{href:"https://nextjs.org",children:"Next.js"}),", ensure it is loaded on the client side only."]})}),"\n",(0,o.jsxs)(n.p,{children:["You can ensure that a component is loaded on the client side only by using ",(0,o.jsx)(n.a,{href:"https://nextjs.org/docs/getting-started/react-essentials#client-components",children:"Client Components"}),"."]}),"\n",(0,o.jsxs)(n.h2,{id:"adding-the-pythonprovider",children:["Adding the ",(0,o.jsx)(n.code,{children:"PythonProvider"})]}),"\n",(0,o.jsxs)(n.p,{children:["To ensure proper usage of the provider, import it only on the client side. Make sure any hooks using the provider are placed below the provider import. For example, your ",(0,o.jsx)(n.code,{children:"page.tsx"})," file may look like:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"'use client'\n\nimport { PythonProvider } from 'react-py'\n\nimport Codeblock from './components/Codeblock'\n\nexport default function Home() {\n  return (\n    <PythonProvider>\n      <main>\n        <Codeblock />\n      </main>\n    </PythonProvider>\n  )\n}\n"})}),"\n",(0,o.jsxs)(n.h2,{id:"using-the-usepython-hook",children:["Using the ",(0,o.jsx)(n.code,{children:"usePython"})," hook"]}),"\n",(0,o.jsxs)(n.p,{children:["Then simply use hooks in ",(0,o.jsx)(n.code,{children:"components/Codeblock.tsx"})," as follows:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"'use client'\n\nimport { useState } from 'react'\nimport { usePython } from 'react-py'\n\nexport default function Codeblock() {\n  const [input, setInput] = useState('')\n\n  // Use the usePython hook to run code and access both stdout and stderr\n  const { runPython, stdout, stderr, isLoading, isRunning } = usePython()\n\n  return (\n    <>\n      {isLoading ? <p>Loading...</p> : <p>Ready!</p>}\n      <form>\n        <textarea\n          onChange={(e) => setInput(e.target.value)}\n          placeholder=\"Enter your code here\"\n        />\n        <input\n          type=\"submit\"\n          value={!isRunning ? 'Run' : 'Running...'}\n          disabled={isLoading || isRunning}\n          onClick={(e) => {\n            e.preventDefault()\n            runPython(input)\n          }}\n        />\n      </form>\n      <p>Output</p>\n      <pre>\n        <code>{stdout}</code>\n      </pre>\n      <p>Error</p>\n      <pre>\n        <code>{stderr}</code>\n      </pre>\n    </>\n  )\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"service-worker",children:"Service worker"}),"\n",(0,o.jsxs)(n.p,{children:["The service worker that handles ",(0,o.jsx)(n.code,{children:"stdin"})," must be accessible from the root of your site to handle incoming fetch requests. By default, Next.js will place the ",(0,o.jsx)(n.code,{children:"react-py"})," service worker in a subdirectory of your build directory."]}),"\n",(0,o.jsx)(n.p,{children:"To register the service worker, first copy the service worker to your public directory:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"cp node_modules/react-py/dist/workers/service-worker.js public/react-py-sw.js\n"})}),"\n",(0,o.jsx)(n.p,{children:"Then, register the service worker in the entrypoint of your app. Ensure that you register the service worker on the client side only:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"\"use client\";\n\n...\n\nuseEffect(() => {\n  navigator.serviceWorker\n    .register('/react-py-sw.js')\n    .then((registration) =>\n      console.log(\n        'Service Worker registration successful with scope: ',\n        registration.scope\n      )\n    )\n    .catch((err) => console.log('Service Worker registration failed: ', err))\n}, [])\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["You will need to copy the service worker to the root of your build directory if you update ",(0,o.jsx)(n.code,{children:"react-py"})," to a new version."]})})]})}function l(e={}){const{wrapper:n}={...(0,r.useMDXComponents)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},2172:(e,n,t)=>{t.r(n),t.d(n,{MDXProvider:()=>c,useMDXComponents:()=>i});var o=t(1504);const r={},s=o.createContext(r);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);