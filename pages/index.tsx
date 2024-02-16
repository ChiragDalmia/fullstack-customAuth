import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";


export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if (!session){
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      }
    }
  }

  return {props:{}}
}

export default function Home() {

  
  return (
    <>
    <Navbar />
    
    </>
  );
}
