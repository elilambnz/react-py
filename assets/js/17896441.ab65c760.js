"use strict";(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[918],{9167:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var r=n(7294),a=n(1262),l=n(2949),o=n(3598),i=n(9587),s=n(5096),c=n(3620);function m(e){const{prompt:t,onSubmit:n}=e,[a,l]=(0,r.useState)(""),o=(0,r.useRef)();return(0,r.useEffect)((()=>{o.current&&o.current.focus()}),[o.current]),r.createElement("div",{className:"mt-4 lg:w-1/2"},r.createElement("label",{htmlFor:"input",className:"block text-sm font-medium text-gray-700 dark:text-gray-100"},"Input"),r.createElement("div",{className:"mt-1 flex rounded-md shadow-sm"},r.createElement("div",{className:"relative flex flex-grow items-stretch focus-within:z-10"},r.createElement("input",{ref:o,type:"text",name:"input",id:"input",className:"block w-full rounded-l-md border-none bg-neutral-200 px-2 py-1.5 placeholder-gray-400 shadow-sm focus:ring-0 dark:bg-neutral-600 sm:text-sm",placeholder:t,onChange:e=>l(e.target.value),onKeyDown:e=>"Enter"===e.key&&n(a)})),r.createElement("button",{type:"button",className:"relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-none border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-gray-100 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500",onClick:()=>n(a)},r.createElement(c,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"}),r.createElement("span",null,"Submit"))))}var d=n(1451),u=n(6533),p=n(4967);const f={enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,highlightActiveLine:!1,showPrintMargin:!1},h=e=>{e.renderer.setScrollMargin(10,10,0,0),e.moveCursorTo(0,0)};function g(e){const{code:t,packages:c}=e,[g,y]=(0,r.useState)(t.trimEnd()),[b,x]=(0,r.useState)(!1);(0,r.useEffect)((()=>{y(t.trimEnd()),x(!1)}),[t]);const{colorMode:E}=(0,l.useColorMode)(),{runPython:v,stdout:w,stderr:k,isLoading:N,isRunning:C,interruptExecution:A,isAwaitingInput:S,sendInput:z,prompt:L}=(0,o.usePython)({packages:c});return r.createElement("div",{className:"relative mb-10 flex flex-col"},r.createElement(i.default,{items:[{label:"Run",icon:d,onClick:function(){v(g),x(!0)},disabled:N||C,hidden:C},{label:"Stop",icon:u,onClick:function(){A(),x(!1)},hidden:!C},{label:"Reset",icon:p,onClick:function(){x(!1),y(t.trimEnd())},disabled:C}],isAwaitingInput:S}),N&&r.createElement(s.default,null),r.createElement(a.default,{fallback:r.createElement("div",null,"Loading...")},(()=>{const e=n(4981).default;return n(4007),n(2777),n(3783),n(2679),r.createElement(e,{value:g,mode:"python",name:"CodeBlock",fontSize:"0.9rem",className:"min-h-[7rem] overflow-clip rounded shadow-md",theme:"dark"===E?"idle_fingers":"textmate",onChange:e=>y(e),width:"100%",maxLines:1/0,onLoad:h,editorProps:{$blockScrolling:!0},setOptions:f})})),S&&r.createElement(m,{prompt:L,onSubmit:z}),b&&r.createElement("pre",{className:"mt-4 text-left"},r.createElement("code",null,w),r.createElement("code",{className:"text-red-500"},k)))}},9587:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var r=n(7294),a=n(6010);function l(e){const{items:t,isAwaitingInput:n}=e,l=t.filter((e=>!e.hidden));return r.createElement("div",{className:"pointer-events-none z-10 -mb-16 flex justify-end p-2"},r.createElement("div",{className:"pointer-events-auto space-x-2 rounded-md bg-white p-1 opacity-80 shadow-md hover:opacity-100"},n&&r.createElement("div",{className:"inline-flex items-center rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow"},r.createElement("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},r.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),r.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})),r.createElement("span",null,"Awaiting input...")),r.createElement("span",{className:"isolate inline-flex rounded-md"},l.map(((e,t)=>r.createElement("button",{key:e.label,type:"button",onClick:e.onClick,disabled:e.disabled,className:(0,a.default)("relative inline-flex items-center border border-none border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-0",e.disabled?"opacity-50 hover:cursor-not-allowed":"opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100",0===t&&"rounded-l-md",t===l.length-1&&"rounded-r-md")},r.createElement(e.icon,{className:"-ml-1 mr-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),e.label))))))}},5096:(e,t,n)=>{n.r(t),n.d(t,{default:()=>a});var r=n(7294);function a(){return r.createElement("div",{className:"pointer-events-none absolute bottom-0 right-0 z-10 flex justify-end p-2"},r.createElement("div",{className:"inline-flex items-center rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow"},r.createElement("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},r.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),r.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})),"Setting up environment..."))}},8573:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});var r=n(7462),a=n(7294),l=n(2389),o=n(1170),i=n(4956),s=n(9167);function c(e){let{children:t,...n}=e;const c=(0,l.default)(),m=function(e){return a.Children.toArray(e).some((e=>(0,a.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t);if("language-python"===n.className)return a.createElement(s.default,{code:m});{const e="string"==typeof m?i.default:o.default;return a.createElement(e,(0,r.default)({key:String(c)},n),m)}}}}]);