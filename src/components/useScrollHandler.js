import { useState, useEffect } from "react"

export default function useScrollHandler(){
// setting initial value to true
const [scroll, setScroll] = useState(1)

// running on mount
useEffect(() => {
  const onScroll = () => {
    const scrollCheck = window.scrollY < 1
    if (scrollCheck !== scroll) {
      setScroll(scrollCheck)
    }
  }

// setting the event handler from web API
document.addEventListener("scroll", onScroll)

// cleaning up from the web API
 return () => {
   document.removeEventListener("scroll", onScroll)
   console.log("scroll detected")
  }
}, [scroll, setScroll])

return scroll

}