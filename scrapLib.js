const puppeteer = require('puppeteer');
var colors = require('colors');
var mysql = require('mysql');


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
  const ppia = await new PuppeterIA({ headless: false });
  const page = await ppia.st.newPage('matchendirect');
  await page.setDefaultNavigationTimeout(0);
  console.log(ppia.st.__proto__);
  // scrapping //
  await page.goto('https://www.matchendirect.fr/').then(async function(result){
    console.log("promesse");
    await ppia.st.eval(function(){
      // console.log(result);
      return new Promise(async function(next){
        const trs = (document.querySelectorAll('#livescore')[0]).querySelectorAll('tr');
        const mesMatch = [];
        for(const i of Array.from({length : trs.length},(x,i) => i)){
            const heure = ( (trs[i].querySelectorAll('td.lm1')[0].innerHTML).split('>').length == 1 ? trs[i].querySelectorAll('td.lm1')[0].innerHTML : "Nom programmer");
            const imgs = trs[i].querySelectorAll('img');
            const equipes = [imgs[0].alt,imgs[1].alt];
            const score = ( (trs[i].querySelectorAll('span.lm3_score')[0].innerHTML).split('>').length == 1 ? trs[i].querySelectorAll('span.lm3_score')[0].innerHTML : "En Attente");
            mesMatch.push({equipe_domicile : equipes[0] , equipe_ext : equipes[1] , heure : heure , score : score});
            if(i == trs.length - 1)console.log(mesMatch);
        }
        next(mesMatch);
        })
      })
      .then(function(mesMatch){
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "ia-pronos"
        });
        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
           con.query(
             "INSERT INTO football (equipe_a_domicile, equipe_ext, heure_depart, score) VALUES ?",
             [Array.from({length : mesMatch.length} , (x,i) => Object.values(mesMatch[i]))],
             function (err, result) {
               if (err) console.error(err);
               console.log("Number of records inserted: " + result.affectedRows);
            }
          );
        });
      })
    })
 })();

// code maitre yoda //

// const trs = (document.querySelectorAll('#livescore')[0]).querySelectorAll('tr');
// const mesMatch = [];
// for(const i of Array.from({length : trs.length},(x,i) => i)){
//     const heure = trs[i].children[0].innerHTML;
//     const imgs = trs[i].querySelectorAll('img');
//     const equipes = [imgs[0].alt,imgs[1].alt];
//     const score = ( (trs[i].querySelectorAll('span.lm3_score')[0].innerHTML).split('>').length == 1 ? trs[i].querySelectorAll('span.lm3_score')[0].innerHTML : "En Attente");
//     mesMatch.push({heure : heure , equipes : equipes , score : score});
//     if(i == trs.length - 1)console.log(mesMatch);
// }

// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);


// for(const match of mesMatch)
// {
//   console.log();
//   var sql = `INSERT INTO football (equipe_a_domicile, equipe_ext, heure_depart, score) VALUES ("${match.equipes[0]}", "${match.equipes[1]}", "${match.heure}", "${match.score}")`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//   });
// }
