import React from 'react'
import { useContext } from 'react'
import {TitleColorContext} from '../context/TitleColorContext'

export const useTitleColorContext = () => {

    const context = useContext(TitleColorContext)

    if(!context){
        console.log('useTitleColorContext must be used inside a TitleColorContextProvider')
    }

  return context
  
}

export default useTitleColorContext
