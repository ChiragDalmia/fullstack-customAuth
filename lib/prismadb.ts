// prisma with next js cretes multiple instances on any updates so we use this logic to bypass that

//this basically checks if there is an existing instance of prisma db if there is default to that or create new client

//global.prismadb is declared in global.t.ts

import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;