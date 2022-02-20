import {useContext, createContext, useState} from 'react';
import { themes } from './variables';


//the variables you want to provide to all the pages/components wrapped around this provider
const initialStates = {
    theme: "light",
    setTheme:()=>{}, 
    result:{},
    setResult:()=>{},
  
}

const MyContext = createContext(initialStates);

export default function AppProvider({children}){

    const [theme, setTheme] = useState(initialStates.theme);

    const [result,setResult] = useState({});
    //console.log("Result",result);
  
 
    return <MyContext.Provider value={{theme, setTheme,result,setResult}}>
        <style jsx global>
            {`
                body {
                    background-color: ${themes[theme].body};
                }
            `}
        </style>
        {children}
    </MyContext.Provider>
}

//use the Context to create Hooks like useTheme

export function useTheme(){
    const {theme, setTheme} = useContext(MyContext);    
    return {theme, setTheme}
}

//use the Context to create Hooks like useTheme
export function useResult(){
    const {result, setResult} = useContext(MyContext);
    return{result, setResult};
}

