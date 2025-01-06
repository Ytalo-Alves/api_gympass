import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import MakeCreateGymUseCase from "@/services/factories/make-create-gym-use-case";
import MakeCheckInUseCase from "@/services/factories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createCheckInParamsSchema = z.object({
    gymId: z.string()
  })


  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value)<= 90;
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value)<= 180;
    }),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);
  const { gymId } = createCheckInParamsSchema.parse(request.params);

  
    const checkInUseCase = MakeCheckInUseCase()

    await checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    });
  

  return reply.status(201).send();
}
