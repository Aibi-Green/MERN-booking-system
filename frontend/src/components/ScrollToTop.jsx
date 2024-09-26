import { useEffect } from "react";
import { useLocation } from 'react-router-dom'

export const ScrollToTop = () => {
    // Extracts the pathname property (key) from an obj
    const { pathname } = useLocation();

    // scrolls to top ehenever the pathname changes
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
}