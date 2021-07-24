const puppeteer = require('puppeteer');
var colors = require('colors');

/*
* Outils de scrapp de puppeteria
*/
class ScrappingTools{

  pages = {};
  page = null;

  constructor(root){
    this.ppia = root;
  }

  __ppiaInstr(arg){
    return new this.#__ppiaInstr(arg,this);
  }

  #__ppiaInstr = function(f,root){
    this.st = root;
    this.value = f;
  }

}

ScrappingTools.prototype.find = function (querry) {

};

/*
*
*/
ScrappingTools.prototype.newPage = async function (pageName = null) {
  this.pages[pageName] = await this.ppia.newPage(pageName);
  this.page = this.pages[pageName];
  return this.pages[pageName];
};

ScrappingTools.prototype.getPageByName = function(pageName){
  return this.ppia.getPageByName(pageName);
}

ScrappingTools.prototype.goto = async function (page,url,option) {
  return this.ppia.goto(page,url,option);
};

/*
*
*/
ScrappingTools.prototype.addPage = async function (pageName = null) {
  this.pages[pageName] = await this.ppia.newPage(pageName);
};

ScrappingTools.prototype.eval = async function (f,arg = null) {
  var page = null;

  if(this.page)page = this.page;
  else if(this.pages.length > 0)page = this.pages[this.pages.length - 1];
  else if(this.ppia.page)page = this.ppia.page;
  else if(this.ppia.pages.length > 0)page = this.ppia.pages[this.ppia.pages.length - 1];

  return await page.evaluate(new Function('x',
    "x = JSON.parse(x);"+
    "f = eval(x.f);"+
    "return new Promise(async function(next){"+
      "next(await f(x.arg));"+
    "});"
  ), JSON.stringify({f:`(${String(f)})`,arg:arg}) );
};

ScrappingTools.prototype.evalAll = async function (arrF = [] , result = null) {
  const self = this;
  return new Promise(async function(end){
    try{
      // rejet si aucune fonction dans le tableau
      if(arrF.length == 0)throw {err:1 , msg:"arrf est vide" , arrf:arrf};
      var xLength = arrF.length , i = 0;
      for(const f of arrF){
        // si il s'agit d'execution coté app
        if(typeof f == "object" && f.__proto__.constructor.name == "#__ppiaInstr"){
          fp = f.value;
          await Promise.resolve(await fp(result))
          .then(function(r){
            result = r;
            i++;
            if(i == xLength)end(result);
          })
        }
        // si il s'agit d'execution coté page web
        else{
          await Promise.resolve(await self.eval(f,result))
          .then(function(r){
            result = r;
            i++;
            if(i == xLength)end(result);
          })
        }
      }
    }catch(err){
      console.error(err);
      end(null);
    }
  })
};

/*
* permet dans le evalALl de mixer instruction DOM sur la page et instruction coté app
*/
// ScrappingTools.prototype.__ppiaInstr = function(){
//   this.
// }

class PuppeterIA{

  puppeteer = require('puppeteer');
  browser = null;
  pages = {};
  scrappingTools = null;

  constructor(option){
    var self = this;
    self.initialiseTools();
    return new Promise(async function(next){
      await self.launch(option)
      next(self);
    })
  }

  get firstPage(){return (this.pages.length > 0 ? this.pages[0] : null)}
  get lastPage(){return (this.pages.length > 0 ? this.pages[this.pages.length-1] : null)}

}

PuppeterIA.prototype.initialiseTools = async function(){
  this.st = new ScrappingTools(this);
}

PuppeterIA.prototype.launch = async function (option) {
  this.browser = await this.puppeteer.launch(option);
  return this.browser;
};

PuppeterIA.prototype.newPage = async function (pageName = null) {
  this.pages[pageName] = await this.browser.newPage();
  return this.pages[pageName];
};

PuppeterIA.prototype.getPageByName = async function (pageName = null) {
  return ( this.pages[pageName] ? this.pages[pageName] : null );
};

PuppeterIA.prototype.goto = async function (page,url,option) {
  return page.goto(url, option);
};

PuppeterIA.prototype.pdf = async function (option) {
  return this.page.pdf(option);
};

// PuppeterIA.prototype.pdf = async function (option) {
//   return this.page.pdf(option);
// };

(async () => {
  const ppia = await new PuppeterIA({ headless: true });
  const page = await ppia.st.newPage('carrefour');
  await page.setDefaultNavigationTimeout(0);
  await page.goto('https://www.matchendirect.fr/').then(async function(result){

    // var resultat_scrapping = await pupperteria.scrappingTools.eval(function(){
    //   // scrapp du header pour avoir les catégories
    //   return new Promise(async function(next){
    //     document.getElementsByClassName('facet')[1].getElementsByClassName('facet__values__more js-more-facet-values')[0].children[0].click();
    //     var result = [] , doneList = {};
    //     var x = document.querySelectorAll('div.facet__text');
    //     for await(const idiv of Array.from({length: x.length}, (c, i) => i)){
    //         var y = x[idiv].querySelectorAll('a');
    //         for await(const ia of Array.from({length: y.length}, (c, i) => i)){
    //             var cat = y[ia].innerHTML.split('&nbsp;').join('').split('&amp;').join('').split(' ').filter(el => {
    //               return el != null && el != '';
    //             });
    //             if(!doneList[cat.join('_')])result.push({cat : cat.join('_') , keywords : cat , baseUrl : window.location.href , url : `${y[ia].href}&page=` , num : 0});
    //             doneList[cat.join('_')] = cat.join('_');
    //             if(idiv == x.length - 1 && ia == y.length - 1)next(result);
    //         }
    //     }
    //   })
    // })
    // .then(async function(header){
    //   console.log('header OK !'.green);
    //
    //   async function scrapPage(url,num,result = []){
    //     return new Promise(async function(scrap){
    //       Promise.resolve(await page.goto(url+num))
    //       .then(async function(){
    //
    //         pupperteria.scrappingTools.setPage(page);
    //
    //         await pupperteria.scrappingTools.eval(function(result){
    //           // console.log(result);
    //           return new Promise(async function(next){
    //             var x = document.querySelectorAll('div.wrapper') , arrLength = Array.from({length: x.length}, (y, index) => index);
    //             if(x.length == 0)next({status : 'ok' , result : result})
    //             // console.log(arrLength);
    //             for (const i of arrLength){
    //                 var data = {
    //                     // name : x[i].querySelectorAll('a.name')[0].innerHTML,
    //                     ref : x[i].querySelectorAll('div.thumb')[0].children[0].href,
    //                     name : x[i].querySelectorAll('div.thumb')[0].children[0].title,
    //                     dataItemName : x[i].querySelectorAll('div.thumb')[0].children[0].title,
    //                     dataItemBrand : x[i].querySelectorAll('div.thumb')[0].children[0].getAttribute('data-item_brand'),
    //                     dataItemId : x[i].querySelectorAll('div.thumb')[0].children[0].getAttribute('data-item_id'),
    //                     //img : e.querySelectorAll('div.thumb')[0].children[0].chidldren[0].src,
    //                     baseprice : x[i].querySelectorAll('span.bigprice')[0].innerHTML.split('&nbsp;').join(''),
    //                     type : x[i].querySelectorAll('span.type')[0].innerHTML.split('/').join(''),
    //                     bigprice : x[i].querySelectorAll('div.baseprice')[0].innerHTML.split('\t').join('').split('\n').join('').split('>')[x[i].querySelectorAll('div.baseprice')[0].innerHTML.split('\t').join('').split('\n').join('').split('>').length - 1],
    //                     bio : false,
    //                 }
    //                 if(x[i].querySelectorAll('span.labelbiobelguincarrefour').length > 0)data.bio = true;
    //                 result.push(data);
    //                 console.log(i,x.length - 1);
    //                 if(x.length - 1 == i)next(result)
    //           }
    //         })
    //       },result)
    //       .then(async function(resultat){
    //         console.log(`${url}${num}`.bgBlue.white,`scrap done !`.green);
    //         if(typeof resultat == "object" && !Array.isArray(resultat))scrap(resultat.result);
    //         else scrap(await scrapPage(url,num+1,resultat));
    //       })
    //     })
    //     })
    //   }
    //
    //   return new Promise(async function(final){
    //     var produit_par_categories = [];
    //
    //     for(const i of Array.from({length: header.length}, (y, i) => i)){
    //       console.log(`start catégorie ${header[i].cat} !`.yellow);
    //       header[i].produits = await scrapPage(header[i].url,header[i].num);
    //       console.log(`${header[i].cat} catégorie done !`.green);
    //       if(i == header.length - 1){
    //         console.log(`Finish !`.green);
    //         final(header);
    //       }
    //     }
    //   })
    // })
    //
    // console.log(resultat_scrapping);

    await ppia.st.evalAll([
      function(){
        return new Promise(async function(next){
          document.getElementsByClassName('facet')[1].getElementsByClassName('facet__values__more js-more-facet-values')[0].children[0].click();
          var result = [] , doneList = {};
          var x = document.querySelectorAll('div.facet__text');
          for await(const idiv of Array.from({length: x.length}, (c, i) => i)){
              var y = x[idiv].querySelectorAll('a');
              for await(const ia of Array.from({length: y.length}, (c, i) => i)){
                  var cat = y[ia].innerHTML.split('&nbsp;').join('').split('&amp;').join('').split(' ').filter(el => {
                    return el != null && el != '';
                  });
                  if(!doneList[cat.join('_')])result.push({cat : cat.join('_') , keywords : cat , baseUrl : window.location.href , url : `${y[ia].href}&page=` , num : 0});
                  doneList[cat.join('_')] = cat.join('_');
                  if(idiv == x.length - 1 && ia == y.length - 1)next(result);
              }
          }
        })
      },
      ppia.st.__ppiaInstr(
        function(header){
          console.log('header OK !'.green);

          async function scrapPage(url,num,result = []){
            return new Promise(async function(scrap){
              Promise.resolve(await page.goto(url+num))
              .then(async function(){

                ppia.st.page = page;

                await ppia.st.eval(function(result){
                  // console.log(result);
                  return new Promise(async function(next){
                    var x = document.querySelectorAll('div.wrapper') , arrLength = Array.from({length: x.length}, (y, index) => index);
                    if(x.length == 0)next({status : 'ok' , result : result})
                    // console.log(arrLength);
                    for (const i of arrLength){
                        var data = {
                            // name : x[i].querySelectorAll('a.name')[0].innerHTML,
                            ref : x[i].querySelectorAll('div.thumb')[0].children[0].href,
                            name : x[i].querySelectorAll('div.thumb')[0].children[0].title,
                            dataItemName : x[i].querySelectorAll('div.thumb')[0].children[0].title,
                            dataItemBrand : x[i].querySelectorAll('div.thumb')[0].children[0].getAttribute('data-item_brand'),
                            dataItemId : x[i].querySelectorAll('div.thumb')[0].children[0].getAttribute('data-item_id'),
                            //img : e.querySelectorAll('div.thumb')[0].children[0].chidldren[0].src,
                            baseprice : x[i].querySelectorAll('span.bigprice')[0].innerHTML.split('&nbsp;').join(''),
                            type : x[i].querySelectorAll('span.type')[0].innerHTML.split('/').join(''),
                            bigprice : x[i].querySelectorAll('div.baseprice')[0].innerHTML.split('\t').join('').split('\n').join('').split('>')[x[i].querySelectorAll('div.baseprice')[0].innerHTML.split('\t').join('').split('\n').join('').split('>').length - 1],
                            bio : false,
                        }
                        if(x[i].querySelectorAll('span.labelbiobelguincarrefour').length > 0)data.bio = true;
                        result.push(data);
                        console.log(i,x.length - 1);
                        if(x.length - 1 == i)next(result)
                  }
                })
              },result)
              .then(async function(resultat){
                console.log(`${url}${num}`.bgBlue.white,`scrap done !`.green);
                if(typeof resultat == "object" && !Array.isArray(resultat))scrap(resultat.result);
                else scrap(await scrapPage(url,num+1,resultat));
              })
            })
            })
          }

          return new Promise(async function(final){
            for(const i of Array.from({length: header.length}, (y, i) => i)){
              console.log(`start catégorie ${header[i].cat} !`.yellow);
              header[i].produits = await scrapPage(header[i].url,header[i].num);
              console.log(`${header[i].cat} catégorie done !`.green);
              if(i == header.length - 1){
                console.log(`Finish !`.green);
                final(header);
              }
            }
          })

        }
      )
    ])
    .then(function(result_final){
      console.log(result_final);
    })


  })

  // await browser.close();
})();
