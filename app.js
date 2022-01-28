let carousel = document.querySelector('.carousel');
let carouselContent = document.querySelector('.carousel-content');
let slides = document.querySelectorAll('.slide');

let arrayforSlides = Array.prototype.slice.call(slides);

let carouselDisplay;
let screenSize;


let  lengthOfSlides;


const addClone=()=>{
    let lastSlide = carouselContent.lastElementChild.cloneNode(true);
    lastSlide.style,left =(-lengthOfSlides)+px;
    carouselContent.insertBefore(lastSlide,carouselContent.firstChild);
}

const removeClone=()=>{
    let firstSlide = carouselContent.firstElementChild;

    firstChild.parentNode.removeChild(firstSlide);
}

const moveSlidesRight = ()=>{
        let width = 0;

        arrayforSlides.forEach(slide => {
            slide.style.left = width+px;
            width +=lengthOfSlides;
        });
        addClone();
}
moveSlidesRight();



const moveSlideLeft = ()=>{
    arrayforSlides=arrayforSlides.reverse();
    let maxWidth = (arrayforSlides.length-1)*lengthOfSlides;
    arrayforSlides.forEach(slide , i => {
        maxWidth -=lengthOfSlides;
        slide.style.left = maxWidth+px;
    })

}

window.addEventListener('resize', setScreenSize)









const setScreenSize = ()=>{
    if ( window.innerWidth >= 500 ) {
        carouselDisplaying = 3;
      } else if ( window.innerWidth >= 300 ) {
        carouselDisplaying = 2;
      } else {
        carouselDisplaying = 1;
      }
      getScreenSize();
}


const getScreenSize = ()=>{

    lengthOfSlides=(carousel.offserWidth/carouselDisplaying);
    let initialWidth = lengthOfSlides;

    arrayforSlides.forEach(slide , i => {
        slide.style.left = initialWidth+px;
        initialWidth +=lengthOfSlides;
    });
}



let right= document.querySelector('.nav-right');

right.addEventListener('click',moveLeft);


let moving =  true;

const moveRight =()=>{
    if(moving){
        moving = false;
        let lastSlide = carouselContent.lastElementChild;
        lastSlide.parentNode.removeChild(lastSlide);
        carouselContent.insertBefore(lastSlide,carouselContent.firstChild);
        removeClode();
        let firstChild= carouselContent.firstElementChild;
        firstChild.addEventListener('transitionend',activateAgain);
        moveSlidesRight();
          
    }
}








const activateAgain = ()=>{
    let firstChild = carouselContent.firstElementChild;
    moving = true;
    firstChild.removeEventListener('transitionend',activateAgain);
}
 let left = document.querySelector('.nav-left');

 left.addEventListener('click',moveRight);



 const moveLeft = ()=>{
     if(moving){
         moving = false;
         removeClone();

            let firstSlide = carouselContent.firstElementChild;
            firstChild.addEventListener('transitionend',replaceToEnd);
            moveSlideLeft();
     }
 }

 const replaceToEnd = ()=>{
     let firstSlide = carouselContent.firstElementChild;
     firstSlide.parentNode.removeChild(firstSlide);
     carouselContent.appendChild(firstSlide);
     firstSlide.style.left = (arrayforSlides.length-1)*lengthOfSlides+px;
     addClone();
        moving = true;
        firstSlide.removeEventListener('transitionend',replaceToEnd);
 }

 carouselContent.addEventListener('mousedown',seeMovement);


 let initialX;
 let initialPos;

 const slightMove=(e)=>{
    if ( moving ) {
        let movingX = e.clientX;
        let difference = initialX - movingX;
        if ( Math.abs(difference) < (lengthOfSlide/4) ) {
          slightMoveSlides(difference);
        }  
      }
 }


 const getInitialPos = ()=>{
     initialPos =[];
        arrayforSlides.forEach(slide => {
            let lefty =Math.floor(parseInt(slide.style.left(0,-2)));
            initialPos.push(lefty);
        })
 }

 const  slightMoveSlides=(newX) =>{
   
    arrayforSlides.forEach(function(el, i){
      let oldLeft = initialPos[i];
      el.style.left = (oldLeft + newX) + "px";
    });
  }
  const  moveBasedOnMouse=(e)=> { 
    let finalX = e.clientX;
    if ( initialX - finalX > 0) {
      moveRight();
    } else if ( initialX - finalX < 0 ) {
      moveLeft();
    }
    document.removeEventListener('mouseup', moveBasedOnMouse);
    carouselContent.removeEventListener('mousemove', slightMove);
  }
  setScreenSize();