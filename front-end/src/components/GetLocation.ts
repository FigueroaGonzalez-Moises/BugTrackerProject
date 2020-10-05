import { useLocation } from "react-router-dom";

export const GetLocation = () => {
    let location = useLocation();
    let id = location.pathname;
    let tmp: any = id.split(':');
    id = tmp[1];
    return id;
}