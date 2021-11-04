import '@styles/styles-mobile.scss'
import './assets/docs/ChristBM_CV.pdf'

const arrow = document.querySelector('.goUp_arrow')

const goUp = () => window.scroll( { top:0, left:0, behavior:"smooth" } )

arrow.onclick = function() { goUp() }

window.onscroll = function () {
  if( window.scrollY >= 489 ){
    arrow.classList.remove("dontshow")
  }
  else if(window.scrollY < 489){
    arrow.classList.add("dontshow")
  }
}