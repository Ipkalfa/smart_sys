import { useState, useEffect } from "react";
import { Alert } from "react-native";

const UseAppwrite = (fn) =>{
    const [data, setData] = useState([]);
    const [isLooading, setisLooading] = useState(true);
  
    const fetchdata = async () => {
        setisLooading(true);
  
        try {
          const response = await fn();
  
          setData(response);
        } catch (error) {
          Alert.alert('Error',error.message)
        } finally{
          setisLooading(false);
        }
    }


    useEffect(() => {

      fetchdata();
    }, [])
    
    const refetch = () => fetchdata();

    return{data, isLooading, refetch}
  
}

export default UseAppwrite