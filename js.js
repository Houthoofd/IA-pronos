const showMenu = (headerToggle, navbarId) => {
  const toggleBtn = document.getElementById(headerToggle),
  nav = document.getElementById(navbarId);

  if(headerToggle && navbarId)
  {
    toggleBtn.addEventListener('click', ()=>{
      nav.classList.toggle('show-menu');
    })
  }
}
showMenu('header__toggle','navbar')
