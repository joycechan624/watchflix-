import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTheme, useResult } from "@/utils/provider";
import { useRouter } from "next/router";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { setRequestMeta } from "next/dist/server/request-meta";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import Pagination from "@/comps/Pagination/index2";
import PageBttn from "@/comps/PageBttn";
import Header from "@/comps/Header";
import newmovie from "@/utils/newmovie";
import { basicColor, whiteblack, shadow } from "@/utils/variables";

const Cont = styled.div`
  width: 100%;
  height: 100%;  
`;

const HeadCont = styled.div`
  width: 100%;
  dislplay: flex;
  justify-content: center;
  align-items: center;
  // margin-bottom: 80px;
  padding: 0 2rem;
  background-color: ${(props) => props.colbg};  
  box-shadow: ${props => props.shadow}; 
`;

const PagCont = styled.div`
  width: 100%;
  dislplay: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
  padding: 2rem 1rem;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
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
`;

var timer = null;
const numMovies = 1971;

export default function Test() {
  const r = useRouter();
  const { theme, setTheme } = useTheme();
  const [data, setData] = useState([]);
  const [View, setView] = useState(false);
  const [sbr, setSbr] = useState(false);
  const [sbr_type, setSbrType] = useState("asc");
  const { result, setResult } = useResult();
  const [cur_page, setCurPage] = useState([]);

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
        const res = await ax.get("/api/movie2", {
          params: {
            txt: txt,
            // sort_rating: sbr,
            // sort_type: sbr_type,
          },
        });
        console.log(res.data);
        setData(res.data);
        timer = null;
      }, 1000);
    } else {
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

  const PageClick = async (p) => {
    const res = await ax.get("/api/movie2", {
      params: {
        page: p,
        num: 10,
      },
    });

    setData(res.data);
    setCurPage(p);
  };

  var butt_arr = [];
  var ind = 1;
  for (var i = 0; i < numMovies; i += 10) {
    butt_arr.push(
      <PageBttn
        onClick={PageClick.bind(this, ind)}
        bgcolor={cur_page === ind ? "#B08584" : "none"}
        number={ind}
      />
    );
    ind++;
  }

  var lastpage = cur_page + 5;
  if (cur_page < 5) {
    lastpage = 10;
  }
  butt_arr = butt_arr.slice(cur_page - 5 < 0 ? 0 : cur_page - 5, lastpage);

  // ============== Pagination ends

  return (
    <Cont>
      <HeadCont colbg={whiteblack[theme]} shadow = {shadow[theme]}>
{/* ====================== Input and Button area ==================================== */}
        <Header
          onInput={(event) => {
            inputFilter(event);
          }}
          changeView={() => {
            onChangeView();
          }}
          changeColor={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        />

        {/* <Button onClick={() => setSbrType(sbr_type === "asc" ? "desc" : "asc")}>
        {sbr_type === "asc" ? "Sort By Ascending" : "Sort By Decending"}
      </Button>
      <Button
        style={{ backgroundColor: sbr ? "pink" : "white" }}
        onClick={() => setSbr(!sbr)}
      >
        Sory By Ratings
      </Button>
      <Button onClick={onChangeView}>Change Layout</Button> */}
      </HeadCont>

{/* ====================== Filtering result show below  ==================================== */}
      {View ? (
        <PagCont>
          <Wrap>
            {data && data.length > 0
              ? data.slice(0, 10).map((item) => (
                  <HMovie
                    title={item.Title}
                    alt={item.Title}
                    year={item.release_year}
                    src={item.Poster}
                    place={item.country}
                    text={item.description}
                    clicked={
                      result[item.imdbId] != undefined &&
                      result[item.imdbId] !== null
                    }
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
                    }}
                    pages={item.num_pages}
                  />
                ))
              : newmovie.slice(0, 10).map((item) => (
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
                    pages={item.num_pages}
                  />
                ))}
          </Wrap>
          {/* <Pagination /> */}
          <PageCont>{butt_arr}</PageCont>
        </PagCont>
      ) : (
        <PagCont>
          <Wrap>
            {data && data.length > 0
              ? data.slice(0, 10).map((item) => (
                  <PosterBox
                    title={item.Title}
                    alt={item.Title}
                    year={item.release_year}
                    src={item.Poster}
                    place={item.country}
                    text={item.description}
                    clicked={
                      result[item.imdbId] != undefined &&
                      result[item.imdbId] !== null
                    }
                    onClick={() => {
                      StoreResult(item);
                      r.push(`/result/${uuidv4()}`);
                    }}
                    pages={item.num_pages}
                  />
                ))
              : newmovie.slice(0, 10).map((item) => (
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
                    pages={item.num_pages}
                  />
                ))}
          </Wrap>
          {/* <Pagination /> */}
          <PageCont>{butt_arr}</PageCont>
        </PagCont>
      )}
    </Cont>
  );
}
