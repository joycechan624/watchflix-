import ax from "axios";
import * as React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/provider";
import {
  bkColor,
  themes,
  basicColor,
  imgBKColor,
  bttnBkColorH,
  hovBkColor,
  hovPColor,btnColor,
  hBttnBkColor,
} from "@/utils/variables";
import { movie } from "@/utils/combine";

const Cont = styled.div`
  max-width: 594px;
  max-height: 440px;
  display: flex;
  flex-direction: row;
  margin-right: 50px;
  padding-bottom: 2rem;
  box-sizing: border-box;

  :nth-child(2n) {
    margin-right: 0px;
  }

  @media only screen and (min-width: 601px) and (max-width: 1255px) {
    margin-right: 0;
  }

  @media only screen and (min-width: 1px) and (max-width: 600px) {
    width: 100%;
    // max-height: 220px;
    margin-right: 0;
    flex-direction: column;
  }
`;

const Img = styled.img`
  width: ${(props) => props.imgWidth};
  height: ${(props) => props.imgHeight};
  min-height: 406px;
  display: block;
  src: ${(props) => props.src};
  object-fit: ${(props) => props.fit};
  flex: 1;
  // background-color: ${(props) => props.imgBkColor};
  overflow: hidden;
  background-image: url('./images/img_NoImage.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media only screen and (min-width: 1px) and (max-width: 600px) {
    width: 100%;
    max-height: 240px;
    min-height: 220px;
    background-position: top 0%;
    object-fit: cover;
  }
`;

const DescCont = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
  padding: 1.5rem;
  position: relative;
  box-sizing: border-box;

  :hover {
    background-color: ${(props) => props.bkColor};
  }

  :hover .hoverTxt {
    color: ${(props) => props.hText};
  }

  :hover .hovBttn {
    background-color: ${(props) => props.hovBnColor};
    color: ${(props) => props.hovBTxtColor};
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    border-radius: 0;
  }
`;
const Top = styled.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
  }
  @media only screen and (min-width: 600px) {
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
  }
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-contents: flex-start;
`;

const Title = styled.h3`
  margin-bottom: 1em;
  color: ${(props) => props.color};

  @media only screen and (max-width: 600px) {
    width: 95%;
    font-size: 20px;
    margin-bottom: 0.5em;
  }
`;
const SubText = styled.p`
  width: 95%;
  font-size: 16px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.color};

  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const Desc = styled.p`
  color: ${(props) => props.color};
  @media only screen and (min-width: 600px) {
    padding: 0.8rem;
    -webkit-line-clamp: 8;
  }

  @media only screen and (max-width: 600px) {
    width: 95%;
    height: 120px;
    font-size: 12px;
    padding: 0.3rem;
    overflow: hidden;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const BtnCont = styled.div`
  width: 90%;
  display: flex;
  justify-content: right;
  position: absolute;
  bottom: 3em;
  right: 3em;

  @media only screen and (max-width: 600px) {
    bottom: 2em;
    right: 2em;
  }
`;

const Btn = styled.button`
  width: 50%;
  min-width: 150px;
  height: 50px;
  padding: 5px 10px;
  color: ${props => props.color};
  background-color: ${(props) => props.bttnBkColor};
  text-transform: uppercase;
  border-radius: 50px;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.hovBkColor};
    color: ${(props) => props.hovColor};
    transform: scale(0.95);
    transition-duration: 0.3s;
  }

  @media only screen and (max-width: 600px) {
    max-width: 30px;
    max-height: 30px;
    font-size: 12px;
    // background-color: ${(props) => props.bkColor};
    text-transform: uppercase;
    border-radius: 50px;
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

const HMovie = ({
  conWidth = "594px",
  imgWidth = "297px",
  imgHeight = "auto",
  src = "http://placekitten.com/297/397",
  fit = "cover",
  alt = "Undifined",
  year = "Undefined",
  place = "Undefined",
  text = "Movie description",
  bttnTxt = "check this movie",
  title = "Undefined",
  hText = "#000",
  hovBttnColor = "#333333",
  onClick = () => {},
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <Cont>
      <Img
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        src={src}
        fit={fit}
        alt={alt}
        imgBkColor={imgBKColor[theme]}
      />

      <DescCont
        hText={hText}
        width={conWidth}
        bkColor={bkColor[theme]}
        hovBnColor={bttnBkColorH[theme]}
        hovBTxtColor={btnColor[theme]}
      >
        <Top>
          <Title className="hoverTxt" color={basicColor[theme]}>
            {title}
          </Title>
          <SubWrap>
            <SubText className="hoverTxt" color={basicColor[theme]}>
              {year}
            </SubText>
            <SubText className="hoverTxt" color={basicColor[theme]}>
              {place}
            </SubText>
          </SubWrap>
        </Top>
        <Desc color={basicColor[theme]} className="hoverTxt">
          {text}
        </Desc>
        <BtnCont>
          <Btn
            className="hovBttn"
            color={basicColor[theme]}
            hovBttnColor={hovPColor[theme]}
            bttnBkColor={hBttnBkColor[theme]}
            hovBkColor={hovBkColor[theme]}
            hovColor={hovPColor[theme]}
            onClick={onClick}
          >
            {bttnTxt}
          </Btn>
        </BtnCont>
      </DescCont>
    </Cont>
  );
};

export default HMovie;
