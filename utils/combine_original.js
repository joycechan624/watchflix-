// ---------------------- movie 1 and movie2 combine ------------------------ //
const movie1 = require("./movie.json");
const movie2 = require("./movie2.json");
const { duration } = require("@mui/material");

/*
const movie = [];

for (var i = 0; i < movie2.length; i++){
  movie[i] = {};
  for(var key in movie2[i]){
    if(movie2[i].hasOwnProperty(key)){
        movie[i][key] = movie2[i][key];
    }
  }

  //movie[i].Title = null;
  for(var j = 0; j < movie1.length; j++){
    if(movie1[j].title === movie2[i].Title){
      movie[i].Title = movie1[j].title;
      break;
    }
  }
}

console.log(movie);
*/

function movie(){

const result = movie2.reduce(function(res,obj){
const found = movie1.find(function(o){
    return o.title == obj.Title;
  });

  if(found){
    const newObj = Object.assign({},obj);
    newObj.description = found.description;
    newObj.release_year = found.release_year;
    //newObj.duration = found.duration;
    newObj.duration = parseInt(found.duration);
    newObj.country = found.country;
    newObj.cast = found.cast;
    newObj.director = found.director;

    res.push(newObj);
  }
  return res;
  
},[]);
//console.log(result);
return result
}

movie();
// --------------------------- filtering ---------------------------------- //
const rating = 'IMDB Score';

function filtering(
  arr =[],
  config={Title: null, Genre:null, duration:null, rating:null, country:null}
  
){

  const {Title, Genre,duration,rating,country} = config;

  if(Title || Genre || duration || rating || country ){
    const filtered_arr = arr.filter((o)=>{
      var cond = true;

      if(Title){
        cond = cond && o.Title.includes(Title);
      }

      if(Genre){
        cond = cond && o.Genre.includes(Genre);
      }

      if(duration){
       // cond = cond && o.duration.includes(duration); 
       cond = cond && Number(o.duration) >= Number(duration);
      }

      if(rating){
        cond = cond && Number(o.rating)>= Number(rating);
      }

      if(country){
        cond = cond && o.country.includes(country);
      }
      return cond;
    })
    return filtered_arr;
    //console.log(filtered_arr);
  } else{
    return [];
  }
}
/*
console.log(filtering(movie(),{
  duration:120
}))
*/
// -------------------- sorting ---------------------------- //
function sortArr(
  arr=[],
  config={key:null, type:null }
){

  const {key, type} = config;

  if(key){

  arr.sort((cur,next) =>{

    var num1 = Number(cur[key]);
    var num2 = Number(next[key]);

    if(isNaN(cur[key])){
      num1 = cur[key];
      num2 = next[key];
    }

    if(num1 > num2){    
     
      if(type && type == "asc"){
      return 1;
    }
    else { 
      return -1;
    }

    }

      if(num1 < num2){

        if(type && type === "asc"){
          return -1;
        }
        else{ 
          return 1;
        }
    }

    return 0;
  })
  return arr;
}
}

// Testing default
function defaultFilter(
  arr =[],
  config={Title: ' ', Genre:' ', duration:' ', rating:' ', country:' '}
  
){

  const {Title, Genre,duration,rating,country} = config;

  if(Title || Genre || duration || rating || country ){
    const nofilter_arr = arr.filter((o)=>{
      var cond = true;

      if(Title){
        cond = cond && o.Title.includes(Title);
      }

      if(Genre){
        cond = cond && o.Genre.includes(Genre);
      }

      if(duration){
       cond = cond && Number(o.duration) >= Number(duration);
      }

      if(rating){
        cond = cond && Number(o.rating)>= Number(rating);
      }

      if(country){
        cond = cond && o.country.includes(country);
      }
      return cond;
    })
    return nofilter_arr;
    console.log(nofilter_arr);
  } else{
    return [];
  }
}
/*
console.log(sortArr(movie(),{
  //key:'IMDB Score',type:'asc',
  //key:'duration', type:"asc"
}))
*/
export {movie, filtering, sortArr, defaultFilter }


