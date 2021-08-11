

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

showMenu('header__toggle','navbar');


function Supprimer(htmlElement){

  var id = htmlElement.parentNode.parentNode.id;

  htmlElement.parentNode.parentNode.remove();

  return {
    id : id
  }

}

(function(){

  this.routeur = new (function(){

    this.get = function(){
      return new Promise(function(next){
        fetch('http://localhost/IA-pronos/routeur.php' , {
          method : 'GET' ,
          "Content-Type" : "text/plain",
          mode : 'cors',
          body : JSON.stringify({id:id})
        })
        .then(async function(response){
            console.log(response);
            console.log(await response.text())
        })
        .then(function(body){
            console.log(body);
        })
      })
    }

    this.post = function(data,chanel){
      console.log({
        type : 'post',
        data : data
      });
      return new Promise(function(next){
        fetch('http://localhost/IA-pronos/routeur.php' , {
          method : 'POST' ,
          "Content-Type" : "text/plain",
          mode : 'cors',
          body : JSON.stringify({
            type : 'post',
            chanel : chanel,
            data : (function(d){
              d.id ++;
              return d;
            })(data)
          })
        })
        .then(function(response){
          response.text()
          .then(function(text){
            console.log(text);
            next(text);
          })
        })
      })
    }

  })()

})()
