(()=>{var __webpack_modules__={375:(e,t,n)=>{e.exports=n.p+"img/twitter.22c7fa704ca950408ad7f1632f5b8183.svg"},791:module=>{module.exports=function(obj){obj||(obj={});var __t,__p="";with(obj)__p+='<div id="carouselExample" class="carousel slide">\r\n    <div class="carousel-inner">\r\n      <div class="carousel-item active">\r\n        <img src="'+(null==(__t=imgLink[0])?"":__t)+'" class="d-block w-100" alt="Everything is Object!">\r\n      </div>\r\n      <div class="carousel-item">\r\n        <img src="'+(null==(__t=imgLink[1])?"":__t)+'" class="d-block w-100" alt="Everything is Object!">\r\n      </div>\r\n      <div class="carousel-item">\r\n        <img src="'+(null==(__t=imgLink[2])?"":__t)+'" class="d-block w-100" alt="Everything is Object!">\r\n      </div>\r\n    </div>\r\n    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">\r\n      <span class="carousel-control-prev-icon" aria-hidden="true"></span>\r\n      <span class="visually-hidden">Previous</span>\r\n    </button>\r\n    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">\r\n      <span class="carousel-control-next-icon" aria-hidden="true"></span>\r\n      <span class="visually-hidden">Next</span>\r\n    </button>\r\n  </div>';return __p}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var t=__webpack_require__.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var a=n.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=n[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/^blob:/,"").replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{"use strict";const e=new t({host:"https://inft2202-server.onrender.com/",user:"0000"});function t({host:e,user:t}){this.host=e,this.headers=new Headers({"Content-Type":"application/json",user:t})}t.prototype.findAnimal=async function(e){const t=new URL(`/api/animals/${encodeURIComponent(e)}`,this.host),n=new Request(t,{headers:this.headers,method:"GET"});try{return(await fetch(n)).json()}catch(e){return!1}},t.prototype.getAnimalPage=async function({page:e=1,perPage:t=8}){const n=new URLSearchParams({page:e,perPage:t}),a=new URL(`/api/animals?${n.toString()}`,this.host),s=new Request(a,{headers:this.headers,method:"GET"});try{return(await fetch(s)).json()}catch(e){return!1}},t.prototype.saveAnimal=async function(e){const t=new URL("/api/animals",this.host),n=new Request(t,{headers:this.headers,method:"POST",body:JSON.stringify(e)});try{return(await fetch(n)).json()}catch(e){return!1}},t.prototype.updateAnimal=async function(e){const t=new URL("/api/animals",this.host),n=new Request(t,{headers:this.headers,method:"PUT",body:JSON.stringify(e)});try{return(await fetch(n)).json()}catch(e){return!1}},t.prototype.deleteAnimal=async function(e){const t=new URL(`/api/animals/${e}`,this.host),n=new Request(t,{headers:this.headers,method:"DELETE"});try{return 204===(await fetch(n)).status}catch(e){return!1}};const n=function(t){const{recordPage:n,animalBuilder:a}=t,s=document.createElement("div");s.classList.add("container");const r=document.createElement("div");r.classList.add("text-center"),r.innerHTML='<i class="fa fa-5x fa-spinner fa-spin"></i>',s.append(r);const i=document.createElement("div");function c(t){return n=>{e.deleteAnimal(t.name).then((()=>{window.location.reload()}))}}function o(e){return n=>{t.name=e.name,a(t)}}function l(t){return r.classList.remove("d-none"),e.getAnimalPage(t).then((e=>{s.textContent="";let{records:t,pagination:n}=e;r.classList.add("d-none");let a=document.createElement("div");a.classList.add("d-flex","justify-content-between");let i=document.createElement("h1");i.innerHTML="Animal List",a.append(i),a.append(function({page:e=1,perPage:t=5,pages:n=10}){function a(e,n,a){const s=document.createElement("li");s.classList.add("page-item",a);const r=document.createElement("button");r.classList.add("page-link"),r.innerText=n;let i={page:e,perPage:t};return r.addEventListener("click",function(e){return t=>{l(e)}}(i)),s.append(r),s}const s=document.createElement("div");n>1&&s.classList.remove("d-none");const r=document.createElement("ul");r.classList.add("pagination"),r.append(a(e-1,"Previous",1==e?"disabled":null));for(let t=1;t<=n;t++)r.append(a(t,t,t==e?"active":null));return r.append(a(e+1,"Next",e==n?"disabled":null)),s.append(r),s}(n)),s.append(a),s.append(function(e){const t=document.createElement("table");t.classList.add("table","table-striped");const n=t.createTHead().insertRow();["Name","Breed","Legs","Eyes","Sound"].forEach((e=>{const t=document.createElement("th");t.textContent=e,n.appendChild(t)}));for(let n of e){const e=t.insertRow();e.insertCell().textContent=n.name,e.insertCell().textContent=n.breed,e.insertCell().textContent=n.legs,e.insertCell().textContent=n.eyes,e.insertCell().textContent=n.sound;const a=e.insertCell();a.classList.add();const s=document.createElement("button");s.classList.add("btn","btn-danger","mx-1"),s.innerHTML='<i class="fa fa-trash"></i>',s.addEventListener("click",c(n)),a.append(s);const r=document.createElement("button");r.classList.add("btn","btn-primary","mx-1"),r.innerHTML='<i class="fa fa-user"></i>',r.addEventListener("click",o(n)),a.append(r)}return t}(t))})).catch((e=>{r.classList.add("d-none"),i.innerHTML=e,i.classList.remove("d-none"),i.classList.add("alert-danger")})),s}return i.classList.add("alert","text-center","d-none"),s.append(i),{element:l(n)}};var a=__webpack_require__(791),s=__webpack_require__(375);!function(t){const r=document.querySelectorAll(".nav-item a");var i={recordPage:{page:1,perPage:10},name:null,animalBuilder:function(n){r.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),r[1].classList.add("active"),r[1].setAttribute("aria-current","page"),t.innerHTML="",t.append(function(t){const{name:n,listBuilder:a}=t,s=document.createElement("div");s.classList.add("container");let r=document.createElement("h1");r.innerHTML="Add Animal",s.append(r),s.append(document.createElement("hr"));const i=document.createElement("form");let c=null;function o(){const e=document.createElement("div");e.classList.add("mb-2");const t=document.createElement("div");t.classList.add("mb-3");let n=`<input type="text" class="form-control" id="name" name="name" value="${null!=c?c.name:""}" readonly>`;t.innerHTML='<label for="name" class="form-label">Animal Name</label>'+(null!=c?n:'<input type="text" class="form-control" id="name" name="name">')+'<p class="text-danger d-none"></p>',e.append(t);const a=document.createElement("div");a.classList.add("mb-3"),a.innerHTML=`<label for="breed" class="form-label">Animal Breed</label><input type="text" class="form-control" id="breed" name="breed" value="${null!=c?c.breed:""}"><p class="text-danger d-none"></p>`,e.append(a);const r=document.createElement("div");r.classList.add("mb-3"),r.innerHTML='<label for="legs" class="form-label">Number of Legs</label><input type="text" class="form-control" id="legs" name="legs"><p class="text-danger d-none"></p>',e.append(r);const o=document.createElement("div");o.classList.add("mb-3"),o.innerHTML='<label for="eyes" class="form-label">Number of Eyes</label><input type="text" class="form-control" id="eyes" name="eyes"><p class="text-danger d-none"></p>',e.append(o);const l=document.createElement("div");l.classList.add("mb-3"),l.innerHTML='<label for="sound" class="form-label">Sound this animal makes</label><input type="text" class="form-control" id="sound" name="sound"><p class="text-danger d-none"></p>',e.append(l);const d=document.createElement("div");return d.innerHTML='<button type="submit" class="btn btn-primary">Save Animal <i class="fa-solid fa-check"></i></button>',e.append(d),i.append(e),s.append(i),s}function l(n){const s=function(){let e=!0;const t=i.name.value,n=i.name.nextElementSibling;""==t?(n.classList.remove("d-none"),n.textContent="You must name this animal!",e=!1):n.classList.add("d-none");const a=i.breed.value,s=i.breed.nextElementSibling;""==a?(s.classList.remove("d-none"),s.textContent="What type of animal is this?",e=!1):s.classList.add("d-none");const r=i.legs.value,c=i.legs.nextElementSibling;return""==r?(c.classList.remove("d-none"),c.textContent="How many legs does this animal have?",e=!1):isNaN(r)?(c.classList.remove("d-none"),c.textContent="This must be a number.",e=!1):c.classList.add("d-none"),i.eyes.value,i.sound.value,e}();if(s){const s=new FormData(i),r={};s.forEach(((e,t)=>{r[t]="eyes"===t||"legs"===t?Number(e):e}));const c=i.name.nextElementSibling;"new"==n?e.saveAnimal([r]).then((e=>{a(t)})).catch((e=>{c.classList.remove("d-none"),c.textContent="Err in adding an animal record!"})):e.updateAnimal(r).then((e=>{a(t)})).catch((e=>{c.classList.remove("d-none"),c.textContent="Err in updating animal record!"})),c.classList.add("d-none")}else console.log("were not good")}return n?(r.innerText="Update Animal",e.findAnimal(n).then((e=>{if(0==e.length)throw"No record";c=e[0],o(),i.addEventListener("submit",(function(e){e.preventDefault(),l("update")}))})).catch((e=>{r.innerHTML=e}))):(o(),i.addEventListener("submit",(function(e){e.preventDefault(),l("new")}))),{element:s}}(n).element)},listBuilder:function(e){e.name=null,r.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),r[2].classList.add("active"),r[2].setAttribute("aria-current","page"),t.innerHTML="",t.append(n(e).element)},coverBuilder:function(e){e.name=null,r.forEach((e=>{e.classList.remove("active"),e.removeAttribute("aria-current")})),r[0].classList.add("active"),r[0].setAttribute("aria-current","page"),t.innerHTML=a({imgLink:["./img/everything_is_object1.png","./img/everything_is_object2.png","./img/everything_is_object3.png"]})}};const c=async()=>{const e=[{path:"/",view:()=>i.coverBuilder(i)},{path:"/animal",view:()=>i.animalBuilder(i)},{path:"/list",view:()=>i.listBuilder(i)}];let t=e.map((e=>({route:e,isMatch:location.pathname===e.path}))).find((e=>e.isMatch));t||(t={route:e[0],isMatch:!0}),t.route.view()};window.addEventListener("popstate",c),document.addEventListener("DOMContentLoaded",(()=>{document.body.addEventListener("click",(e=>{var t;e.target.matches("[data-link]")&&(e.preventDefault(),t=e.target.href,history.pushState(null,null,t),c())})),c()}));let o=document.querySelector(".ms-3 a");const l=document.createElement("img");l.src=s,l.width=24,l.height=24,o.appendChild(l)}(document.querySelector("main"))})()})();
//# sourceMappingURL=bundle.js.map