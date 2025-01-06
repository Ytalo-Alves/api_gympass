import { app } from "@/app";

import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function gymsRoutes(){


 app.get('/gyms/search', { onRequest: [verifyJwt] }, search)
 app.get('/gyms/nearby', nearby)

 app.post('/gyms', { onRequest: [verifyJwt] },  create)
}

