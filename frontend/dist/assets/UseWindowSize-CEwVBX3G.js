import{l as i}from"./index-PR08W0D-.js";function w(){const[n,t]=i.useState({width:window.innerWidth,height:window.innerHeight});return i.useEffect(()=>{const e=()=>{t({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),n}export{w as U};