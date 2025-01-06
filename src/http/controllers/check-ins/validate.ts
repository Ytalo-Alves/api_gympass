import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import MakeCreateGymUseCase from "@/services/factories/make-create-gym-use-case";
import MakeCheckInUseCase from "@/services/factories/make-check-in-use-case";
import MakeValidateCheckInUseCase from "@/services/factories/make-validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {

  const validateCheckInParamsSchema = z.object({
    checkInId: z.string()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  
    const validateCheckInUseCase = MakeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
      checkInId
    });
  

  return reply.status(204).send();
}
