
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


// class Pari{
//   constructor(num_pari,date,event,sport,cote,mise,status){
//     this.num_pari = num_pari;
//     this.date = date;
//     this.event = event;
//     this.sport = sport;
//     this.cote = cote;
//     this.mise = mise;
//     this.status = status;
//   }
//
//   static addToList(num_pari,date,event,sport,cote,mise,status)
//   {
//     const list = document.getElementById('result-row');
//     const row = document.createElement('tr');
//       row.setAttribute("style", "background-color: green;");
//       row.innerHTML =
//       '<td>' + num_pari + '</td>'+
//       '<td>' + date + '</td>'+
//       '<td>' + event + '</td>'+
//       '<td>' + sport + '</td>' +
//       '<td>' + cote + '</td>' +
//       '<td>' + mise + '</td>' +
//       '<td>' + status + '</td>'
//       ;
//
//         list.appendChild(row);
//   }
// }
//
// document.getElementById('sub_btn').addEventListener('click', (e) => {
//   const num_pari = caches.nbreclicks++;
//   const date = document.getElementsByName('date')[0].value;
//   const event = document.getElementsByName('event')[0].value;
//   const sport = document.getElementsByName('sport')[0].value;
//   const cote = document.getElementsByName('cote')[0].value;
//   const mise = document.getElementsByName('mise')[0].value;
//   const status = document.getElementsByName('status')[0].value;
//
//   const pari = new Pari(num_pari,date,event,sport,cote,mise,status)
//   console.log(pari);
//
//   Pari.addToList(num_pari,date,event,sport,cote,mise,status);
// });



// ------ pas toucher ---------//

// document.getElementById('sub_btn').sendData = function(data){
//   console.log(data);
// }
//
// document.getElementById('sub_btn').onclick = function(event){
//
//   var result = {};
//   for(var input of this.parentNode.querySelectorAll('input')){
//       try{
//           if(input.value == "")throw {error:1,msg:"le champ est vide"};
//           result[input.placeholder] = input.value;
//       }catch(err){
//           alert(`le champ ${input.placeholder} est vide !`);
//           input.style.background = "red";
//           console.error(err);
//       }
//   }
//   console.log(result);
//   AddToHTML(result);
//
// }
