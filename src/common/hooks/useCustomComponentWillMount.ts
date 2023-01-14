import {useEffect, useRef} from "react";

export const useCustomComponentWillMount = (callback: () => void): void => {
    const mounted = useRef(false)
    if (!mounted.current) callback()
    useEffect(() => {
        mounted.current = true
    }, []);

}