import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { data, useParams } from 'react-router-dom'

const SinglePage = () => {

  const {id} = useParams();

  const getData = async() => await axios.get(`https://dummyjson.com/products/${id}`)

  const {data, isLoading, error} = useQuery({
    queryKey: ["products", id],
    queryFn: getData,
    staleTime: 60 * 1000 * 5,
  })

  // const singleProduct = data.data  

  return (
    <div>SinglePage</div>
  )
}

export default SinglePage