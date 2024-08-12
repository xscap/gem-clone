import React,{useContext, useState} from 'react'
import './sidebar.css'

import { FaPlus } from "react-icons/fa";
import { Context } from '../../context/Context'
import { LuMessagesSquare } from "react-icons/lu";
import { SiGooglegemini } from 'react-icons/si';
import { IoIosHelpCircle } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {

    const[extended,setExtended] = useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)

    const loadPrompt = async(prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }


  return (
    <div className='sidebar'>

        <div className="top">
            <SiGooglegemini onClick={()=> setExtended(prev => !prev)} className = "menu"  alt="" />
            <div onClick={() => newChat()} className="new-chat">
                <FaPlus className='msgsquare'/>
                {extended ?<p>New Chat</p>:null}
            </div>

            {extended ?
            <div className="recent">
                <p className="recent-title">Recent</p>

                {prevPrompts.map((item,index)=>{
                     return (
                        <>
                        <div onClick={() => loadPrompt(item)} className="recent-entry">
                        
                        <LuMessagesSquare/>
                        <p>{item.slice(0,18)}...</p>
                    </div>
                    </>
                     )
                }) }
                
            </div>
            :null
            }
        </div>

        <div className="bottom">
            <div className="bottom-item recent-entry">
                <IoIosHelpCircle color='black'/>
               {extended ? <p>Help</p> : null}
            </div>

            <div className="bottom-item recent-entry">
                <FaHistory color='black'/>
                {extended ? <p>Activities</p> : null}
            </div>

            <div className="bottom-item recent-entry">
                <IoSettingsOutline color='black' />
                {extended ? <p>Settings</p> : null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar