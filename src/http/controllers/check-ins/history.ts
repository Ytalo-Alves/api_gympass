import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import MakeSearchGymsUseCase from "@/services/factories/make-search-gyms-use-case";
import MakeFetchUserCheckInsHistoryUseCase from "@/services/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistory = MakeFetchUserCheckInsHistoryUseCase();

  const {checkIns} = await fetchUserCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
