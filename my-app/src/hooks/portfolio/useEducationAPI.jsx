import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user.context';
import Axios from "axios";

const pathUrl = "http://localhost:5000"+"/public/education"

const useEducationAPI = (user) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const {state} = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${state.token}` }
  };
  useEffect(() => {
    setError(false);
    setLoading(true);
    const source = Axios.CancelToken.source();
    
    (async () => {
      try{
        const response = await Axios.get(`${pathUrl}/${user}`, config)
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