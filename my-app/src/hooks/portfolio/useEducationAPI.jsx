import { useState, useEffect } from 'react';
import Axios from "axios";

const pathUrl = "https://testdockerprod123.herokuapp.com/public/education"

const useEducationAPI = (user) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    const source = Axios.CancelToken.source();
    
    (async () => {
      try{
        const response = await Axios.get(`${pathUrl}/${user}`)
        const data = response?.data;
        if(data) setData(data);
        setLoading(false);
        console.log(data)
      }
      catch(err){
        console.log(err)
        setError(true);
        setLoading(false);
      }
    })()

    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };
  }, [user])


  return { data, loading, error }
}

export default useEducationAPI;