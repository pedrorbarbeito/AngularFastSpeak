function desplegarMenu(){
  const menu = document.getElementById('dropdown');
  menu.classList.toggle('is-active');
}

const checkbox = document.getElementById('toggleDark');
const navbar = document.getElementById('navbar');
const iconoToggle = document.getElementById('iconoToggle');
const iconoChat = document.getElementById('iconoChat');

const sections = document.getElementsByTagName('section');
let mySection = null;

checkbox.addEventListener('change', () => {
  document.body.classList.toggle('has-background-dark');
  navbar.classList.toggle('has-background-black');
  iconoToggle.classList.toggle('has-text-white');
  iconoChat.classList.toggle('has-text-white');


  for(let i = 0; i < sections.length; ++i) {
    mySection = sections[i];
    mySection.classList.toggle('has-background-dark');
  }



})

