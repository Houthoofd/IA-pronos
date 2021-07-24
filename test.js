var scrapper = require('./scrapper.js');
var colors = require('colors');
const mysql = require('mysql2');


try {
  // create the connection to database
  const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ia-pronos'
});
  console.log("connection réussie");
} catch (error) {
  console.log("erreur de connection");
}


async function main(){
  var scrap = await scrapper.getSourceCodeFromUrl("https://www.matchendirect.fr/");
  var objPage = await scrapper.buildSourceCode(scrap);

  (await objPage.find("div.livescore")).each(async function(classes){
    await (await classes.find("div.panel panel-info")).each(async function(table){
      console.log(table);
    })
  })

}

main();






// var colors = require('colors');
//
// async function main(){
//   var scrap = await scrapper.getSourceCodeFromUrl("https://www.matchendirect.fr/");
//   var objPage = await scrapper.buildSourceCode(scrap);
//
//   (await objPage.find("tr")).each(async function(tr,i,max){
//
//     // log des tr
//     // console.log(`tr ${i} ${max}`.bgGreen.white);
//
//     console.log('-----------------------'.blue);
//
//     await (await tr.find("td")).each(async function(td,i,max){
//
//       // log des td
//       // console.log(`td ${i} ${max}`.bgBlue.white);
//
//       // td contenant l'heure de la rencontre
//       if(td.prop.class == "lm1")console.log('heure rencontre : '.yellow,`${JSON.stringify(td.prop)}`.red);
//       // td contenant le status de la rencontre
//       if(td.prop.class == "lm2")console.log('status : '.yellow,`${JSON.stringify(td.prop)}`.red);
//       // td contenant les datas de la rencontre
//       if(td.prop.class == "lm3"){
//         // isolation des span contenant les data des deux équipes
//         await (await td.find("span")).each(async function(span,i,max){
//
//           // log des span
//           // console.log(`span ${i} ${max} ${JSON.stringify(span.prop)}`.bgRed.white);
//
//           /*
//           * Isolation des img de équipe 1 et 2 représentant les datas des équipes
//           */
//           if(span.prop.class == "lm3_eq1"){
//             await (await span.find('img')).each(function(img){
//               console.log('Equipe 1'.yellow , `${JSON.stringify(img.prop)}`.red);
//             })
//           }
//           if(span.prop.class == "lm3_score")console.log('score'.yellow , `${JSON.stringify(span.prop)}`.red);
//           if(span.prop.class == "lm3_eq2"){
//             await (await span.find('img')).each(function(img){
//               console.log('Equipe 2'.yellow , `${JSON.stringify(img.prop)}`.red);
//             })
//           }
//
//         })
//       }
//
//     })
//   })
//
// }
//
// main();
