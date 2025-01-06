import { FastifyReply, FastifyRequest } from "fastify";
import MakeGetUserMetricsUseCase from "@/services/factories/make-get-user-matrics-use-case";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {

  const getUserMetricsUseCase = MakeGetUserMetricsUseCase();

  const {checkInsCount} = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
