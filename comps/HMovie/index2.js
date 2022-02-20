import HMovie from './index';
import {useState,useEffect} from 'react';
import {movie, filtering, sortArr} from '@/utils/combine';
import styled from 'styled-components';

const Cont = styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
`
function HMovieData(
  onClick=()=>{},
){
  
  const [data, setData] = useState(movie);

  return(
    <Cont>
      {
        data.map((item)=><HMovie 
        title={item.Title} 
        alt={item.Title}
        year={item.release_year}
        src={item.Poster}
        place={item.country}
        text={item.description}
        onClick={onClick}
        />)
      }
    </Cont>
  )
}

export default HMovieData;