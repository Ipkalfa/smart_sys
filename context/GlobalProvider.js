import { createContext, useContext,useState,useEffect, Children } from "react";
import { getCurrentUser } from "../lib/appwrite";
// import { getDevicedata } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext =() => useContext(GlobalContext);


const GlobalProvider =({children}) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [measurement, setMeasurement] = useState(false)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if(res) {
                    setisLoggedIn(true);
                    setUser(res)
                }else{
                    setisLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setisLoading(false)
            })
    }, []);


    // useEffect(() => {
    //     getDevicedata()
    //         .then((res) => {
    //             if(res) {
    //                 setisLoggedIn(true);
    //                 setUser(res)
    //             }else{
    //                 setisLoggedIn(false)
    //                 setUser(null)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //         .finally(() => {
    //             setisLoading(false)
    //         })
    // }, []);


    return(
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setisLoggedIn,
                user,
                measurement,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;