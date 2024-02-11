import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEmailTermoUsoUseCase } from './get-email-termo-uso-use-case'

class GetEmailTermoUsoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.query
    const getEmaiTermoUsoUseCase = container.resolve(GetEmailTermoUsoUseCase)
    const termoUso = await getEmaiTermoUsoUseCase.execute(email as string)

    return response.status(termoUso.statusCode).json(termoUso.data)
  }
}

export { GetEmailTermoUsoController }
