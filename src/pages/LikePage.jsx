import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const LikePage = () => {
  const getProducts = async()=>{
    return await axios.get(`https://dummyjson.com/products`)
  }

  const {data, isloading, error} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts, 
    staleTime: 60*1000 
  })

  console.log(data);

  if(isloading){
    return <div>Loading...</div>
  }
  

  return (
    <div>LikePage</div>
  )
}

export default LikePage