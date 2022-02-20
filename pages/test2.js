import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState} from "react";
import { useTheme, useResult} from "@/utils/provider";
import { useRouter } from "next/router";
import { movie, filtering, sortArr } from "@/utils/combine";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { setRequestMeta } from "next/dist/server/request-meta";
import HMovieData from "@/comps/HMovie/index2";
import PosterBoxData from "@/comps/PosterBox/index2";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import PopUp from "comps/PopUp";
import Pagination from "@/comps/Pagination";
import PageBttn from '@/comps/PageBttn';
import Detail from "@/comps/Detail";

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
const numMovies = 8806;

export default function Test() {
  const r = useRouter();
  const [Alldata,setAllData] = useState(movie);
  const [data, setData] = useState([]);
  const [View, setView] = useState(false);
  const [sbr, setSbr] = useState(false);
  const [sbr_type, setSbrType] = useState("asc");
  const { result, setResult } = useResult();
  const [cur_page, setCurPage] = useState([]);
  const [Def, setDef] = useState(false);
 
  const onChangeView = () => {
    if (View === false) {
      setView(true);
      console.log("set to horizontal");
    } else if (View === true) {
      setView(false);
      console.log("set to posterbox");
    }
  };
  
  const inputFilter = async (txt) => {
    console.log(txt);
    
    // results the timer if the inputs keeps changing
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // start a timer to wait 2 seconds before making an asynchronous call
    if (timer === null) {
      timer = setTimeout(async () => {
        console.log("async call");
        const res = await ax.get("/api/movie", {
          params: {
            txt: txt,
            sort_rating: sbr,
            sort_type: sbr_type,
          },
        });
        console.log(res.data);
        setDef(true);
        setData(res.data);
        timer = null;
      }, 1000);
    }
    else{
      setDef(false);
    }
  };
 
  const StoreResult = (item) => {
    console.log(item);
    
    console.log(item);
      console.log("clicked");

      const b_obj = {};
      b_obj[item.imdbId] = item;
      setResult(b_obj);
  };
  
 
// ============== Pagination 

  const PageClick = async(p) => {
    const res = await ax.get("/api/movie", {
      params: {
        page: p,
        num: 10,
      }
    });

    setAllData(res.Alldata);
    setData(res.data);
    setCurPage(p);
  }

  var butt_arr = [];
  var ind = 1;
  for(var i = 0; i < numMovies; i += 10){
    butt_arr.push(
      <PageBttn 
        onClick={PageClick.bind(this, ind)}
        bgcolor = {cur_page === ind ? '#F9E7E7' : "#fff"}
        number = {ind}
      />
    );
    ind++
  }

  var lastpage = cur_page+5;
  if(cur_page < 5){
    lastpage = 10;
  }
  butt_arr = butt_arr.slice(cur_page-5 < 0 ? 0 : cur_page-5, lastpage);

// ============== Pagination ends

  return (
    <Cont>
{/* ====================== Input and Button area ==================================== */}
      <input
        placeholder="Search"
        onChange={(e) => inputFilter(e.target.value)}
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
 {/* ====================== Default result show below  ==================================== */}     
    <Default display={ Def === true ? 'none':'flex'}>
      {View ?(
      <PagCont>
      <Wrap>
      {
        Alldata.map((item)=><HMovie 
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
        pages = {item.num_pages}
        />)
      }
      </Wrap>
          {/* <Pagination /> */}
          <PageCont>
            {butt_arr}
          </PageCont>
        </PagCont>
      ):(
      <PagCont>
      <Wrap>
      {
        Alldata.map((item)=><PosterBox 
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
        pages = {item.num_pages}
        />)
      }
      </Wrap>
          {/* <Pagination /> */}
          <PageCont>
            {butt_arr}
          </PageCont>
      </PagCont>
      )}
    </Default>
{/* ====================== Filtering result show below  ==================================== */}
      {View ? (
        <PagCont>
          <Wrap>
            {data.map((item) => (
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
                pages = {item.num_pages}
              />
            ))}
          </Wrap>
          {/* <Pagination /> */}
          <PageCont>
            {butt_arr}
          </PageCont>
        </PagCont>
      ) : (
        <PagCont>
          <Wrap>
            {data.map((item) => (
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
                pages = {item.num_pages}
              />
            ))}
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

