import {useEffect, useRef} from 'react'

function useWillUnmount(fn){
  
  const functionRef = useRef(fn)
  functionRef.current = fn
  
  useEffect(()=> {
    
   retrun ()=> functionRef.current() 
  },[])
  
