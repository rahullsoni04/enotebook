import React,{useState} from 'react'
import AlertContext from './alertContext'

const AlertState = (props) => {

    const [data,setData] = useState({msg:null,type:"success"})
    const showAlert = (msg,type) => {
        setData({msg,type})
        setTimeout(() => {
            setData({msg:null,type:"success"})
        }, 2000);
    }

  return (
    <AlertContext.Provider value={{msg : data.msg,type:data.type,showAlert:showAlert}}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState