"use strict";(self.webpackChunkreact_py_docs=self.webpackChunkreact_py_docs||[]).push([[256],{7256:(e,t,n)=>{n.r(t),n.d(t,{Tab:()=>pe});var r=n(1504),a=n.t(r,2),l=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(l||{}),o=Object.defineProperty,u=(e,t,n)=>(((e,t,n)=>{t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n})(e,"symbol"!=typeof t?t+"":t,n),n);let s=new class{constructor(){u(this,"current",this.detect()),u(this,"handoffState","pending"),u(this,"currentId",0)}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"undefined"==typeof window||"undefined"==typeof document?"server":"client"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}},i=(e,t)=>{s.isServer?(0,r.useEffect)(e,t):(0,r.useLayoutEffect)(e,t)};function c(e){let t=(0,r.useRef)(e);return i((()=>{t.current=e}),[e]),t}let d=function(e){let t=c(e);return r.useCallback(((...e)=>t.current(...e)),[t])};function f(){let e=function(){let e="undefined"==typeof document;return(e=>e.useSyncExternalStore)(a)((()=>()=>{}),(()=>!1),(()=>!e))}(),[t,n]=r.useState(s.isHandoffComplete);return t&&!1===s.isHandoffComplete&&n(!1),r.useEffect((()=>{!0!==t&&n(!0)}),[t]),r.useEffect((()=>s.handoff()),[]),!e&&t}var p;let m=null!=(p=r.useId)?p:function(){let e=f(),[t,n]=r.useState(e?()=>s.nextId():null);return i((()=>{null===t&&n(s.nextId())}),[t]),null!=t?""+t:void 0};function b(e){var t;if(e.type)return e.type;let n=null!=(t=e.as)?t:"button";return"string"==typeof n&&"button"===n.toLowerCase()?"button":void 0}function h(e,t){let[n,a]=(0,r.useState)((()=>b(e)));return i((()=>{a(b(e))}),[e.type,e.as]),i((()=>{n||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&a("button")}),[n,t]),n}let v=Symbol();function g(...e){let t=(0,r.useRef)(e);(0,r.useEffect)((()=>{t.current=e}),[e]);let n=d((e=>{for(let n of t.current)null!=n&&("function"==typeof n?n(e):n.current=e)}));return e.every((e=>null==e||(null==e?void 0:e[v])))?void 0:n}function y(...e){return Array.from(new Set(e.flatMap((e=>"string"==typeof e?e.split(" "):[])))).filter(Boolean).join(" ")}function x(e,t,...n){if(e in t){let r=t[e];return"function"==typeof r?r(...n):r}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((e=>`"${e}"`)).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,x),r}var w,E,P=((E=P||{})[E.None=0]="None",E[E.RenderStrategy=1]="RenderStrategy",E[E.Static=2]="Static",E),S=((w=S||{})[w.Unmount=0]="Unmount",w[w.Hidden=1]="Hidden",w);function T({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:a,visible:l=!0,name:o,mergeRefs:u}){u=null!=u?u:N;let s=O(t,e);if(l)return I(s,n,r,o,u);let i=null!=a?a:0;if(2&i){let{static:e=!1,...t}=s;if(e)return I(t,n,r,o,u)}if(1&i){let{unmount:e=!0,...t}=s;return x(e?0:1,{0:()=>null,1:()=>I({...t,hidden:!0,style:{display:"none"}},n,r,o,u)})}return I(s,n,r,o,u)}function I(e,t={},n,a,l){let{as:o=n,children:u,refName:s="ref",...i}=k(e,["unmount","static"]),c=void 0!==e.ref?{[s]:e.ref}:{},d="function"==typeof u?u(t):u;"className"in i&&i.className&&"function"==typeof i.className&&(i.className=i.className(t));let f={};if(t){let e=!1,n=[];for(let[r,a]of Object.entries(t))"boolean"==typeof a&&(e=!0),!0===a&&n.push(r);e&&(f["data-headlessui-state"]=n.join(" "))}if(o===r.Fragment&&Object.keys(F(i)).length>0){if(!(0,r.isValidElement)(d)||Array.isArray(d)&&d.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${a} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(i).map((e=>`  - ${e}`)).join("\n"),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map((e=>`  - ${e}`)).join("\n")].join("\n"));let e=d.props,t="function"==typeof(null==e?void 0:e.className)?(...t)=>y(null==e?void 0:e.className(...t),i.className):y(null==e?void 0:e.className,i.className),n=t?{className:t}:{};return(0,r.cloneElement)(d,Object.assign({},O(d.props,F(k(i,["ref"]))),f,c,{ref:l(d.ref,c.ref)},n))}return(0,r.createElement)(o,Object.assign({},k(i,["ref"]),o!==r.Fragment&&c,o!==r.Fragment&&f),d)}function N(...e){return e.every((e=>null==e))?void 0:t=>{for(let n of e)null!=n&&("function"==typeof n?n(t):n.current=t)}}function O(...e){if(0===e.length)return{};if(1===e.length)return e[0];let t={},n={};for(let r of e)for(let e in r)e.startsWith("on")&&"function"==typeof r[e]?(null!=n[e]||(n[e]=[]),n[e].push(r[e])):t[e]=r[e];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map((e=>[e,void 0]))));for(let r in n)Object.assign(t,{[r](e,...t){let a=n[r];for(let n of a){if((e instanceof Event||(null==e?void 0:e.nativeEvent)instanceof Event)&&e.defaultPrevented)return;n(e,...t)}}});return t}function A(e){var t;return Object.assign((0,r.forwardRef)(e),{displayName:null!=(t=e.displayName)?t:e.name})}function F(e){let t=Object.assign({},e);for(let n in t)void 0===t[n]&&delete t[n];return t}function k(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}var R=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(R||{});let D=A((function(e,t){var n;let{features:r=1,...a}=e;return T({ourProps:{ref:t,"aria-hidden":2==(2&r)||(null!=(n=a["aria-hidden"])?n:void 0),style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...4==(4&r)&&2!=(2&r)&&{display:"none"}}},theirProps:a,slot:{},defaultTag:"div",name:"Hidden"})}));function M({onFocus:e}){let[t,n]=(0,r.useState)(!0),a=function(){let e=(0,r.useRef)(!1);return i((()=>(e.current=!0,()=>{e.current=!1})),[]),e}();return t?r.createElement(D,{as:"button",type:"button",features:R.Focusable,onFocus:t=>{t.preventDefault();let r,l=50;r=requestAnimationFrame((function t(){if(l--<=0)r&&cancelAnimationFrame(r);else if(e()){if(cancelAnimationFrame(r),!a.current)return;n(!1)}else r=requestAnimationFrame(t)}))}}):null}function L(e){"function"==typeof queueMicrotask?queueMicrotask(e):Promise.resolve().then(e).catch((e=>setTimeout((()=>{throw e}))))}function j(e){return s.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let C=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map((e=>`${e}:not([tabindex='-1'])`)).join(",");var _,U=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(U||{}),H=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(H||{}),$=((_=$||{})[_.Previous=-1]="Previous",_[_.Next=1]="Next",_);function W(e=document.body){return null==e?[]:Array.from(e.querySelectorAll(C)).sort(((e,t)=>Math.sign((e.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER))))}var G=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(G||{});var B=(e=>(e[e.Keyboard=0]="Keyboard",e[e.Mouse=1]="Mouse",e))(B||{});"undefined"!=typeof window&&"undefined"!=typeof document&&(document.addEventListener("keydown",(e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")}),!0),document.addEventListener("click",(e=>{1===e.detail?delete document.documentElement.dataset.headlessuiFocusVisible:0===e.detail&&(document.documentElement.dataset.headlessuiFocusVisible="")}),!0));let q=["textarea","input"].join(",");function K(e,t=(e=>e)){return e.slice().sort(((e,n)=>{let r=t(e),a=t(n);if(null===r||null===a)return 0;let l=r.compareDocumentPosition(a);return l&Node.DOCUMENT_POSITION_FOLLOWING?-1:l&Node.DOCUMENT_POSITION_PRECEDING?1:0}))}function V(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:a=[]}={}){let l=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,o=Array.isArray(e)?n?K(e):e:W(e);a.length>0&&o.length>1&&(o=o.filter((e=>!a.includes(e)))),r=null!=r?r:l.activeElement;let u,s=(()=>{if(5&t)return 1;if(10&t)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),i=(()=>{if(1&t)return 0;if(2&t)return Math.max(0,o.indexOf(r))-1;if(4&t)return Math.max(0,o.indexOf(r))+1;if(8&t)return o.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),c=32&t?{preventScroll:!0}:{},d=0,f=o.length;do{if(d>=f||d+f<=0)return 0;let e=i+d;if(16&t)e=(e+f)%f;else{if(e<0)return 3;if(e>=f)return 1}u=o[e],null==u||u.focus(c),d+=s}while(u!==l.activeElement);return 6&t&&function(e){var t,n;return null!=(n=null==(t=null==e?void 0:e.matches)?void 0:t.call(e,q))&&n}(u)&&u.select(),2}const Y=r.createContext(null);function z({children:e}){let t=r.useRef({groups:new Map,get(e,t){var n;let r=this.groups.get(e);r||(r=new Map,this.groups.set(e,r));let a=null!=(n=r.get(t))?n:0;return r.set(t,a+1),[Array.from(r.keys()).indexOf(t),function(){let e=r.get(t);e>1?r.set(t,e-1):r.delete(t)}]}});return r.createElement(Y.Provider,{value:t},e)}function X(e){let t=r.useContext(Y);if(!t)throw new Error("You must wrap your component in a <StableCollection>");let n=function(){var e,t,n;let a=null!=(n=null==(t=null==(e=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)?void 0:e.ReactCurrentOwner)?void 0:t.current)?n:null;if(!a)return Symbol();let l=[],o=a;for(;o;)l.push(o.index),o=o.return;return"$."+l.join(".")}(),[a,l]=t.current.get(e,n);return r.useEffect((()=>l),[]),a}var J=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(J||{}),Q=(e=>(e[e.Less=-1]="Less",e[e.Equal=0]="Equal",e[e.Greater=1]="Greater",e))(Q||{}),Z=(e=>(e[e.SetSelectedIndex=0]="SetSelectedIndex",e[e.RegisterTab=1]="RegisterTab",e[e.UnregisterTab=2]="UnregisterTab",e[e.RegisterPanel=3]="RegisterPanel",e[e.UnregisterPanel=4]="UnregisterPanel",e))(Z||{});let ee={0(e,t){var n;let r=K(e.tabs,(e=>e.current)),a=K(e.panels,(e=>e.current)),l=r.filter((e=>{var t;return!(null!=(t=e.current)&&t.hasAttribute("disabled"))})),o={...e,tabs:r,panels:a};if(t.index<0||t.index>r.length-1){let n=x(Math.sign(t.index-e.selectedIndex),{[-1]:()=>1,0:()=>x(Math.sign(t.index),{[-1]:()=>0,0:()=>0,1:()=>1}),1:()=>0});if(0===l.length)return o;let a=x(n,{0:()=>r.indexOf(l[0]),1:()=>r.indexOf(l[l.length-1])});return{...o,selectedIndex:-1===a?e.selectedIndex:a}}let u=r.slice(0,t.index),s=[...r.slice(t.index),...u].find((e=>l.includes(e)));if(!s)return o;let i=null!=(n=r.indexOf(s))?n:e.selectedIndex;return-1===i&&(i=e.selectedIndex),{...o,selectedIndex:i}},1(e,t){var n;if(e.tabs.includes(t.tab))return e;let r=e.tabs[e.selectedIndex],a=K([...e.tabs,t.tab],(e=>e.current)),l=null!=(n=a.indexOf(r))?n:e.selectedIndex;return-1===l&&(l=e.selectedIndex),{...e,tabs:a,selectedIndex:l}},2:(e,t)=>({...e,tabs:e.tabs.filter((e=>e!==t.tab))}),3:(e,t)=>e.panels.includes(t.panel)?e:{...e,panels:K([...e.panels,t.panel],(e=>e.current))},4:(e,t)=>({...e,panels:e.panels.filter((e=>e!==t.panel))})},te=(0,r.createContext)(null);function ne(e){let t=(0,r.useContext)(te);if(null===t){let t=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,ne),t}return t}te.displayName="TabsDataContext";let re=(0,r.createContext)(null);function ae(e){let t=(0,r.useContext)(re);if(null===t){let t=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,ae),t}return t}function le(e,t){return x(t.type,ee,e,t)}re.displayName="TabsActionsContext";let oe=r.Fragment;let ue=P.RenderStrategy|P.Static;let se=A((function(e,t){var n,a;let o=m(),{id:u=`headlessui-tabs-tab-${o}`,...s}=e,{orientation:c,activation:f,selectedIndex:p,tabs:b,panels:v}=ne("Tab"),y=ae("Tab"),w=ne("Tab"),E=(0,r.useRef)(null),P=g(E,t);i((()=>y.registerTab(E)),[y,E]);let S=X("tabs"),I=b.indexOf(E);-1===I&&(I=S);let N=I===p,O=d((e=>{var t;let n=e();if(n===H.Success&&"auto"===f){let e=null==(t=j(E))?void 0:t.activeElement,n=w.tabs.findIndex((t=>t.current===e));-1!==n&&y.change(n)}return n})),A=d((e=>{let t=b.map((e=>e.current)).filter(Boolean);if(e.key===l.Space||e.key===l.Enter)return e.preventDefault(),e.stopPropagation(),void y.change(I);switch(e.key){case l.Home:case l.PageUp:return e.preventDefault(),e.stopPropagation(),O((()=>V(t,U.First)));case l.End:case l.PageDown:return e.preventDefault(),e.stopPropagation(),O((()=>V(t,U.Last)))}return O((()=>x(c,{vertical:()=>e.key===l.ArrowUp?V(t,U.Previous|U.WrapAround):e.key===l.ArrowDown?V(t,U.Next|U.WrapAround):H.Error,horizontal:()=>e.key===l.ArrowLeft?V(t,U.Previous|U.WrapAround):e.key===l.ArrowRight?V(t,U.Next|U.WrapAround):H.Error})))===H.Success?e.preventDefault():void 0})),F=(0,r.useRef)(!1),k=d((()=>{var e;F.current||(F.current=!0,null==(e=E.current)||e.focus({preventScroll:!0}),y.change(I),L((()=>{F.current=!1})))})),R=d((e=>{e.preventDefault()})),D=(0,r.useMemo)((()=>({selected:N})),[N]);return T({ourProps:{ref:P,onKeyDown:A,onMouseDown:R,onClick:k,id:u,role:"tab",type:h(e,E),"aria-controls":null==(a=null==(n=v[I])?void 0:n.current)?void 0:a.id,"aria-selected":N,tabIndex:N?0:-1},theirProps:s,slot:D,defaultTag:"button",name:"Tabs.Tab"})})),ie=A((function(e,t){let{defaultIndex:n=0,vertical:a=!1,manual:l=!1,onChange:o,selectedIndex:u=null,...s}=e;const f=a?"vertical":"horizontal",p=l?"manual":"auto";let m=null!==u,b=g(t),[h,v]=(0,r.useReducer)(le,{selectedIndex:null!=u?u:n,tabs:[],panels:[]}),y=(0,r.useMemo)((()=>({selectedIndex:h.selectedIndex})),[h.selectedIndex]),x=c(o||(()=>{})),w=c(h.tabs),E=(0,r.useMemo)((()=>({orientation:f,activation:p,...h})),[f,p,h]),P=d((e=>(v({type:1,tab:e}),()=>v({type:2,tab:e})))),S=d((e=>(v({type:3,panel:e}),()=>v({type:4,panel:e})))),I=d((e=>{N.current!==e&&x.current(e),m||v({type:0,index:e})})),N=c(m?e.selectedIndex:h.selectedIndex),O=(0,r.useMemo)((()=>({registerTab:P,registerPanel:S,change:I})),[]);i((()=>{v({type:0,index:null!=u?u:n})}),[u]),i((()=>{if(void 0===N.current||h.tabs.length<=0)return;let e=K(h.tabs,(e=>e.current));e.some(((e,t)=>h.tabs[t]!==e))&&I(e.indexOf(h.tabs[N.current]))}));let A={ref:b};return r.createElement(z,null,r.createElement(re.Provider,{value:O},r.createElement(te.Provider,{value:E},E.tabs.length<=0&&r.createElement(M,{onFocus:()=>{var e,t;for(let n of w.current)if(0===(null==(e=n.current)?void 0:e.tabIndex))return null==(t=n.current)||t.focus(),!0;return!1}}),T({ourProps:A,theirProps:s,slot:y,defaultTag:oe,name:"Tabs"}))))})),ce=A((function(e,t){let{orientation:n,selectedIndex:r}=ne("Tab.List");return T({ourProps:{ref:g(t),role:"tablist","aria-orientation":n},theirProps:e,slot:{selectedIndex:r},defaultTag:"div",name:"Tabs.List"})})),de=A((function(e,t){let{selectedIndex:n}=ne("Tab.Panels");return T({ourProps:{ref:g(t)},theirProps:e,slot:(0,r.useMemo)((()=>({selectedIndex:n})),[n]),defaultTag:"div",name:"Tabs.Panels"})})),fe=A((function(e,t){var n,a,l,o;let u=m(),{id:s=`headlessui-tabs-panel-${u}`,tabIndex:c=0,...d}=e,{selectedIndex:f,tabs:p,panels:b}=ne("Tab.Panel"),h=ae("Tab.Panel"),v=(0,r.useRef)(null),y=g(v,t);i((()=>h.registerPanel(v)),[h,v]);let x=X("panels"),w=b.indexOf(v);-1===w&&(w=x);let E=w===f,P=(0,r.useMemo)((()=>({selected:E})),[E]),S={ref:y,id:s,role:"tabpanel","aria-labelledby":null==(a=null==(n=p[w])?void 0:n.current)?void 0:a.id,tabIndex:E?c:-1};return E||null!=(l=d.unmount)&&!l||null!=(o=d.static)&&o?T({ourProps:S,theirProps:d,slot:P,defaultTag:"div",features:ue,visible:E,name:"Tabs.Panel"}):r.createElement(D,{as:"span","aria-hidden":"true",...S})})),pe=Object.assign(se,{Group:ie,List:ce,Panels:de,Panel:fe})}}]);