let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");
let globalState;
toggle.addEventListener("click", function () {
  collapse.forEach((col) => col.classList.toggle("collapse-toggle"));
});

// with masonry

// swiper libray initialization
new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 5,
  autoplay: {
    delay: 3000,
  },
  // responsive brakpoints
  breakpoints: {
    "@0": {
      slidesPerView: 2,
    },
    // 888px
    "@1.00": {
      slidesPerView: 3,
    },
    // 1110px
    "@1.25": {
      slidesPerView: 4,
    },
    // 1330px
    "@1.50": {
      slidesPerView: 5,
    },
  },
});

// Sticky Navigation
window.onscroll = function () {
  myFunction();
};

// get the current value
let navbar = document.getElementById("header");

// get the navbar position
let sticky = navbar.offsetTop;

// sticky function
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
const modalWrapper = document.getElementById("modalWrapper");
modalWrapper.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) popup(false);
});

function popup(status = false, currentArticleIndex) {
  const myModal = document.getElementById("myModal");
  console.log(globalState.articles[currentArticleIndex]);

  const modal_box = document.getElementsByClassName("modal-content");
  if (status) {
    myModal.classList.add("active");
    modalWrapper.classList.add("active");
  } else {
    myModal.classList.remove("active");
    modalWrapper.classList.remove("active");
  }
  console.log("a,b,c", modal_box);
  modal_box[0].innerHTML = `<div class="modal-dialog">
   
    <!-- Modal content-->
    <article id="post">
                                   <!-- article heading -->
                                   <div class="headings text-center">
                                       
           
                                       <div class="title">
                                           <h2 class="text-title text-dark display-1">${
                                             globalState.articles[
                                               currentArticleIndex
                                             ].title
                                           }</h2>
                                       </div>
           
                                       <div class="meta">
                                           
                                           <a href="#" class="link display-2 text-secondary px-1">
                                               <i class="fas fa-clock text-primary"></i>  Clock ${new Date(
                                                 globalState.articles[
                                                   currentArticleIndex
                                                 ].publishedAt
                                               ).toDateString()}
                                           </a>
                                           
                                       </div>
           
                                   </div>
           
                                   <!-- thumbnail  -->
                                   <div class="thumbnail mt-3">
                                       <img src="${
                                         globalState.articles[
                                           currentArticleIndex
                                         ].urlToImage
                                       }" class="thumbnail" alt="">
                                   </div>
           
                                   <!-- content -->
                                   <div class="content text-dark display-2 secondary-title mt-3">
                                       <p>${
                                         globalState.articles[
                                           currentArticleIndex
                                         ].content
                                       }
                                       </p>
                                       <button class="btn btn-primary secondary-title text-light">
                                       <a href="${
                                         globalState.articles[
                                           currentArticleIndex
                                         ].url
                                       }" target="_blank">Read Full Post</a>
                                        </button>
                                   </div>
                               </article>
   
   </div>`;
}
window.onload = async function () {
  const a = new init();
  globalState = await a.fetchArticles();
  const articles = globalState.articles.map((el, i) => {
    return ` 
<!-- article -->
<div class="grid-item" onclick="popup(true,${i})" data-toggle="modal" data-target="#myModal">
    <article class="article">
        <div class="card">
            <div class="overflow-img">
                
                    <img src="${el.urlToImage}" class="img-fluid" alt="">
                
            </div>
            <div class="card-body text-center px-1">
                <div href="/sidebar.html" class="text-title display-1 text-dark">
                   ${el.title}
                </div>
                <p class="secondary-title text-secondary display-3">
                    <span><i class="far fa-clock text-primary"></i> Clock ${new Date(
                      el.publishedAt
                    )}</span>
                    <span><i class="far fa-comments text-primary"></i> 12</span>
                </p>
            </div>
        </div>
    </article>
</div>


<!-- .article -->


`;
  });
  const container = document.querySelector("#posts > .container > .grid");
  container.innerHTML = articles.join("");
  initializeMasonry();
};
//api

function initializeMasonry() {
  var l = new Masonry("#posts .grid", {
    itemSelector: ".grid-item",
    gutter: 20,
  });
  l.imagesLoaded().progress(function () {
    l.masonry("layout");
  });
}
function init(current, size) {
  let currentPage = current || 1;
  let pageSize = size || 20;
  this.fetchArticles = async function fetchArticles() {
    let params = new URL(document.location).searchParams.get("txt");
    let cata = new URL(document.location).searchParams.get("category");
    console.log(params);
    const api = "28a374bef1844367a1be83c1c4916dd5";
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${api}&pageSize=${pageSize}&page=${currentPage}${
      params ? "&q=" + params : ""
    }${!params ? "&country=in" : ""}${cata ? "&category=" + cata : ""}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  };
  this.setPage = function (x) {
    currentPage = x;
  };
  this.addPage = function () {
    currentPage++;
  };
}

async function addArticles() {
  const a = new init();
  a.addPage();
  const data = await a.fetchArticles();
  const articles = data.articles.map((el, i) => {
    return ` 
        <!-- article -->
        <div class="grid-item">
            <article class="article">
                <div class="card">
                    <div class="overflow-img">
                        <a href="#">
                            <img src="${
                              el.urlToImage
                            }" class="img-fluid" alt="">
                        </a>
                    </div>
                    <div class="card-body text-center px-1">
                        <a href="#" class="text-title display-1 text-dark">
                           ${el.title}
                        </a>
                        <p class="secondary-title text-secondary display-3">
                            <span><i class="far fa-clock text-primary"></i> Clock ${new Date(
                              el.publishedAt
                            )}</span>
                            <span><i class="far fa-comments text-primary"></i> 12</span>
                        </p>
                    </div>
                </div>
            </article>
        </div>
        <!-- .article -->
        
        `;
  });
  const container = document.querySelector("#posts > .container > .grid");
  container.innerHTML += articles.join("");
  initializeMasonry();
}
