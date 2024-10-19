// import { createContext, useState } from "react";
// import run from "../Config/Gemini";

// export const Context=createContext();

// const ContextProvider= (props)=>{

//     const [input,setInput] = useState("");
//     const [recentPrompt,setRecentPrompt] = useState("");
//     const [prevPrompt,setPrevPrompt] = useState([]);
//     const[showResult,setShowResult] = useState(false);
//     const[loading,setLoading] = useState(false);
//     const[resultData,setResultData]=useState("");

//     const displayPara = (index,nextWord) => {
//         setTimeout(() => {
//             setResultData(prev =>prev+nextWord);
//         },75*index);
//     }


//     const onSent= async (prompt) => {
//         setResultData("")
//         setLoading(true)
//         setShowResult(true)
//         let response;
//         if(prompt !== undefined){
//             response = await run(prompt);
//             setRecentPrompt(prompt)
//         }
//         else{
//             setPrevPrompt(prev=>[...prev,input])
//             setRecentPrompt(input)
//             response = await run(input)
//         }
         
//          let responseArray=response.split("**");
//          let newResponse="";
//          for(let i=0; i<responseArray.length; i++)
//         {
//             if(i==0 || i%2 !==1){
//                 newResponse+=responseArray[i];
//             }
//             else{
//                 newResponse+="<b>"+responseArray[i]+"</b>";
//             }
//          }
//          let newResponse2=newResponse.split("*").join("</br>")

//          let newResponseArray= newResponse2.split(" ");
//          for(let i=0; i<newResponseArray.length;i++)
//         {
//             const nextWord=newResponseArray[i];
//             displayPara(i,nextWord+" ")
//          }
//          setLoading(false)
//          setInput("")
//     }


//     const contextValue ={
//         prevPrompt,
//         setPrevPrompt,
//         onSent,
//         setRecentPrompt,
//         recentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput
//     }
//     return(
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider



import { createContext, useState } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]); // Ensure consistent naming
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  //existing recent history
  const displayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

// new chat
const newChat = () => {
    setLoading(false)
    setShowResult(false)
}

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    
    let response;
    if (prompt) {
      response = await run(prompt);
      setRecentPrompt(prompt);
      setPrevPrompts((prev) => [...prev, prompt]); // Update prompt history
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      displayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;