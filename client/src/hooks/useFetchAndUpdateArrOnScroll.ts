import { useEffect, useRef } from "react"
import useIsInViewport from "./useIsInViewport"
import useDebounce from "./useDebounce"

export function useFetchAndUpdateArrOnScroll<T>( arr: T[], toCall: Function){
    const lastRef = useRef<HTMLDivElement>(null)
    const endInViewport = useIsInViewport(lastRef)
    const skipForFetch = useDebounce(arr.length)
  
    useEffect(() => {
      if(!endInViewport) return
      if(arr.length !== skipForFetch) return
       toCall()
    }, [skipForFetch, endInViewport, arr.length, toCall])
  
  
    return {
      lastRef
    }
  }