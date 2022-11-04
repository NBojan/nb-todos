import { useEffect } from "react";

const Alert = ({alert, buildAlert}) => {
    const {type, msg} = alert;
    
    useEffect(() => {
        let timer = setTimeout(() => buildAlert(),1000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [alert])

    return (
        <p className={`alert mb-16 uppercase l-spacing-12 alert-${type}`}>{msg}</p>   
    );
}
 
export default Alert;