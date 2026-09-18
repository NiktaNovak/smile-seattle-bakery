import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop(){
    const path = useLocation();
    useEffect( () =>{
        window.scrollTo({top: 0 , left: 0, behavior:"instant"});
    }, [path])
    return null;
}
export default ScrollToTop;