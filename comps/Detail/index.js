import Head from "next/head";
import ax from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";
import { bkColor, themes } from "@/utils/variables";
import DetailTit from "@/comps/DetailTit";

const Cont = styled.div`
  width: ${(props) => props.conWidth};
  display: flex;
  flex-direction: row;
  justify-contents: center;
  align-items: space-between;

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    flex-direction: column;
  }
`;

const PostCont = styled.div`
  width: ${(props) => props.picConWidth};
  height: ${(props) => props.picConHeight};
  min-width: 424px;
  min-height: 594px;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: flex-start;
  margin-right: 2rem;
  box-sizing: border-box;
  flex: 1;

  @media only screen and (min-width: 425px) and (max-width: 950px) {
    align-items: center;
    margin-bottom: 50px;
    margin-right: 0;
  }

  @media only screen and (min-width: 1px) and (max-width: 424px) {
    align-items: center;
    margin-bottom: 50px;
    width: 360px;
    height: 506px;
  }
`;

const Post = styled.img`
  width: auto;
  height: 100%;

  display: block;
  src: ${(props) => props.src};
  object-fit: ${(props) => props.fit};

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    min-width: 360px;
    min-height: 594px;
  }
`;

const DetailCont = styled.div`
  width: ${(props) => props.detConWidth};
  min-height: ${(props) => props.detConHeight};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: flex-start;
  background-color: ${(props) => props.bkColor};
  border-radius: 20px;
  box-sizing: border-box;
  flex: 2;

  @media only screen and (min-width: 1px) and (max-width: 950px) {
    width: ${(props) => props.mdetConWidth};
    min-height: 0;
  }
`;

const Detail = ({
  conWidth = "100%",
  picConWidth = "auto",
  picConHeight = "596px",
  src = "http://placekitten.com/297/397",
  fit = "cover",
  alt = "Undifined",
  detConWidth = "60%",
  mdetConWidth = "100%",
  title = "undifined",
  director = "undifined",
  genre = "undifined",
  cast = "undifined",
  description = "undifined",
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <Cont width={conWidth}>
      <PostCont picConWidth={picConWidth} picConHeight={picConHeight}>
        <Post src={src} fit={fit} alt={alt} />
      </PostCont>

      <DetailCont
        detConWidth={detConWidth}
        detConHeight={picConHeight}
        mdetConWidth={mdetConWidth}
        bkColor={bkColor[theme]}
      >
        <DetailTit movieTitle={title} />
        <DetailTit
          title="Director"
          movieTitle=""
          text={director}
          conAlign="flex-start"
        />
        <DetailTit
          title="Genre"
          movieTitle=""
          text={genre}
          conAlign="flex-start"
        />
        <DetailTit
          title="Cast"
          movieTitle=""
          conAlign="flex-start"
          text={cast}
          clamp = '3'
        />
        <DetailTit
          title="Synopsys"
          conAlign="flex-start"
          movieTitle=""
          text={description}
          clamp = '10'
        />
      </DetailCont>
    </Cont>
  );
};

export default Detail;
