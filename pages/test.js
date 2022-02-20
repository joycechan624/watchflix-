import styled from "styled-components";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";

import { useRouter } from "next/router";
import { movie, filtering, sortArr } from "@/utils/combine";
import ax from "axios";
import { v4 as uuidv4 } from "uuid";
import { useResult } from "@/utils/provider";

import HMovieData from "@/comps/HMovie/index2";
import PosterBoxData from "@/comps/PosterBox/index2";
import HMovie from "@/comps/HMovie";
import PosterBox from "@/comps/PosterBox";
import PopUp from "comps/PopUp";

const Cont = styled.div`
  width: 100%;
  height: 100%;
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const Button = styled.button``;

var timer = null;

export default function Test() {
  const r = useRouter();

  const [data, setData] = useState([]);
  const [View, setView] = useState(false);
  const [sbr, setSbr] = useState(false);
  const [sbr_type, setSbrType] = useState("asc");
  const [clicked, setClicked] = useState(false);
  const { result, setResult } = useResult();

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
        setData(res.data);
        timer = null;
      }, 1000);
    }
  };

  const StoreResult = (clicked, item) => {
    console.log(clicked, item);

    if (clicked) {
      setClicked(true);
      console.log("clicked");
      const b_obj = {
        ...result,
      };

      b_obj[item.imdbId] = item;
      setResult(b_obj);
    } else {
      setClicked(false);
      const b_obj = {
        ...result,
      };

      delete b_obj[item.imdbId];
      setResult(b_obj);
    }
  };

  return (
    <Cont>
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
      
    {/*<Wrap>View ?(<HMovieData/>):(<PosterBoxData/>)</Wrap>*/}

      {View ? (
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
                r.push(`/result/${uuidv4()}`);
                (e) => StoreResult(e.target.clicked, item);
              }}
            />
          ))}
        </Wrap>
      ) : (
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
                r.push(`/result/${uuidv4()}`);
                (e) => {
                  return StoreResult(e.target.clicked, item);
                };
              }}
            />
          ))}
        </Wrap>
      )}
    </Cont>
  );
}

