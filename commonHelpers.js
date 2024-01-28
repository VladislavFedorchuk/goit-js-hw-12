import{i as p,a as v,S as w}from"./assets/vendor-951421c8.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}})();document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("loader-container"),l=document.getElementById("searchForm"),c=document.getElementById("searchInput"),i=document.getElementById("gallery"),e=document.getElementById("loadMoreButton"),s="41942411-47547b04f91f4c6a01d45aac7";let r=1,m=0,d="";u(n),e.style.display="none",l.addEventListener("submit",async function(a){a.preventDefault(),r=1,e.style.display="none";const o=c.value.trim();if(o===""){p.error({title:"Error",message:"Please enter a search term"}),u(n);return}d=o,h(n);try{await f(d)}finally{u(n)}});async function f(a){try{const o=await v.get("https://pixabay.com/api/",{params:{key:s,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:r}});m=o.data.totalHits,i.innerHTML="",o.data.hits.length===0?p.error({title:"Error",message:"No images found for the provided search term"}):(g(o.data.hits),r*40>=m?e.style.display="none":e.style.display="block")}catch{p.error({title:"Error",message:"Failed to fetch images. Please try again later."})}}e.addEventListener("click",async function(){r++,await f(d),y()});function y(){const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollTo({top:window.scrollY+a*2,behavior:"smooth"})}function h(a){a&&(a.style.display="block")}function u(a){a&&(a.style.display="none")}function g(a){const o=a.map(t=>`
         <div class="gallery-item">
      <a href="${t.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${t.likes}, Views: ${t.views}, Comments: ${t.comments}, Downloads: ${t.downloads}">
          <img src="${t.webformatURL}" alt="${t.tags}" data-src="${t.largeImageURL}" data-caption="Likes: ${t.likes}, Views: ${t.views}, Comments: ${t.comments}, Downloads: ${t.downloads}">
        </a>
        <div class="image-stats">
      <div class="stat-item">
        <p class="stat-label">Likes:</p>
        <p class="stat-value">${t.likes}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Views:</p>
        <p class="stat-value">${t.views}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Comments:</p>
        <p class="stat-value">${t.comments}</p>
      </div>
      <div class="stat-item">
        <p class="stat-label">Downloads:</p>
        <p class="stat-value">${t.downloads}</p>
      </div>
    </div>
    </div>
      `).join("");i.insertAdjacentHTML("beforeend",o),new w(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}});
//# sourceMappingURL=commonHelpers.js.map
