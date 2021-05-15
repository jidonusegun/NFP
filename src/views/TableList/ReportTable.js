import React, { useState, useEffect, useContext } from "react";
// components
import {getContent} from 'utils';
import { dataContext } from 'components/context/DataContext';
import NewAggregator from 'views/Report/NewlyRegisteredAggregators';
import NewCook from 'views/Report/NewlyRegisteredCooks';
// core components

export default function TableList() {
  // const { token } = useContext(dataContext);
  const [cook, setCook] = useState([])
  const [aggregator, setAggregator] = useState([]) 
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const baseUrl = localStorage.getItem("baseUrl")

  useEffect(() => {
    setLoading(true);
      getContent(`${baseUrl}/`, token)
      .then(data=>setCook(data.data))

    getContent(`${baseUrl}/`, token)
    .then(data=>setAggregator(data.data))
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? <div>Loading... Please wait</div> : <NewAggregator aggregatorsList={aggregator} />}
      {loading ? <div>Loading... Please wait</div> : <NewCook cooksList={cook} />}
    </div>
  );
}
