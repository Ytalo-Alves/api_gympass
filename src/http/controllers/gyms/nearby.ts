import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import MakeFetchNearbyGymsUseCase from "@/services/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value)<= 90;
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value)<= 180;
    }),
  });

  const { latitude, longitude} = searchGymsQuerySchema.parse(request.query);

  
    const fetchNearbyGymsUseCase = MakeFetchNearbyGymsUseCase()

    const {gyms} = await fetchNearbyGymsUseCase.execute({
     userLatitude: latitude,
     userLongitude: longitude
    });
  

  return reply.status(200).send({ gyms });
}
