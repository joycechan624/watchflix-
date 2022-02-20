import styled from "styled-components";
import ax from "axios";
import { useTheme } from "@/utils/provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Comment from "../Comment";

import { bkColor, hovColor, basicColor, divcolor } from "@/utils/variables";

const Cont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  width: 100%;
`;

const LeftLine = styled.div`
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  width: 15%;
  height: 20px;

  @media only screen and (min-width: 566px) and (max-width: 700px) {
    width: 20%;
  }

  @media only screen and (max-width: 565px) {
    width: 25%;
  }
`;

const RightLine = styled.div`
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  width: 60%;
  height: 20px;

  @media only screen and (min-width: 566px) and (max-width: 700px) {
    width: 50%;
  }

  @media only screen and (max-width: 565px) {
    width: 25%;
  }
`;

const TitleCont = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  width: 25%;
  box-sizing: border-box;
  
  @media only screen and (min-width: 566px) and (max-width: 700px) {
    width: 30%;
  }

  @media only screen and (max-width: 565px) {
    width: 50%;
  }
`

const Title = styled.h3`  
  color: ${props => props.color};
  
  @media only screen and (min-width: 566px) and (max-width: 700px) {
    font-size: 1.75em;   
  }

  @media only screen and (min-width: 396px) and (max-width: 565px) {
    font-size: 1.75em;
    text-align: center;
  }

  @media only screen and (max-width: 395px) {
    font-size: 1.25em;
  }
`;


const Divider = ({ 
    text = "Review",

}) => {

  const { theme, setTheme } = useTheme();

  return (
    <Cont>
        <LeftLine bkcolor = {divcolor[theme]}></LeftLine>
        <TitleCont>
          <Title color = {basicColor[theme]}>{text}</Title>
        </TitleCont>
        <RightLine bkcolor = {divcolor[theme]}></RightLine>
    </Cont>
  );
};

export default Divider;
