import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { SiGooglegemini } from "react-icons/si";
import { FaUserAstronaut } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaImage } from "react-icons/fa";
const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
  return (
    


    <div className="main">

      <div className="nav">

        <p>My AI</p>
        <FaUserAstronaut color='green' />
        
      </div>
      <div className="main-container">

        {
          !showResult ?
          <>
        <div className="greet">
          <p><span>Hello, Developer</span></p>
          <p>How Can I Help You</p>
        </div>


        <div className="cards">
          <div className="card">
            <p>
             Build a Program to build all aspects and functionalities of a StartUP Project
            </p>
            <FaCode color='purple' className='logo'/>
          </div>

          <div className="card">
            <p>
              India @ Olympics, Manu Bhaker, Neeraj Chopra shines...
            </p>
            <FaRegNewspaper color='red' className='logo'/>
          </div>

          <div className="card">
            <p>
              Build a network to get Awesome Chances to meet and greet people
            </p>
            <MdConnectWithoutContact color='blue' className='logo'/>
          </div>

          <div className="card">
            <p>
              Generate Image Description flawlessly
            </p>
            <FaImage color='magenta' className='logo'/>
          </div>
        </div>
          
          </>

          : <div className='result'> 
              <div className="result-title">
                <img src="" alt="" />
                <p>{recentPrompt}</p>
             </div>

            <div className="result-data">
              <img src="" alt="" />
              {loading ? <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
              </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
              
            
            </div>
          </div>

        }
        

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) =>setInput(e.target.value)} value={input} type="text" placeholder='Whats on Your Mind..?' />
            <div>
              
              {input?<IoMdSend className='click' onClick={() => onSent()}  alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            My AI may display possible error messages, please check or verify original data source(Powered by <a href='https://ai.google.dev/'> Gemini API</a>)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main