import Head from 'next/head';
import ax from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import { useItems, useTheme } from "@/utils/provider";


export default function Books() {
  
  const router = useRouter();
  // const { theme, setTheme } = useTheme();

  return (
    <div>
      
      <button onClick={()=>{
        //make a new fav list!
      }}>New Favs</button>

    </div>
  )
}
