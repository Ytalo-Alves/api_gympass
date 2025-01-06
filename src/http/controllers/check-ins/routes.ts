import { app } from "@/app";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function checkInsRoutes(){

 app.get('/check-ins/history', { onRequest: [verifyJwt] }, history)
 app.get('/check-ins/metrics', { onRequest: [verifyJwt] }, metrics)

 app.post('/gyms/:gymId/check-ins', { onRequest: [verifyJwt] },  create)
 app.patch('/check-ins/:checkInId/validate', validate)
}

