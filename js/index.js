new Swiper('.swiper.swiper1', {
  speed: 1000,
  effect: 'fade',
  autoplay: {
    delay: 5000,
    disableOnInteraction:false,
  },
  loop: true,
});
const swiper2 = new Swiper('.swiper.swiper2', {
  slidesPerView:1.2,
  speed:500,
  spaceBetween:0,
  breakpoints: {
    769: {
      slidesPerView:3,
      slidesPerGroup: 3,
      loopPreventsSlide: false,
    }
  }
});
const popSwiper = new Swiper('.swiper.pop-swiper', {
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    769: {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    }
  }
});

let wi = window.innerWidth;
let projSwiper;
let spaceBetweenVal;
function wiChk() {
  if(wi > 2000) {
    spaceBetweenVal = 0.125 * wi; // 200
  } else if(wi > 1800) {
    spaceBetweenVal = 0.123 * wi; // 196.8
  } else {
    spaceBetweenVal = 0.1209 * wi; // 192
  }
}
wiChk();

window.addEventListener('resize', function () {
  wi = window.innerWidth;
  if(wi > 2000) {
    projSwiper.params.spaceBetween = 0.125 * wi;
  } else if(wi > 1800) {
    projSwiper.params.spaceBetween = 0.123 * wi;
  } else {
    projSwiper.params.spaceBetween = 0.1209 * wi;
  }
});

projSwiper = new Swiper('.swiper.proj-swiper', {
  speed: 800,
  slidesPerView:1.05,
  loop: true,
  navigation: {
    nextEl: ".proj-next",
    prevEl: ".proj-prev",
  },
  breakpoints: {
    769: {
      slidesPerView:1.7,
      spaceBetween:spaceBetweenVal,
    },
  }
});

if(wi > 769) {
  swiper2.on('slideChange', function() {
    if(swiper2.realIndex === 2) {
      swiper2.autoplay.stop();
    //   setTimeout(function() {
    //     pageServiceMove();
    //   },1000)
      document.querySelector('.swiper2').classList.add('idx2');
    // } else {
    //   document.querySelector('.swiper2').classList.remove('idx2');
    }
  });
} else {
  swiper2.on('slideChange', function() {
    if(swiper2.realIndex === 4) {
      swiper2.autoplay.stop();
      // setTimeout(function() {
      //   pageServiceMove();
      // },1000)
    }
  });
}

let wrap = document.querySelector('.wrap');
let visual = document.querySelector('.visual');
let topEl = document.querySelector('.top');
let values = document.querySelector('.values');
let services = document.querySelector('.services');
let recruit = document.querySelector('.recruit');
let contact = document.querySelector('.contact');
let visH;
let topH;
let valH;
let recH;
let conH;
setTimeout(function() {
  visH = visual.getBoundingClientRect().height;
  topH = topEl.getBoundingClientRect().height;
  valH = values.getBoundingClientRect().height;
  recH = recruit.getBoundingClientRect().height;
  conH = contact.getBoundingClientRect().height;
},500)

let pageH = document.documentElement.scrollHeight;
let winTop;
let visTop;
let topTop;
let valTop;
let serTop;
let recTop;

let serPage = 0;
let topPage = 0;
let valPage = 0;
let btm = 0;

let scPos = document.documentElement.scrollTop || 0;
let dir;
function scrollDir() {
  let docY = document.documentElement.scrollTop;
  dir = docY - scPos >= 0 ? 1 : -1;
  scPos = docY;
  if(dir === 1) {
    wrap.classList.add('down');
    wrap.classList.remove('up');
  } else {
    wrap.classList.add('up');
    wrap.classList.remove('down');
  }
}
window.addEventListener('scroll', function() {
  scrollDir();
  if(document.documentElement.scrollTop <= 10) {
    wrap.classList.remove('up', 'down');
  }
  winTop = window.scrollY;
  visTop = visual.getBoundingClientRect().top;
  topTop = topEl.getBoundingClientRect().top;
  valTop = values.getBoundingClientRect().top;
  serTop = services.getBoundingClientRect().top;
  recTop = recruit.getBoundingClientRect().top;
  if(topTop <= 300) {
    topEl.classList.add('active');
    setTimeout(function() {
      pageValMove();
    },4000);
  }
  if(valTop <= 300 && valPage === 0) {
    swiper2.autoplay.start();
    valPage = 1;
  }
  if(serTop <= 200) {
    serPageActive();
    serPage = 1;
  }
  // if(recTop <= 0 && (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) && btm === 0) {
  if(recTop <= 30 && btm === 0) {
    recruit.classList.add('active');
    btmStart();
    webBtmStart();
    btm = 1;
  }
});

function serPageActive() {
  services.classList.add('active');
  serPage = 1;
}

function pageValMove() {
  if(topPage === 0 && valPage === 0) {
    window.scrollTo({ left:0, top:visH + topH, behavior: 'smooth'});
  }
  topPage = 1;
}

// function pageServiceMove() {
//   if(serPage === 0) {
//     window.scrollTo({ left:0, top:visH + topH + valH, behavior: 'smooth'});
//     serPageActive();
//   }
// }

let header = document.querySelector('header');
let menuBtn = document.querySelector('.menu');
let body = document.querySelector('body');

function bodyFix() {
  body.style.overflow = 'hidden';
}
function bodyUnFix() {
  body.style.overflow = '';
}

menuBtn.addEventListener('click', function(){
  if(header.className !== 'open') {
    headerOpen();
  } else {
    header.classList.remove('open');
    headerClose();
  }
});

function headerOpen() {
  header.classList.add('open');
  bodyFix();
}

function headerClose() {
  header.classList.remove('open');
  bodyUnFix();
}

let menuList = document.querySelectorAll('.menu-list a');
Array.prototype.forEach.call(menuList, function(e) {
  e.addEventListener('click', function() {
    headerClose();
  });
});

let details = document.querySelectorAll('.detail');
let popup = document.querySelector('.popup')
Array.prototype.forEach.call(details, function(e, idx) {
  e.addEventListener('click', function() {
    if(popup.className !== 'open') {
      popup.classList.add('open');
      popSwiper.slideTo(idx);
      bodyFix();
    }
  })
});

let popClose = document.querySelector('.pop-close');
popClose.addEventListener('click', function() {
  popup.classList.remove('open', 'prj-open');
  popPrjSwiper.innerHTML = '';
  bodyUnFix();
});

function btmStart() {
  new Vivus('btm', {duration:30});
  setTimeout(function() {
    arrowStart();
  },300)
}
function webBtmStart() {
  new Vivus('web-btm', {duration:30});
  setTimeout(function() {
    webArrowStart();
  },300)
}
function arrowStart() {
  new Vivus('arrow', {duration:50});
}
function webArrowStart() {
  new Vivus('web-arrow', {duration:55});
}

// let holder = document.querySelector('.holder');
// let holPos = holder.scrollTop || 0;
// let popDir
// holder.addEventListener('scroll', function() {
//   let popY = holder.scrollTop;
//   popDir = popY - holPos >= 0 ? 1 : -1;
//   holPos = popY;
//   if(popDir === 1) {
//     holder.classList.add('dw');
//     holder.classList.remove('up');
//   } else {
//     holder.classList.remove('dw');
//     holder.classList.add('up');
//   }
// });

let viewBtn = document.querySelectorAll('.view-btn');
let enName = document.querySelector('.proj-popup .en-name');
let krName = document.querySelector('.proj-popup .kr-name');
let popPrjSwiper = document.querySelector('.pop-prj-swiper .swiper-wrapper');
let num;
let el = '';

Array.prototype.forEach.call(viewBtn, function(e,idx) {
  e.addEventListener('click', function() {
    if(popup.className !== 'prj-open') {
      popup.classList.add('prj-open');
      bodyFix();
    }
    setTimeout(function() {
      prjInfo(idx-2);
    },100)
  });
});

function prjInfo(v) {
  let idx = v;
  if(idx === 6) {
    idx = 0;
  }
  if(idx === -1) {
    idx = 5;
  }
  enName.innerHTML = projectInfo[idx].enNm;
  krName.innerHTML = projectInfo[idx].krNm;
  slideImg(idx);
}
function slideImg(v) {
  let prjNum = v+1;
  el = '';
  for (let i = 1; i < projectInfo[v].images+1; i++) {
    el = el + '<div class="swiper-slide"><div class="dim"></div><img src="img/mo/project-0'+prjNum+'-img-0'+i+'.png" alt="" class="mo"><img src="img/pc/project-0'+prjNum+'-img-0'+i+'.png" alt="" class="web"></div>'
  }
  popPrjSwiper.innerHTML = el;
  setTimeout(function() {
    new Swiper('.swiper.pop-prj-swiper', {
      speed: 800,
      slidesPerView:1.05,
      // initialSlide: 0,
      navigation: {
        nextEl: ".pop-proj-next",
        prevEl: ".pop-proj-prev",
      },
      breakpoints: {
        769: {
          slidesPerView:1.16,
        },
      }
    });
  },100)
}


