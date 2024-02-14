/*SWR is a vercel developed package it is similar to reactQuery, so whenever we use this hook it is not going to fetch the data again if the data already exists, bascically it removes the need for the use of redux or any state management toolkits (Which is super cool) */

import fetcher from "@/lib/fetcher";
import useSWR from "swr";


const useCurrentUser =()=>{
  const {data, error,isLoading, mutate}= useSWR('/api/current', fetcher)
  return {data, error,isLoading, mutate}
}

export default useCurrentUser;