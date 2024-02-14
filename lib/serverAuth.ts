import { NextApiRequest } from "next";

import prismadb from '@/lib/prismadb';
import { getSession } from "next-auth/react";


const serverAuth = async(req: NextApiRequest)=>{
  const session = await getSession({ req});

  if (!session?.user?.email){
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where:{
      email: session.user.email,
    }
  });

  if (!currentUser){
    throw new Error('Not SignedIn');
  }

  return {currentUser};

};

export default serverAuth;
