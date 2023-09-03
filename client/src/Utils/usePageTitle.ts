import { useEffect } from "react";

function usePageTitle(title: string): void {
    useEffect(() => {
        window.document.title = title;
    }, []);
}


export default usePageTitle;