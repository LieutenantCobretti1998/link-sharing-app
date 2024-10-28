import {useEffect, useState} from "react";

function UseWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    useEffect(() => {
        const handleSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleSize);
        return () => window.removeEventListener('resize', handleSize);
    }, [])
    return windowSize;
}

export default UseWindowSize;