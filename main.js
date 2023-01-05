(() => {
  let on_off = document.querySelector(".music_control i");
  let audio = document.querySelector(".music audio");
  audio.volume = 0.7;

  on_off.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
    on_off.classList.toggle("fa-volume-up");
  });

  const actions = {
    twinkle(key) {
      if (key) {
        document
          .querySelector('[data-index="0"] .star')
          .classList.add("twinkle");
      } else {
        document
          .querySelector('[data-index="0"] .star')
          .classList.remove("twinkle");
      }
    },
    swing(key) {
      if (key) {
        document.querySelector(".star_lonely").classList.add("swing");
      } else {
        document.querySelector(".star_lonely").classList.remove("swing");
      }
    },
    falling(key) {
      if (key) {
        document.querySelector(".comet").classList.add("falling");
      } else {
        document.querySelector(".comet").classList.remove("falling");
      }
    },
    twinkle2(key) {
      if (key) {
        document.querySelector(".star_big").classList.add("twinkle2");
      } else {
        document.querySelector(".star_big").classList.remove("twinkle2");
      }
    },
  };

  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");
  let currrentItem = graphicElems[0]; //현재 활성화된 .graphic-item을 저장
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
    // console.log(ioIndex)
    // 개발자도구에 검은색 글씨는 글자 string이라는 뜻. 파란색 숫자로 바꿔주는 법은 * 1
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    // stepElems[i].setAttribute('data-index', i);

    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  function activate(action) {
    currrentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }

  function inactivate(action) {
    currrentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;
    let temp = 0;

    // for (let i = 0; i < stepElems.length; i++){
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];

      if (!step) continue;
      boundingRect = step.getBoundingClientRect();
      // console.log(boundingRect.top);
      temp++;

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate(currrentItem.dataset.action);
        currrentItem = graphicElems[step.dataset.index];
        activate(currrentItem.dataset.action);
      }
    }
    // console.log(temp)
  });

  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });
  activate();
})();



$(document).ready(function () {
  var counter = 0;
  var c = 0;
  var i = setInterval(function () {
    $(".loading-page .counter h1").html(c + "%");
    $(".loading-page .counter hr").css("width", c + "%");

    
    // $(".loading-page .counter h1.color").css("width", c + "%");
    
    counter++;
    c++;

    if (counter == 101) {
      clearInterval(i);
    }
  }, 50);
});


$(window).on('load', function() {
    setTimeout(function(){
        $(".loading-page").fadeOut();
    }, 5500);
});
