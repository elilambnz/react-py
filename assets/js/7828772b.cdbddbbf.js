(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[70],{5003:(e,n,t)=>{"use strict";t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>x,exampleCode:()=>d,exampleDeleteCode:()=>f,exampleGetCode:()=>u,examplePostCode:()=>p,examplePutCode:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>g});var r=t(4848),s=t(8453),a=t(140);const i={sidebar_position:7},o="Making API Calls",c={id:"examples/making-api-calls",title:"Making API Calls",description:"Due to sockets being unavailable in Pyodide, http libraries are currently unsupported out of the box.",source:"@site/docs/examples/making-api-calls.mdx",sourceDirName:"examples",slug:"/examples/making-api-calls",permalink:"/react-py/docs/examples/making-api-calls",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Custom Modules",permalink:"/react-py/docs/examples/custom-modules"},next:{title:"User Input",permalink:"/react-py/docs/examples/user-input"}},l={},d="import requests\nresponse = requests.get('https://api.github.com/repos/elilambnz/react-py')\ndata = response.json()\n\nprint(\"*\" * 50)\nprint(f\"Repository: {data['full_name']}\")\nprint(f\"Owner: {data['owner']['login']}\")\nprint(f\"Number of stars: {data['stargazers_count']} \u2b50\ufe0f\")\nprint(f\"Number of forks: {data['forks_count']} \ud83c\udf74\")\nprint(f\"Number of watchers: {data['watchers_count']} \ud83d\udc40\")\nprint(\"*\" * 50)\n",u="import requests\nresponse = requests.get('https://reqres.in/api/users/2')\ndata = response.json()\n\nprint(data)\n",p='import requests\nresponse = requests.post(\'https://reqres.in/api/users\', { "name": "morpheus", "job": "leader" })\ndata = response.json()\n\nprint(data)\n',m='import requests\nresponse = requests.put(\'https://reqres.in/api/users/2\', { "name": "morpheus", "job": "zion resident" })\ndata = response.json()\n\nprint(data)\n',f="import requests\nresponse = requests.delete('https://reqres.in/api/users/2')\n\nif response.status_code == 204:\n  print ('Success')\n",g=[{value:"<code>GET</code>",id:"get",level:2},{value:"<code>POST</code>",id:"post",level:2},{value:"<code>PUT</code>",id:"put",level:2},{value:"<code>DELETE</code>",id:"delete",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,s.useMDXComponents)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"making-api-calls",children:"Making API Calls"}),"\n",(0,r.jsxs)(n.p,{children:["Due to sockets being unavailable in Pyodide, http libraries are ",(0,r.jsx)(n.a,{href:"https://pyodide.org/en/stable/project/roadmap.html#write-http-client-in-terms-of-web-apis",children:"currently unsupported"})," out of the box."]}),"\n",(0,r.jsxs)(n.p,{children:["A patch for ",(0,r.jsx)(n.code,{children:"requests"})," and ",(0,r.jsx)(n.code,{children:"urllib"})," has been provided by the package ",(0,r.jsx)(n.a,{href:"https://github.com/koenvo/pyodide-http",children:"Pyodide-HTTP"})," and is preinstalled in ",(0,r.jsx)(n.code,{children:"react-py"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["See ",(0,r.jsx)(n.a,{href:"using-packages",children:"Using Packages"})," for package installation instructions, for these examples the following ",(0,r.jsx)(n.code,{children:"Packages"})," object has be used:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"{\n  micropip: ['requests']\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"Try it out:"}),"\n","\n",(0,r.jsx)(a.default,{code:d,packages:{micropip:["requests"]}}),"\n",(0,r.jsx)(n.h2,{id:"get",children:(0,r.jsx)(n.code,{children:"GET"})}),"\n","\n",(0,r.jsx)(a.default,{code:u,packages:{micropip:["requests"]}}),"\n",(0,r.jsx)(n.h2,{id:"post",children:(0,r.jsx)(n.code,{children:"POST"})}),"\n","\n",(0,r.jsx)(a.default,{code:p,packages:{micropip:["requests"]}}),"\n",(0,r.jsx)(n.h2,{id:"put",children:(0,r.jsx)(n.code,{children:"PUT"})}),"\n","\n",(0,r.jsx)(a.default,{code:m,packages:{micropip:["requests"]}}),"\n",(0,r.jsx)(n.h2,{id:"delete",children:(0,r.jsx)(n.code,{children:"DELETE"})}),"\n","\n",(0,r.jsx)(a.default,{code:f,packages:{micropip:["requests"]}})]})}function x(e={}){const{wrapper:n}={...(0,s.useMDXComponents)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},4048:(e,n,t)=>{e=t.nmd(e),ace.define("ace/theme/idle_fingers-css",["require","exports","module"],(function(e,n,t){t.exports=".ace-idle-fingers .ace_gutter {\n  background: #3b3b3b;\n  color: rgb(153,153,153)\n}\n\n.ace-idle-fingers .ace_print-margin {\n  width: 1px;\n  background: #3b3b3b\n}\n\n.ace-idle-fingers {\n  background-color: #323232;\n  color: #FFFFFF\n}\n\n.ace-idle-fingers .ace_cursor {\n  color: #91FF00\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_selection {\n  background: rgba(90, 100, 126, 0.88)\n}\n\n.ace-idle-fingers.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px #323232;\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_step {\n  background: rgb(102, 82, 0)\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid #404040\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_active-line {\n  background: #353637\n}\n\n.ace-idle-fingers .ace_gutter-active-line {\n  background-color: #353637\n}\n\n.ace-idle-fingers .ace_marker-layer .ace_selected-word {\n  border: 1px solid rgba(90, 100, 126, 0.88)\n}\n\n.ace-idle-fingers .ace_invisible {\n  color: #404040\n}\n\n.ace-idle-fingers .ace_keyword,\n.ace-idle-fingers .ace_meta {\n  color: #CC7833\n}\n\n.ace-idle-fingers .ace_constant,\n.ace-idle-fingers .ace_constant.ace_character,\n.ace-idle-fingers .ace_constant.ace_character.ace_escape,\n.ace-idle-fingers .ace_constant.ace_other,\n.ace-idle-fingers .ace_support.ace_constant {\n  color: #6C99BB\n}\n\n.ace-idle-fingers .ace_invalid {\n  color: #FFFFFF;\n  background-color: #FF0000\n}\n\n.ace-idle-fingers .ace_fold {\n  background-color: #CC7833;\n  border-color: #FFFFFF\n}\n\n.ace-idle-fingers .ace_support.ace_function {\n  color: #B83426\n}\n\n.ace-idle-fingers .ace_variable.ace_parameter {\n  font-style: italic\n}\n\n.ace-idle-fingers .ace_string {\n  color: #A5C261\n}\n\n.ace-idle-fingers .ace_string.ace_regexp {\n  color: #CCCC33\n}\n\n.ace-idle-fingers .ace_comment {\n  font-style: italic;\n  color: #BC9458\n}\n\n.ace-idle-fingers .ace_meta.ace_tag {\n  color: #FFE5BB\n}\n\n.ace-idle-fingers .ace_entity.ace_name {\n  color: #FFC66D\n}\n\n.ace-idle-fingers .ace_collab.ace_user1 {\n  color: #323232;\n  background-color: #FFF980\n}\n\n.ace-idle-fingers .ace_indent-guide {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWMwMjLyZYiPj/8PAAreAwAI1+g0AAAAAElFTkSuQmCC) right repeat-y\n}\n\n.ace-idle-fingers .ace_indent-guide-active {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;\n}\n"})),ace.define("ace/theme/idle_fingers",["require","exports","module","ace/theme/idle_fingers-css","ace/lib/dom"],(function(e,n,t){n.isDark=!0,n.cssClass="ace-idle-fingers",n.cssText=e("./idle_fingers-css"),e("../lib/dom").importCssString(n.cssText,n.cssClass,!1)})),ace.require(["ace/theme/idle_fingers"],(function(n){e&&(e.exports=n)}))},140:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>x});var r=t(6540),s=t(8478),a=t(5293),i=t(5636),o=t(2506),c=t(6897),l=t(5100),d=t(4848);function u(e){const{prompt:n,onSubmit:t}=e,[s,a]=(0,r.useState)(""),i=(0,r.useRef)();return(0,r.useEffect)((()=>{i.current&&i.current.focus()}),[i.current]),(0,d.jsxs)("div",{className:"mt-4 lg:w-1/2",children:[(0,d.jsx)("label",{htmlFor:"input",className:"block text-sm font-medium text-zinc-700 dark:text-zinc-100",children:"Input"}),(0,d.jsxs)("div",{className:"mt-1 flex rounded-md shadow-sm",children:[(0,d.jsx)("div",{className:"relative flex flex-grow items-stretch focus-within:z-10",children:(0,d.jsx)("input",{ref:i,type:"text",name:"input",id:"input",className:"block w-full rounded-l-md border-none bg-neutral-200 px-2 py-1.5 placeholder-zinc-400 shadow-sm focus:ring-0 dark:bg-neutral-600 sm:text-sm",placeholder:n,onChange:e=>a(e.target.value),onKeyDown:e=>"Enter"===e.key&&t(s)})}),(0,d.jsxs)("button",{type:"button",className:"relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-none border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 hover:cursor-pointer hover:bg-zinc-100 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500",onClick:()=>t(s),children:[(0,d.jsx)(l.default,{className:"h-5 w-5 text-zinc-400","aria-hidden":"true"}),(0,d.jsx)("span",{children:"Submit"})]})]})]})}var p=t(4762),m=t(8608),f=t(4222);const g={enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,highlightActiveLine:!1,showPrintMargin:!1},h=e=>{e.renderer.setScrollMargin(10,10,0,0),e.moveCursorTo(0,0)};function x(e){const{code:n,packages:l}=e,[x,b]=(0,r.useState)(n.trimEnd()),[v,w]=(0,r.useState)(!1);(0,r.useEffect)((()=>{b(n.trimEnd()),w(!1)}),[n]);const{colorMode:j}=(0,a.useColorMode)(),{runPython:k,stdout:A,stderr:_,isLoading:C,isRunning:y,interruptExecution:E,isAwaitingInput:F,sendInput:N,prompt:z}=(0,i.usePython)({packages:l});return(0,d.jsxs)("div",{className:"relative mb-10 flex flex-col",children:[(0,d.jsx)(o.default,{items:[{label:"Run",icon:p.default,onClick:function(){k(x),w(!0)},disabled:C||y,hidden:y},{label:"Stop",icon:m.default,onClick:function(){E(),w(!1)},hidden:!y},{label:"Reset",icon:f.default,onClick:function(){w(!1),b(n.trimEnd())},disabled:y}],isAwaitingInput:F}),C&&(0,d.jsx)(c.default,{}),(0,d.jsx)(s.default,{fallback:(0,d.jsx)("div",{children:"Loading..."}),children:()=>{const e=t(470).default;return t(975),t(9073),t(4048),t(47),(0,d.jsx)(e,{value:x,mode:"python",name:"CodeBlock",fontSize:"0.9rem",className:"min-h-[7rem] overflow-clip rounded shadow-md",theme:"dark"===j?"idle_fingers":"textmate",onChange:e=>b(e),width:"100%",maxLines:1/0,onLoad:h,editorProps:{$blockScrolling:!0},setOptions:g})}}),F&&(0,d.jsx)(u,{prompt:z,onSubmit:N}),v&&(0,d.jsxs)("pre",{className:"mt-4 text-left",children:[(0,d.jsx)("code",{children:A}),(0,d.jsx)("code",{className:"text-red-500",children:_})]})]})}},2506:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>a});t(6540);var r=t(53),s=t(4848);function a(e){const{items:n,isAwaitingInput:t}=e,a=n.filter((e=>!e.hidden));return(0,s.jsx)("div",{className:"pointer-events-none z-10 -mb-16 flex justify-end p-2",children:(0,s.jsxs)("div",{className:"pointer-events-auto space-x-2 rounded-md bg-white p-1 opacity-80 shadow-md hover:opacity-100",children:[t&&(0,s.jsxs)("div",{className:"inline-flex items-center rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow",children:[(0,s.jsxs)("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),(0,s.jsx)("span",{children:"Awaiting input..."})]}),(0,s.jsx)("span",{className:"isolate inline-flex rounded-md",children:a.map(((e,n)=>(0,s.jsxs)("button",{type:"button",onClick:e.onClick,disabled:e.disabled,className:(0,r.default)("relative inline-flex items-center border border-none border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 focus:z-10 focus:outline-none focus:ring-0",e.disabled?"opacity-50 hover:cursor-not-allowed":"opacity-75 hover:cursor-pointer hover:bg-zinc-50 hover:opacity-100",0===n&&"rounded-l-md",n===a.length-1&&"rounded-r-md"),children:[(0,s.jsx)(e.icon,{className:"-ml-1 mr-2 h-5 w-5 text-zinc-400","aria-hidden":"true"}),e.label]},e.label)))})]})})}},6897:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>s});t(6540);var r=t(4848);function s(){return(0,r.jsx)("div",{className:"pointer-events-none absolute bottom-0 right-0 z-10 flex justify-end p-2",children:(0,r.jsxs)("div",{className:"inline-flex items-center rounded-md bg-lime-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow",children:[(0,r.jsxs)("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,r.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,r.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Setting up environment..."]})})}},5100:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>s});var r=t(6540);const s=r.forwardRef((function({title:e,titleId:n,...t},s){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":n},t),e?r.createElement("title",{id:n},e):null,r.createElement("path",{d:"M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z"}))}))},4222:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>s});var r=t(6540);const s=r.forwardRef((function({title:e,titleId:n,...t},s){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":n},t),e?r.createElement("title",{id:n},e):null,r.createElement("path",{fillRule:"evenodd",d:"M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z",clipRule:"evenodd"}))}))},4762:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>s});var r=t(6540);const s=r.forwardRef((function({title:e,titleId:n,...t},s){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":n},t),e?r.createElement("title",{id:n},e):null,r.createElement("path",{fillRule:"evenodd",d:"M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z",clipRule:"evenodd"}))}))},8608:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>s});var r=t(6540);const s=r.forwardRef((function({title:e,titleId:n,...t},s){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":n},t),e?r.createElement("title",{id:n},e):null,r.createElement("path",{fillRule:"evenodd",d:"M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z",clipRule:"evenodd"}))}))},8453:(e,n,t)=>{"use strict";t.r(n),t.d(n,{MDXProvider:()=>o,useMDXComponents:()=>i});var r=t(6540);const s={},a=r.createContext(s);function i(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);