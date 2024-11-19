"use strict";(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[535],{1116:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var s=n(4848),i=n(8453),a=n(6094);const r={sidebar_position:2},o="REPL",l={id:"examples/repl",title:"REPL",description:"This is an example of using the usePythonConsole hook to render an interactive console.",source:"@site/docs/examples/repl.mdx",sourceDirName:"examples",slug:"/examples/repl",permalink:"/react-py/docs/examples/repl",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Basic Example",permalink:"/react-py/docs/examples/basic-example"},next:{title:"Interrupting Execution",permalink:"/react-py/docs/examples/interrupting-execution"}},c={},d=[];function u(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",p:"p",...(0,i.useMDXComponents)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"repl",children:"REPL"}),"\n",(0,s.jsxs)(t.p,{children:["This is an example of using the ",(0,s.jsx)(t.code,{children:"usePythonConsole"})," hook to render an interactive console."]}),"\n",(0,s.jsx)(t.admonition,{type:"caution",children:(0,s.jsx)(t.p,{children:"At this time, interrupting execution waits until the lastest command has finished running. This prevents runaway processes from being cancelled."})}),"\n",(0,s.jsx)(a.default,{}),"\n",(0,s.jsxs)(t.p,{children:["You can find the source code for this example ",(0,s.jsx)(t.a,{href:"https://github.com/elilambnz/react-py/blob/main/website/src/components/Console.tsx",children:"here"}),"."]})]})}function m(e={}){const{wrapper:t}={...(0,i.useMDXComponents)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},6094:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var s=n(6540),i=n(5636),a=n(4606),r=n(2506),o=n(6897);const l=s.forwardRef((function({title:e,titleId:t,...n},i){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":t},n),e?s.createElement("title",{id:t},e):null,s.createElement("path",{fillRule:"evenodd",d:"M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z",clipRule:"evenodd"}))}));var c=n(4222),d=n(53),u=n(4848);const m=">>> ",p="... ";function h(){const[e,t]=(0,s.useState)(""),[n,h]=(0,s.useState)([]),[x,f]=(0,s.useState)([]),[v,g]=(0,s.useState)(0),{runPython:b,stdout:w,stderr:j,banner:y,consoleState:C,isLoading:N,isRunning:k,interruptExecution:E,isAwaitingInput:z,sendInput:M,prompt:A}=(0,i.usePythonConsole)(),R=(0,s.useRef)();function P(){return z?A||m:C===a.ConsoleState.incomplete?p:m}function S(){h([])}return(0,s.useEffect)((()=>{y&&h((e=>[...e,{text:y+"\n"}]))}),[y]),(0,s.useEffect)((()=>{w&&h((e=>[...e,{text:w}]))}),[w]),(0,s.useEffect)((()=>{j&&h((e=>[...e,{text:j+"\n",className:"text-red-500"}]))}),[j]),(0,s.useEffect)((()=>{N&&R.current?.blur()}),[N]),(0,s.useEffect)((()=>{z&&(t(""),h((e=>e.slice(0,-1))))}),[z]),(0,u.jsxs)("div",{className:"relative mb-10",children:[(0,u.jsx)("div",{className:"absolute right-0 z-20",children:(0,u.jsx)(r.default,{items:[{label:"Clear",icon:l,onClick:S,disabled:k},{label:"Reset",icon:c.default,onClick:function(){E(),S()}}]})}),N&&(0,u.jsx)(o.default,{}),(0,u.jsxs)("pre",{className:"z-10 max-h-[calc(100vh_-_20rem)] min-h-[18rem] text-left text-base shadow-md",children:[n.map(((e,t)=>(0,u.jsx)("code",{className:e.className,children:e.text},t))),(0,u.jsxs)("div",{className:"group relative flex items-center",children:[(0,u.jsx)("code",{className:"text-zinc-500",children:P()}),(0,u.jsx)("span",{className:"text-zinc-500 group-focus-within:hidden",children:"|"}),(0,u.jsx)("textarea",{ref:R,className:(0,d.default)("w-full resize-none rounded-md border-none bg-transparent py-2 pl-1 pr-2 !outline-none !ring-0",N&&"pointer-events-none"),style:{height:e?1.5*e.split("\n").length+1+"rem":"2.5rem",fontFamily:"unset"},value:e,onChange:e=>{const n=e.target.value;f((e=>[n,...e.slice(1)])),t(n)},onKeyDown:n=>{const s=n.target.selectionStart,i=n.target.selectionEnd;switch(n.key){case"Enter":n.preventDefault(),!n.shiftKey&&async function(){e&&(g(0),f((t=>[e,...t])),z?(h((t=>[...t,{text:P()+" "+e}])),M(e)):(h((t=>[...t,{text:P()+e+"\n"}])),await b(e)),t(""),R.current?.focus())}();break;case"ArrowUp":0===s&&0===i&&(t(x[v]),g((e=>Math.min(x.length-1,e+1))));break;case"ArrowDown":e&&s===e.length&&i===e.length&&(t(x[v]),g((e=>Math.max(0,e-1))))}},autoCapitalize:"off",spellCheck:"false"})]})]})]})}},2506:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});n(6540);var s=n(53),i=n(4848);function a(e){const{items:t,isAwaitingInput:n}=e,a=t.filter((e=>!e.hidden));return(0,i.jsx)("div",{className:"pointer-events-none z-10 -mb-16 flex justify-end p-2",children:(0,i.jsxs)("div",{className:"pointer-events-auto space-x-2 rounded-md bg-white p-1 opacity-80 shadow-md hover:opacity-100",children:[n&&(0,i.jsxs)("div",{className:"inline-flex items-center rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow",children:[(0,i.jsxs)("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,i.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,i.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),(0,i.jsx)("span",{children:"Awaiting input..."})]}),(0,i.jsx)("span",{className:"isolate inline-flex rounded-md",children:a.map(((e,t)=>(0,i.jsxs)("button",{type:"button",onClick:e.onClick,disabled:e.disabled,className:(0,s.default)("relative inline-flex items-center border border-none border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 focus:z-10 focus:outline-none focus:ring-0",e.disabled?"opacity-50 hover:cursor-not-allowed":"opacity-75 hover:cursor-pointer hover:bg-zinc-50 hover:opacity-100",0===t&&"rounded-l-md",t===a.length-1&&"rounded-r-md"),children:[(0,i.jsx)(e.icon,{className:"-ml-1 mr-2 h-5 w-5 text-zinc-400","aria-hidden":"true"}),e.label]},e.label)))})]})})}},6897:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});n(6540);var s=n(4848);function i(){return(0,s.jsx)("div",{className:"pointer-events-none absolute bottom-0 right-0 z-10 flex justify-end p-2",children:(0,s.jsxs)("div",{className:"inline-flex items-center rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow",children:[(0,s.jsxs)("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Setting up environment..."]})})}},4222:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var s=n(6540);const i=s.forwardRef((function({title:e,titleId:t,...n},i){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":t},n),e?s.createElement("title",{id:t},e):null,s.createElement("path",{fillRule:"evenodd",d:"M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z",clipRule:"evenodd"}))}))},8453:(e,t,n)=>{n.r(t),n.d(t,{MDXProvider:()=>o,useMDXComponents:()=>r});var s=n(6540);const i={},a=s.createContext(i);function r(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);