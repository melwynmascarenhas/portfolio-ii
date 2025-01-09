/* eslint-disable */
//import Lenis from 'lenis'
import Typewriter from 'typewriter-effect/dist/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, Flip)

//word masks description section
function createAnimation() {
  const allMasks = Array.from(document.querySelectorAll('.word .line-mask'))
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.description_split-word',
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: 1,
    },
  })

  tl.to(allMasks, {
    width: '0%',
    duration: 1,
    stagger: 1,
  })
}

//SPLITTING STARTS
let typeSplit

function runSplit() {
  typeSplit = new SplitType('.description_split-word', {
    types: 'lines, words',
  })

  //SPLITTING ENDS

  //LINE MASK STARTS
  document.querySelectorAll('.word').forEach((word) => {
    const lineMask = document.createElement('div')
    lineMask.classList.add('line-mask')
    word.appendChild(lineMask)
  })
  createAnimation()
  //LINE MASK ENDS
}
runSplit()

//SHUFFLE WORDS STARTS
const words = [
  'Constructing 3D assets…',
  'Rendering immersive scenes…',
  'Integrating custom scripts…',
  'Finalizing Webflow elements',
]
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function displayShuffledWords() {
  shuffleArray(words)
  const wordDisplay = document.querySelector('.preloader__text')
  let currentIndex = 0
  const interval = setInterval(() => {
    wordDisplay.textContent = words[currentIndex]
    currentIndex++
    if (currentIndex === words.length) {
      clearInterval(interval)
    }
  }, 600)
}
displayShuffledWords()
// SHUFFLE WORDS ENDS

//typewriter
let typewriters = document.querySelectorAll('.hero_typewriter')
typewriters.forEach((typewriter) => {
  typewriter.innerText = ''
})
function startTypewriter() {
  typewriters.forEach((typewriter) => {
    new Typewriter(typewriter, {
      strings: [
        'Embark on a journey of unparalleled sophistication',
        'Revolutionary design meets cutting-edge technology',
        'Redefining automotive excellence for over 67 years',
      ],
      autoStart: true,
      loop: true,
      delay: 45,
    })
  })
}
//typewrite ends

//TIMELINE STARTS HERE
let heroImage = document.querySelector('.hero_image-wrap')
let heroMarquee = document.querySelector('.hero_marquee')
let preloaderTL = gsap.timeline()

const loaderTimeline = gsap.timeline()
loaderTimeline
  .to('.loader-logo', { duration: 1, autoAlpha: 0, ease: 'power1.inOut' })
  .to('.loader-logo', { duration: 1, autoAlpha: 1, ease: 'power1.inOut' })
  .repeat(1)

window.onload = function () {
  preloaderTL.add(loaderTimeline)
  preloaderTL
    .to('.preloader > *', {
      yPercent: -100,
      stagger: {
        amount: 0.4,
        from: 'random',
      },

      duration: 0.85,
      ease: 'power4.inOut',
    })
    .from(
      [heroImage, heroMarquee],
      {
        opacity: 0,
        filter: 'blur(60px)',
        y: 50,
        duration: 0.75,
        stagger: 0.075,
        ease: 'sine.out',
        onComplete: startTypewriter,
      },
      '<1.25'
    )
}

//TIMELINE ENDS HERE

//NAV LINKS FLIP code…
let navLinks = document.querySelectorAll('.nav_link')
let navCorners = document.querySelector('.nav_corners')
let sectionEls = document.querySelectorAll('[dest]')

//removing active form all nav links and add to the actual active
function updateActiveNavLink(targetId) {
  navLinks.forEach((navLinkEl) => {
    navLinkEl.classList.remove('is--active')
    if (navLinkEl.href.includes(targetId)) {
      navLinkEl.classList.add('is--active')
    }
  })
}
///scroll on the nav starts here
function scrollNav() {
  let activeSection = null
  sectionEls.forEach((sectionEl) => {
    if (window.scrollY >= sectionEl.offsetTop - sectionEl.clientHeight / 10) {
      activeSection = sectionEl.id
    }
  })
  //for the cover section the id will be null
  if (activeSection !== null) {
    updateActiveNavLink(activeSection)
    navCorners.style.visibility = 'visible'
    const state = Flip.getState(navCorners)
    const activeLink = document.querySelector('.nav_link.is--active')
    activeLink.appendChild(navCorners)
    Flip.from(state, {
      duration: 0.1,
      ease: 'none',
    })
  } else {
    navLinks.forEach((navLinkEl) => {
      navLinkEl.classList.remove('is--active')
      navCorners.style.visibility = 'hidden'
    })
  }
}
window.addEventListener('scroll', scrollNav)
///scroll on the nav ends here

//for loop to add event listener
navLinks.forEach(function (link) {
  navCorners.style.visibility = 'hidden'
  //click event listener
  link.addEventListener('click', function (e) {
    //first remove active class from the current link
    //no need to check all the links where the active class is applied ...using loop remove all
    navLinks.forEach(function (link) {
      link.classList.remove('is--active')
    })
    //add active class to current link
    this.classList.add('is--active')
  })
})
