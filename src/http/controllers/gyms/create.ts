import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import MakeCreateGymUseCase from "@/services/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value)<= 90;
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value)<= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body);

  
    const createGym = MakeCreateGymUseCase()

    await createGym.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
  

  return reply.status(201).send();
}