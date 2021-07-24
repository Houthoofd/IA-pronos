const request = require('request');

class Resultat{
  value;

  constructor(value){
    this.value = value;
  }

}

Resultat.prototype.each = async function (f) {
  const self = this;
  var xLength = (self.value).length - 1 , lenght = [] , xI = 0;

  for(var i = 0 ; i <= xLength ; i++ ){
    lenght.push(i);
  }

  return new Promise(async function(next){
    try{
      if(self.value.length==0)throw {err:1 , msg:"self.value est vide" , value : self.value , function : 'each()'};
      for(const i of lenght){
        if(typeof f == 'function'){
          Promise.resolve(await f(self.value[i],i,xLength)).then(async function(){
            // console.log(self.value[i],i,xLength);
            if(i==xLength)next();
          })
        }else{
          console.log(e.gbRed.blue);
          if(i==xLength)next();
        }
      };
    }catch(err){
      console.error(err);
      next();
    }
  })
};

  // <summary>
  //   fonction qui retourne le code source d'un url
  // <summary>
  // <param>
  //   url : url du site cible à extraire le code source
  // <param>
  // <return>
  //   false ( erreur ) | code source de la page
  // <return>

class HTMLelement{

  type;
  prop;
  childrens;

  #id;

  constructor(type,prop,childrens,id=null){
    this.type = type;
    this.prop = prop;
    this.childrens = childrens;
    if(id)this.#id = id;
    else this.#id = Date.now();
  };

  get id(){return this.#id;}

}

HTMLelement.prototype.find = function (querry) {
  var self = this;
  return new Promise(async function(next){
    var result = await self.find_from_querry(querry);
    if(result.find.length!=1)next(new Resultat(result.find));
    else next(new Resultat(result.find));
  })
};

HTMLelement.prototype.find_from_querry = function (querry,result) {
  var self = this;
  return new Promise(async function(next){
    if(typeof result=='undefined')result={find:[],historique:{}};
    var querrySelector = self.getQuerrySelector(querry);

    // FILTRE DES CORESPONDANCE TAG , ID , CLASS
    if(self.type.toUpperCase() == querrySelector.type.toUpperCase() && !result.historique[self.id]){
      if(querrySelector.id && querrySelector.class){
        if(self.prop.id.toUpperCase() == querrySelector.id.toUpperCase() && self.prop.class.toUpperCase() == querrySelector.class.toUpperCase()){
          result.historique[self.id] = true;
          result.find.push(self) ;
        }
      }else{
        if(querrySelector.id){
          try{
            if(self.prop.id.toUpperCase() == querrySelector.id.toUpperCase()){
              result.historique[self.id] = true;
              result.find.push(self) ;
            }
          }catch(err){}
        }
        else if(querrySelector.class){
          try{
            if(self.prop.class.toUpperCase() == querrySelector.class.toUpperCase()){
              result.historique[self.id] = true;
              result.find.push(self) ;
            }
          }catch(err){}
        }
        else{
          result.historique[self.id] = true;
          result.find.push(self) ;
        }
      }
    }
    // Variable de sortie de Promesse
    var x = Object.keys(self.childrens) , xLength = x.length - 1 , xI = 0;
    //
    if(self.childrens.length == 0){
      next(result)
    }
    else{
      for await(const htmlE of self.childrens){
        // console.log(htmlE.type.toUpperCase(),querry);
        Promise.resolve(
          await htmlE.find_from_querry(querry,result)
        ).then(async function(find_Result){

          // PEUT ETRE UNE ERREUR //

          if(find_Result && (typeof find_Result[0]!='undefined'))result.find.push(find_Result[0]);

          // PEUT ETRE UNE ERREUR //

          if(xLength == xI)next(result);
          xI++;
        })
      }
    }
  })
};

HTMLelement.prototype.getQuerrySelector = function (querry) {
  let q = {};
  let querry_Splited = querry.split(/[\s,#,.]+/);
  if(querry_Splited.length == 1){
    q.type = querry_Splited[0];
  }else{
    q.type = querry_Splited[0];
    if(querry_Splited.length == 3){
      q.id = querry_Splited[1];
      q.class = querry_Splited[2];
    }
    else if(querry_Splited.length == 2){
      if(querry.split('#').length==2){
        q.id = querry.split('#')[1]
      }
      if(querry.split('.').length==2){
        q.class = querry.split('.')[1]
      }
    }
  }
  return q;
};

function getSourceCodeFromUrl(url){
  return new Promise(function(next){
    request(url, function (error, response, body) {
      try{
        if(error)throw error;
        next(body);
      }catch(err){
        next(false);
      }
    });
  })
}

function getBaliseDatas(balise){
  // <param>
    // attribs = CREATION D'UN OBJECT REPRESENTANT LES ATTRIBUS FINAUX DE LA BALISE
    // attribsList = SPLIT DES DONNEE ENCODEE ENTRE < > PAR LES ESPACES
    // attribsLength = NOMBRE REPRESENTANT LA LONGUEUR DE attribsList
    // iAttribs = ID L'ORS DE LA BOUCLE PERMETANT LE DECLANCHEUR next() DE SORTIE DE PROMESSE
  // <param>
  return new Promise(async function(next){
    var attribs = {balise:"",attribs:{}};
    var attribsList = balise.split(' ') , attribsLength = attribsList.length-1 , iAttribs = 0;
    attribs.balise = attribsList[0];
    for await(const p of balise.split(' ')){
      try{
        if(p.split('=').length == 1)throw 1;
        attribs.attribs[p.split('=')[0]] = (p.split('=')[1]).split('"')[1];
      }catch(err){
        // if(err==1)attribs.balise = p;
        // console.log('ouvrante :',x.balise);
      }
      if(attribsLength == iAttribs){
        // if(x.content!="")attribs.text=x.content;
        next(attribs)
      }
      iAttribs++;
    }
  })
}

function orphanTag(liste,comparator){
  return new Promise(function(next){
    var isOrphan = true;
    var listeArray = Object.keys(liste) , listeLength = listeArray.length - 1 , iListe = 0;
    for(const eKey of Object.keys(liste)){
      if(comparator.balise == liste[eKey].type) isOrphan = false;
      if(iListe == listeLength) next(isOrphan);
      iListe++;
    }
  })
}

// <summary>
  // fonction permetant de retoruner un obj construit à partir du code source
// <summary>
// <param>
  // src = code source d'une page web
// <param>
// <return>
  // Retourne un objet toReturn avec
    // - une promesse qui se résolus l'orsque toReturn est construit et que le code source a bien été analyser
// <return>

function buildSourceCode(src){

  var toReturn = [];
  var cache_CODE = {};
  var cache_ID = [];
  // <summary>
    // fonction permetant de retoruner un id soit unique soit dans la continuation d'un id précédent
  // <summary>
  // <param> Pas de parametre d'entrée <param>
  // <return>
    // Retourne un id unique ou dans la continutée de l'id unique
  // <return>

  function generate_Unique_id(){
    function generate_ID(){
      return Math.round(Math.random()*Math.pow(10,10));
    }
    return new Promise(async function(next){
      if(Object.keys(cache_CODE).length != 0){
        // var newId = parseInt(Object.keys(cache_CODE)[Object.keys(cache_CODE).length-1])+1;
        // next(parseInt(Object.keys(cache_CODE)[Object.keys(cache_CODE).length-1])+1);
        var new_id = cache_ID[cache_ID.length-1]+1;
        cache_ID.push(new_id);
        next(new_id);
      }
      else{
        var new_id = generate_ID();
        cache_ID.push(new_id);
        next(new_id);
      }
    })
  }

  // <summary>
    // fonction permetant de retoruner un obj decrivant la balise
  // <summary>
  // <param>
    // comparator = objet représantant une balise
  // <param>
  // <return>
    // Retourne un objet toReturn avec
      // - v qui est le validateur
      // - r qui est la raison
      // - id qui est l'id si besoin d'une référence
  // <return>

  function isSpesificBalise(comparator){
    return new Promise(async function(next){
      var toReturn = { v : false , r : '' , id : ""};
      var x = Object.keys(cache_CODE) , xLenght = x.length - 1 , iX = 0;
      if(x.length == 0){next(toReturn)}
      for await(var eKey of x.reverse()){
        if(cache_CODE[eKey].type.toUpperCase() == 'HEAD' && toReturn.v == false && (comparator.balise == 'meta' || comparator.balise == 'link')){ // DANS LE HEAD , BALISE ORPHELINE
          toReturn.v = true;
          toReturn.r = 'head';
          toReturn.id = eKey;
        }
        if(toReturn.v == false && (comparator.balise == 'noscript' || comparator.balise == 'input' || comparator.balise == 'br/' || comparator.balise == 'br' ||  comparator.balise == 'hr/' || comparator.balise == 'img' || comparator.balise == 'source')){
          toReturn.v = true;
          toReturn.r = 'input';
          toReturn.id = null;
        }
        if(xLenght == iX)next(toReturn);
        iX++;
      }
    });
  }

  // <summary>
    // promesse d'analyse du code source
  // <summary>
  // <param>
    // next = fonction de résolution de la promesse
  // <param>
  // <return>
    // toReturn
  // <return>

  return new Promise(async function(next){
    var end = src.length-1 , i = 0;
    var x = {
      mot : "",
      balise: "",
      content:"",
      getContent:true
    }
    for await(const c of src){
      if(c == '<'){
        x.getContent = false;
        // x.content="";
        // if(x.mot.length!=0)x.content=x.mot;
        x.mot="";
      }
      // console.log(x.getContent);
      if(x.getContent == true){x.content += c;}
      x.mot+=c;
      if(c == '>'){
        x.getContent = false;
        if(x.mot[0]+x.mot[1] == '</'){ // balise fermante
          try{
            // ISOLATION DU TAG NAME
            let tagName = x.mot.split('/')[1];
            tagName = tagName.split('>')[0];
            // ISOLATION DU TAG NAME EST DES PROPRIETEES
            var baliseDatas = await getBaliseDatas(tagName);
              if(Object.keys(cache_CODE).length != 1){ // SI LA LONGUEUR DE cache_CODE EST 1 ALORS INUTILE D'AMBOITER id-2 DANS id-1

                // console.log("fermeture",tagName,cache_CODE,"\n");
                if(x.content!=""){
                  cache_CODE[Object.keys(cache_CODE)[Object.keys(cache_CODE).length-1]].prop.text = x.content;
                }

                if(cache_CODE[Object.keys(cache_CODE)[Object.keys(cache_CODE).length-2]].type != "!DOCTYPE"){ // SI LE TYPE DE id-1 EST DOCTYPE ALORS NE PAS METTRE id-2 DEDANS
                  Promise.resolve(cache_CODE[Object.keys(cache_CODE)[Object.keys(cache_CODE).length-2]].childrens.push( // PUSH DE id-1 DANS id-2
                      cache_CODE[Object.keys(cache_CODE)[Object.keys(cache_CODE).length-1]]
                  ))
                  .then(function(){
                    delete cache_CODE[Object.keys(cache_CODE)[Object.keys(cache_CODE).length-1]]; // SUPPRESSION DE id-1
                  })
                }
              }
            x.content = ""; // RESET DU POSSIBLE CONTENT/TEXT
            x.mot = ""; // RESET MOT
          }catch(err){ // ERREUR RESET X.MOT
            // console.log(err);
            x.mot = "";
          }
        }else{ // balise ouvrante
          x.getContent = true;
          try{
            // SE PREMUNIR DES ANNOTATION QUI PEUVENT RESSEMBLER A UNE BALISE
            if(x.mot[0]+x.mot[1] == "<!")throw 4;
            // ISOLER LE TAG DE LA BALISE
            x.balise = x.mot.split('<')[1];
            x.balise = x.balise.split('>')[0];
            // ISOLATION DU TAG NAME EST DES PROPRIETEES
            var baliseDatas = await getBaliseDatas(x.balise);
            // SAVOIR SI LA BALISE COURANTE EST UNE BALISE "SPECIFIQUE" EX LINK , META , ETC ...
            var spesificBalise = await isSpesificBalise(baliseDatas);
            if(spesificBalise.v == true){ // SI PECIFIQUE
              if(spesificBalise.id!=null){ // SI L'ID EST CONUS ALORS INSERT DE LA BALISE COURANTE DANS L'OBJET ASSOCIER A ID
                cache_CODE[spesificBalise.id].childrens.push(
                      // {type:baliseDatas.balise,prop:baliseDatas.attribs,childrens:[]}
                      new HTMLelement(baliseDatas.balise,baliseDatas.attribs,[],await generate_Unique_id())
                    );
              }
              else{ // SI ID N'EST PAS CONNNUS ALORS INSERT DE BALISE COURANTE DANS id-1
                cache_CODE[Object.keys(cache_CODE)[Object.keys(cache_CODE).length-1]].childrens.push(
                      new HTMLelement(baliseDatas.balise,baliseDatas.attribs,[],await generate_Unique_id())
                      // {type:baliseDatas.balise,prop:baliseDatas.attribs,childrens:[]}
                    );
              }
            }else{ // SI NON SPECIFIQUE
              let unique_id = await generate_Unique_id();
              cache_CODE[unique_id] = new HTMLelement(baliseDatas.balise,baliseDatas.attribs,[],unique_id);
              // cache_CODE[await generate_Unique_id()] = {type:baliseDatas.balise,prop:baliseDatas.attribs,childrens:[]};
            }

            x.mot = ""; // RESET DE MOT
          }catch(err){  // ERREUR RESET X.MOT
            // console.log(err);
            x.mot = "";
          }
        }
      }
      // Construction des balises
      if(i == end){
        next()
      }
      i++;
    }
  })
  .then(async function(){
    // console.log(cache_CODE);
    let cache_CODE_keys = Object.keys(cache_CODE);

    if(cache_CODE_keys.length == 1)return cache_CODE[cache_CODE_keys[0]];
    else return cache_CODE;

    // return cache_CODE;
    // if(cache_CODE_keys.length == 1)return cache_CODE[cache_CODE_keys[0]];
    // else if(cache_CODE_keys.length == 2)return cache_CODE[cache_CODE_keys[1]];
    // else return false;
  })

}


module.exports = {
  getSourceCodeFromUrl:function(url){return getSourceCodeFromUrl(url)},
  buildSourceCode:function(src){return buildSourceCode(src)}
}
