import ax from "axios";
import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useTheme, useResult } from "@/utils/provider";
import { hovBttnColor, themes, bgpopup, basicColor, hovpopbg, hBttnBkColor } from "@/utils/variables";


const Cont = styled.div`
  width: 3em;
  height: 3em;
  margin-right: 10px;
  :last {
    margin-right: 0px;
  }
`

const Btn = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  border:none;
  border-radius: 50%;  
  background-color:${(props)=>props.bgcolor};
  color: ${props => props.color};
  cursor: pointer;
  
  :hover{
    background:${(props)=>props.hovpopbg};
    color: ${props => props.hovcolor};
  }

  :active{
    background-color: ${(props)=>props.actpopbg};
  }
`
const PageBttn = ({
  btnnumber= null,
  bgcolor = null,
  onClick=()=>{},
})=>{

  const { theme, setTheme } = useTheme();
  
  return<Cont>
    <Btn 
      onClick={onClick}
      bgcolor={bgcolor}
      color = {basicColor[theme]}
      hovpopbg={hBttnBkColor[theme]}
      actpopbg={hBttnBkColor[theme]}
      hovcolor = {basicColor[theme]}
    >{btnnumber}</Btn>

  </Cont>
}

export default PageBttn