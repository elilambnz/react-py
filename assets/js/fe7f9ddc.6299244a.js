"use strict";(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[743],{3905:(e,n,t)=>{t.r(n),t.d(n,{MDXContext:()=>m,MDXProvider:()=>s,mdx:()=>g,useMDXComponents:()=>u,withMDXComponents:()=>p});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(){return l=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},l.apply(this,arguments)}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var m=a.createContext({}),p=function(e){return function(n){var t=u(n.components);return a.createElement(e,l({},n,{components:t}))}},u=function(e){var n=a.useContext(m),t=n;return e&&(t="function"==typeof e?e(n):d(d({},n),e)),t},s=function(e){var n=u(e.components);return a.createElement(m.Provider,{value:n},e.children)},c="mdxType",x={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},h=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=u(t),s=r,c=p["".concat(i,".").concat(s)]||p[s]||x[s]||l;return t?a.createElement(c,d(d({ref:n},m),{},{components:t})):a.createElement(c,d({ref:n},m))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=h;var d={};for(var o in n)hasOwnProperty.call(n,o)&&(d[o]=n[o]);d.originalType=e,d[c]="string"==typeof e?e:r,i[1]=d;for(var m=2;m<l;m++)i[m]=t[m];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},6432:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>m});var a=t(7462),r=(t(7294),t(3905));const l={sidebar_position:3},i="API Reference",d={unversionedId:"introduction/api-reference",id:"introduction/api-reference",title:"API Reference",description:"``",source:"@site/docs/introduction/api-reference.md",sourceDirName:"introduction",slug:"/introduction/api-reference",permalink:"/react-py/docs/introduction/api-reference",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Usage",permalink:"/react-py/docs/introduction/usage"},next:{title:"Usage with Next.js",permalink:"/react-py/docs/introduction/nextjs-usage"}},o={},m=[{value:"<code>&lt;PythonProvider&gt;</code>",id:"pythonprovider",level:2},{value:"<code>usePython</code> and <code>usePythonConsole</code> hooks",id:"usepython-and-usepythonconsole-hooks",level:2},{value:"runPython",id:"runpython",level:3},{value:"stdout",id:"stdout",level:3},{value:"stderr",id:"stderr",level:3},{value:"isLoading",id:"isloading",level:3},{value:"isReady",id:"isready",level:3},{value:"isRunning",id:"isrunning",level:3},{value:"interruptExecution",id:"interruptexecution",level:3},{value:"readFile",id:"readfile",level:3},{value:"writeFile",id:"writefile",level:3},{value:"mkdir",id:"mkdir",level:3},{value:"rmdir",id:"rmdir",level:3},{value:"watchModules",id:"watchmodules",level:3},{value:"unwatchModules",id:"unwatchmodules",level:3},{value:"<code>usePythonConsole</code> hook",id:"usepythonconsole-hook",level:2},{value:"banner",id:"banner",level:3},{value:"consoleState",id:"consolestate",level:3},{value:"Types",id:"types",level:2},{value:"Packages",id:"packages",level:3},{value:"official",id:"official",level:4},{value:"micropip",id:"micropip",level:4},{value:"ConsoleState",id:"consolestate-1",level:3}],p={toc:m};function u(e){let{components:n,...t}=e;return(0,r.mdx)("wrapper",(0,a.default)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"api-reference"},"API Reference"),(0,r.mdx)("h2",{id:"pythonprovider"},(0,r.mdx)("inlineCode",{parentName:"h2"},"<PythonProvider>")),(0,r.mdx)("p",null,"Props which can be provided to the ",(0,r.mdx)("inlineCode",{parentName:"p"},"PythonProvider")," component."),(0,r.mdx)("table",null,(0,r.mdx)("thead",{parentName:"table"},(0,r.mdx)("tr",{parentName:"thead"},(0,r.mdx)("th",{parentName:"tr",align:null},"Prop"),(0,r.mdx)("th",{parentName:"tr",align:null},"Required"),(0,r.mdx)("th",{parentName:"tr",align:null},"Type"),(0,r.mdx)("th",{parentName:"tr",align:null},"Default"),(0,r.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,r.mdx)("tbody",{parentName:"table"},(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},"packages"),(0,r.mdx)("td",{parentName:"tr",align:null},"No"),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("a",{parentName:"td",href:"#packages"},(0,r.mdx)("inlineCode",{parentName:"a"},"Packages"))),(0,r.mdx)("td",{parentName:"tr",align:null},"undefined"),(0,r.mdx)("td",{parentName:"tr",align:null},"Packages to be loaded globally for usage by all instances.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},"timeout"),(0,r.mdx)("td",{parentName:"tr",align:null},"No"),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"number")),(0,r.mdx)("td",{parentName:"tr",align:null},"0"),(0,r.mdx)("td",{parentName:"tr",align:null},"Time in ms until a running instance is terminated, 0 means there is no time limit.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},"lazy"),(0,r.mdx)("td",{parentName:"tr",align:null},"No"),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"boolean")),(0,r.mdx)("td",{parentName:"tr",align:null},"false"),(0,r.mdx)("td",{parentName:"tr",align:null},"If true, prevents the web worker from spawning until ",(0,r.mdx)("inlineCode",{parentName:"td"},"runPython")," is called for the first time.")),(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},"terminateOnCompletion"),(0,r.mdx)("td",{parentName:"tr",align:null},"No"),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("inlineCode",{parentName:"td"},"boolean")),(0,r.mdx)("td",{parentName:"tr",align:null},"false"),(0,r.mdx)("td",{parentName:"tr",align:null},"If true, the web worker will terminate on completion.")))),(0,r.mdx)("h2",{id:"usepython-and-usepythonconsole-hooks"},(0,r.mdx)("inlineCode",{parentName:"h2"},"usePython")," and ",(0,r.mdx)("inlineCode",{parentName:"h2"},"usePythonConsole")," hooks"),(0,r.mdx)("p",null,"Props which can be provided to the ",(0,r.mdx)("inlineCode",{parentName:"p"},"usePython")," and ",(0,r.mdx)("inlineCode",{parentName:"p"},"usePythonConsole")," hooks."),(0,r.mdx)("table",null,(0,r.mdx)("thead",{parentName:"table"},(0,r.mdx)("tr",{parentName:"thead"},(0,r.mdx)("th",{parentName:"tr",align:null},"Prop"),(0,r.mdx)("th",{parentName:"tr",align:null},"Required"),(0,r.mdx)("th",{parentName:"tr",align:null},"Type"),(0,r.mdx)("th",{parentName:"tr",align:null},"Default"),(0,r.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,r.mdx)("tbody",{parentName:"table"},(0,r.mdx)("tr",{parentName:"tbody"},(0,r.mdx)("td",{parentName:"tr",align:null},"packages"),(0,r.mdx)("td",{parentName:"tr",align:null},"No"),(0,r.mdx)("td",{parentName:"tr",align:null},(0,r.mdx)("a",{parentName:"td",href:"#packages"},(0,r.mdx)("inlineCode",{parentName:"a"},"Packages"))),(0,r.mdx)("td",{parentName:"tr",align:null},"undefined"),(0,r.mdx)("td",{parentName:"tr",align:null},"Packages to be loaded for usage by this instance.")))),(0,r.mdx)("h3",{id:"runpython"},"runPython"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"async (code: string) => void")),(0,r.mdx)("p",null,"Takes a string of Python code. Example:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-tsx"},'runPython(`pi = 3.141\nprint(f"Pi to two decimal places is: {pi:.2f}")`)\n// expected output: "Pi to two decimal places is: 3.14"\n')),(0,r.mdx)("h3",{id:"stdout"},"stdout"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"string")),(0,r.mdx)("p",null,"Python stdout."),(0,r.mdx)("h3",{id:"stderr"},"stderr"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"string")),(0,r.mdx)("p",null,"Python stderr."),(0,r.mdx)("h3",{id:"isloading"},"isLoading"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,r.mdx)("p",null,"True if the worker is still being initialised. False if loaded."),(0,r.mdx)("h3",{id:"isready"},"isReady"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,r.mdx)("p",null,"True if instance is ready to run Python code. False otherwise."),(0,r.mdx)("h3",{id:"isrunning"},"isRunning"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"boolean")),(0,r.mdx)("p",null,"True if code is being executed. False if idle."),(0,r.mdx)("h3",{id:"interruptexecution"},"interruptExecution"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"() => void")),(0,r.mdx)("p",null,"Can be called to immediately interrupt ongoing execution. Will terminate the running worker and spawn a new one."),(0,r.mdx)("h3",{id:"readfile"},"readFile"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"(name: string) => void")),(0,r.mdx)("p",null,"Exposes ",(0,r.mdx)("inlineCode",{parentName:"p"},"pyodide.FS.readFile"),", encoding is ",(0,r.mdx)("inlineCode",{parentName:"p"},"utf8"),"."),(0,r.mdx)("h3",{id:"writefile"},"writeFile"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"(name: string, data: string) => void")),(0,r.mdx)("p",null,"Exposes ",(0,r.mdx)("inlineCode",{parentName:"p"},"pyodide.FS.writeFile"),", encoding is ",(0,r.mdx)("inlineCode",{parentName:"p"},"utf8"),"."),(0,r.mdx)("h3",{id:"mkdir"},"mkdir"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"(name: string) => void")),(0,r.mdx)("p",null,"Exposes ",(0,r.mdx)("inlineCode",{parentName:"p"},"pyodide.FS.mkdir"),"."),(0,r.mdx)("h3",{id:"rmdir"},"rmdir"),(0,r.mdx)("p",null,"Exposes ",(0,r.mdx)("inlineCode",{parentName:"p"},"pyodide.FS.rmdir"),"."),(0,r.mdx)("h3",{id:"watchmodules"},"watchModules"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"(modules: string[]) => void")),(0,r.mdx)("p",null,"Adds modules to be reloaded before code is run."),(0,r.mdx)("h3",{id:"unwatchmodules"},"unwatchModules"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"(modules: string[]) => void")),(0,r.mdx)("p",null,"Removes modules to be reloaded before code is run."),(0,r.mdx)("h2",{id:"usepythonconsole-hook"},(0,r.mdx)("inlineCode",{parentName:"h2"},"usePythonConsole")," hook"),(0,r.mdx)("h3",{id:"banner"},"banner"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"string")),(0,r.mdx)("p",null,"Python banner."),(0,r.mdx)("h3",{id:"consolestate"},"consoleState"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"ConsoleState | undefined")),(0,r.mdx)("p",null,"Current state of console."),(0,r.mdx)("h2",{id:"types"},"Types"),(0,r.mdx)("h3",{id:"packages"},"Packages"),(0,r.mdx)("p",null,"Example:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},"{\n  official: ['asciitree'],\n  micropip: ['python-cowsay'],\n}\n")),(0,r.mdx)("h4",{id:"official"},"official"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"string[]")," (optional) - Pyodide official packages"),(0,r.mdx)("h4",{id:"micropip"},"micropip"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"string[]")," (optional) - Packages imported using micropip"),(0,r.mdx)("h3",{id:"consolestate-1"},"ConsoleState"),(0,r.mdx)("p",null,"Enum representing console state."),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"'complete' | 'incomplete' | 'syntax-error'")))}u.isMDXComponent=!0}}]);