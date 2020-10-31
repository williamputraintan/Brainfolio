import React, {useState,useEffect} from 'react'
import Axios from "axios";


const baseUrl = "https://testdockerprod123.herokuapp.com"

const useCheckUsername = (path,body) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setError(false);
    setLoading(true);
    const source = Axios.CancelToken.source();
    

    if(body?.length > 5 ){
      Axios
      .post( path, {username: body})
        .then(({data}) => {
          if(data){
            setData(data);
          } 
          setLoading(false);
        })
        .catch(err => {
          console.log(err)
          setError(true);
          setLoading(false);
        })
      
    }else{
      setError(true)

    }

    return () => {
      source.cancel(
        "Canceled because of component unmounted"
      );
    };

  }, [body])


  return { data, loading, error }
} 

export default useCheckUsername;