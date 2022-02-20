import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState} from "react";
import { useTheme, useResult} from "@/utils/provider";
import { useRouter } from "next/router";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { setRequestMeta } from "next/dist/server/request-meta";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import Pagination from "@/comps/Pagination/index2";
import PageBttn from '@/comps/PageBttn';
import newmovie from '@/utils/newmovie';
 import React from 'react';

const Cont = styled.div`
  width: 100%;
  height: 100%;
`;

const PagCont = styled.div`
  width: 100%;
  dislplay: flex; 
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;
const Default = styled.div`
  width: 100%;
  display:${props=>props.display};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;

const Button = styled.button`
  margin-bottom: 50px;
`;

const PageCont = styled.div`
  width: 100%; 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

var timer = null;
//var nummovies = 1971;
//var myObj ={};
//var myObj = newmovie.length;
//var count = Object.keys(myObj).length;

export default function Test() {
  const r = useRouter();
  const [data, setData] = useState([]);
  const [View, setView] = useState(false);
  const [sbr, setSbr] = useState(false);
  const [sbr_type, setSbrType] = useState("asc");
  const [inptxt, setInpTxt] = useState('')
  const { result, setResult } = useResult();
  const [cur_page, setCurPage] = useState([]);
  const [movie_num, setMovie_num] = useState();
  //const [Def, setDef] = useState(false);


  const onChangeView = () => {
    if (View === false) {
      setView(true);
      console.log("set to horizontal");
    } else if (View === true) {
      setView(false);
      console.log("set to posterbox");
    }
  };
  /*
  const inputFilter = async (txt) => {
    console.log(txt);
    //console.log(myObj);
    // results the timer if the inputs keeps changing
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // start a timer to wait 2 seconds before making an asynchronous call
    if (timer === null) {
      timer = setTimeout(async () => {
        console.log("async call");
        const res = await ax.get("/api/movie2", {
          params: {
            
          },
      
        });
        console.log(res.data);
        setData(res.data);
        setMovie_num(res.data.length);
      
        //setCurPage(res.data);
        timer = null;
      }, 1000);
    }
    else{

    }
  };
 console.log(movie_num);
 */
  const StoreResult = (item) => {
    console.log(item);
   
    console.log(item);
      console.log("clicked");

      const b_obj = {};
      b_obj[item.imdbId] = item;
      setResult(b_obj);
  };
  
 
// ============== PaginatioWn 

const PageClick = async(p,txt) => {
console.log(txt);
    var obj = {};
    if(txt)
    {
      obj.txt=txt;
     // obj.sort_rating=sbr;
     // obj.sort_type = sbr_type;
    }
    if (timer) 
    {
      clearTimeout(timer);
      timer = null;
    }
    /*
        txt: txt,
        sort_rating: sbr,
        sort_type: sbr_type
    */
   if (timer === null) 
   {
    timer = setTimeout(async () => 
    {
    console.log("async call");
    const res = await ax.get("/api/movie2",
    {
      params: {
        page: p,
        num: 10,
        ...obj,
      }
    });
    console.log(res.data.lists); // lists of 10 movies
    console.log(res.data); // {}: both lists and nummovies
    setData(res.data.lists);
    setCurPage(p);
    setInpTxt(txt);
    //console.log(txt); // triggering the text
    //console.log(p); // page number 
    setMovie_num(res.data.nummovies); 
    console.log(res.data.nummovies); // total movie numbers including after sorting
    timer = null;

    if(res.data.nummovies <= 0)
    {
      alert("no movie found")
    }
  }, 1000);
};
    //setAllData(res.Alldata);
    //setData(res.data.lists);

    //setNumMovies(res.data.nummovies);
    //setCurPage(p);
    //setInpTxt(txt);
    //myObj = res.data.length;
   // setMovie_num(res.data.length);
   //console.log(res.data);
   
  }
  useEffect(()=>{
    PageClick(1, '');
  },[])
console.log(data)
  //console.log(myObj);
  //console.log(movie_num);
  
  var butt_arr = [];
  var ind = 1;
  for( var i = 0; i < movie_num; i += 10){
    butt_arr.push(
      <PageBttn 
        onClick={PageClick.bind(this, ind, inptxt)}
        bgcolor = {cur_page === ind ? '#F9E7E7' : "#fff"}
        btnnumber = {ind}
      />
    );
    ind++
  }
 //console.log(movie_num)
  var lastpage = cur_page+2;
  //var numpges = Math.ceil(nummovies/10)
  var numpages = Math.ceil(movie_num/10);
  console.log(numpages) // number of pages need to have to show the movies
  
  if(lastpage > numpages){
    lastpage = numpages
  }
  /*
  if(cur_page < 5){
    lastpage = 10;
  }*/
  butt_arr = butt_arr.slice(cur_page-2 < 0 ? 0 : cur_page-2, lastpage);
//console.log(butt_arr)
// ============== Pagination ends

  return (
    <Cont>
{/* ====================== Input and Button area ==================================== */}
      <input
        placeholder="Search"
        onChange={(e) => PageClick(1, e.target.value)}
      />
      <Button onClick={() => setSbrType(sbr_type === "asc" ? "desc" : "asc")}>
        {sbr_type === "asc" ? "Sort By Ascending" : "Sort By Decending"}
      </Button>
      <Button
        style={{ backgroundColor: sbr ? "pink" : "white" }}
        onClick={() => setSbr(!sbr)}
      >
        Sory By Ratings
      </Button>
      <Button onClick={onChangeView}>Change Layout</Button>

{/* ====================== Filtering result show below  ==================================== */}
      {View ? (
        <PagCont>
          <Wrap>
            { data && data.length > 0 
                ? data.map((item) => (
              <HMovie
                title={item.Title}
                alt={item.Title}
                year={item.release_year}
                src={item.Poster}
                place={item.country}
                text={item.description}
                clicked={
                  result[item.imdbId] != undefined && result[item.imdbId] !== null
                }
                onClick={() => {
                  StoreResult(item);
                  r.push(`/result/${uuidv4()}`);
                  
                }}
               //pages = {item.num_pages}
              /> 
              ))
              : newmovie.slice(0, 10).map((item) => 
              <HMovie 
                title={item.Title} 
                alt={item.Title}
                year={item.release_year}
                src={item.Poster}
                place={item.country}
                text={item.description}
                onClick={() => {
                  StoreResult(item);
                  r.push(`/result/${uuidv4()}`);
                  
                }}
                //pages = {item.num_pages}
              />
              )
            }
          </Wrap>
           {/* <Pagination /> */}
           <PageCont>
            {butt_arr}
          </PageCont>
        </PagCont>
      ) 
      : 
      (
        <PagCont>
          <Wrap>
          { data && data.length > 0 
            ? data.map((item) => (
              <PosterBox
                title={item.Title}
                alt={item.Title}
                year={item.release_year}
                src={item.Poster}
                place={item.country}
                text={item.description}
                clicked={
                  result[item.imdbId] != undefined && result[item.imdbId] !== null
                }
                onClick={() => {
                  StoreResult(item);
                  r.push(`/result/${uuidv4()}`);
                }}

                //pages = {item.num_pages}
              />
            ))
            : newmovie.slice(0, 10).map((item)=> 
            <PosterBox 
              title={item.Title} 
              alt={item.Title}
              year={item.release_year}
              src={item.Poster}
              place={item.country}
              text={item.description}
              onClick={() => {
                StoreResult(item);
                r.push(`/result/${uuidv4()}`);
                
              }}
              //pages = {item.num_pages}
            />
            )
          }
          </Wrap>
           {/* <Pagination /> */}
           <PageCont>
            {butt_arr}
          </PageCont>
        </PagCont>
      )}
    </Cont>
  );
}