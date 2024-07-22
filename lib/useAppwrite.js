import { useState, useEffect } from "react";

const useAppwrite = (fn) =>{
    const [data, setData] = useState([]);
    const [isLooading, setisLooading] = useState(true);
  
    const fetchdata = async () => {
        setisLooading(true);
  
        try {
          const response = await fn();
  
          setData(response);
        } catch (error) {
          Alett.alert('Error',error.message)
        } finally{
          setisLooading(false);
        }
    }


    useEffect(() => {

      fetchdata();
    }, [])
    
    const refetch = () => fetchData();

    return{data, isLooading, refetch}
  
}

export default useAppwrite