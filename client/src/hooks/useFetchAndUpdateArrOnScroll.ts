import { useEffect, useRef, useState } from "react"
import useIsInViewport from "./useIsInViewport"
import useDebounce from "./useDebounce"

export function useFetchAndUpdateArrOnScroll<T>( arr: T[], toCall: Function){
    const lastRef = useRef<HTMLDivElement>(null)
    const endInViewport = useIsInViewport(lastRef)
    const skipForFetch = useDebounce(arr.length)
    const [alreadyCalled, setAlreadyCalled] = useState(false)
  
    useEffect(() => {
      if(!endInViewport || alreadyCalled) return
      setAlreadyCalled(true)
       toCall()
    }, [skipForFetch, endInViewport, arr.length, toCall, alreadyCalled])
    
    useEffect(() => {
      if (!endInViewport) {
        setAlreadyCalled(false)
      }
    }, [endInViewport])
  
    return {
      lastRef
    }
  }