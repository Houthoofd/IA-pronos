var scrapper = require('./scrapper.js');
var colors = require('colors');

async function main(){
  var scrap = await scrapper.getSourceCodeFromUrl("https://drive.carrefour.be/fr/search?q=carrefourProducts%3Arelevance%3AbrandName%3ACarrefour&page=0");
  var objPage = await scrapper.buildSourceCode(scrap);

  (await objPage.find('div.wrapper')).each(async function(wrapper){
    console.log('====================');
    // (await wrapper.find('div.product-name')).each(async function(div){
    //   (await div.find('a')).each(function(a){
    //     console.log(a);
    //   })
    // })

    // (await wrapper.find('div')).each(function(input){
    //   console.log(input.prop);
    // })
    // (await wrapper.find('div.thumb')).each(async function(div){
    //   (await div.thumb('a')).each(function(a){
    //     console.log(a);
    //   })
    // })
    (await wrapper.find('span')).each(async function(div){
      console.log(div);
    })
    // (await wrapper.find('div.baseprice')).each(async function(div){
    //   console.log(div);
    // })
  })

}

main();
