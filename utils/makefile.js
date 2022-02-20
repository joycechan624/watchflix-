const movie = require('./movie.json');
const movie2 = require('./movie2.json');
const searchobj = require('./searchobj.json')
const newm = require('./newmovie.json')
const strsim = require('string-similarity');

const fs = require('fs').promises;
async function makeFile(){
  const tmp =[]
  console.log(newm.length, movie.length)
  movie2.forEach(o=>{
    // movie2.forEach(o2=>{
    //   //console.log(o, o2);
    //   if(o.title && o2.Title){
    //     const similar = strsim.compareTwoStrings(o.title, o2.Title);
    //     if(similar > 0.9){
    //       ex = true;
    //       tmp.push({
    //         ...o,
    //         ...o2
    //       })
    //     }
    //   }
    // })
    if(searchobj[o.Title]){
      tmp.push({
        ...o,
        ...searchobj[o.Title]
      })
    }
  });

  await fs.writeFile('./newmovie.json', JSON.stringify(tmp, null, 2));
}

makeFile();