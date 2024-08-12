import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    //using Hooks to print he prompt output to main display

    const [input,setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts,setprevPrompts] = useState([])
    const [showResult,setshowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [resultData,setresultData] = useState("")

    const delayPara = (idx,nextWord) =>{
        setTimeout(function (){
            setresultData(prev => prev+nextWord)
        },75*idx)
    }

    //new Chat function

    const newChat = () => {
        setLoading(false)
        setshowResult(false)
    }



    const onSent = async (prompt) =>{

        setresultData("")
        setLoading(true)
        setshowResult(true)
        let response
        if (prompt != undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setprevPrompts(prev => [...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        
        let responseArray = response.split("**")
        let newResponse = "" ;
        for (let i = 0;i < responseArray.length;i++)

        {
            if(i===0 || i%2 !==1 ){
                  newResponse += responseArray[i]
            }

            else{
                newResponse += "<b>" +responseArray[i] + "</b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i< newResponseArray.length;i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord + " ") 
        }
        setLoading(false)
        setInput("")
    }

  //  onSent("Manchester United,best manager")    CALLING THIS FUNCTION GIVES THE ANSWER OF THE OUTPUT
    
    

    const contextVal = {
        prevPrompts,
        setprevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


    }

    return( <Context.Provider value = {contextVal}>
        {props.children}
    </Context.Provider>
    )

}

export default ContextProvider