import{E as a,J as c,K as f,L as l,O as n,f as r,g as p,h as i,p as m}from"./chunk-XFU2T3EW.js";var M=[{path:"maps",loadChildren:()=>import("./chunk-5BELBNQQ.js").then(o=>o.MapsModule)},{path:"**",redirectTo:"maps"}],u=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i({type:t}),t.\u0275inj=r({imports:[n.forRoot(M),n]});let o=t;return o})();var h=(()=>{let t=class t{constructor(){this.title="NgMaps"}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=p({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,N){e&1&&m(0,"router-outlet")},dependencies:[l]});let o=t;return o})();var g=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i({type:t,bootstrap:[h]}),t.\u0275inj=r({providers:[{provide:a,useValue:"/NgMaps/"}],imports:[f,u]});let o=t;return o})();c().bootstrapModule(g,{ngZoneEventCoalescing:!0}).catch(o=>console.error(o));
