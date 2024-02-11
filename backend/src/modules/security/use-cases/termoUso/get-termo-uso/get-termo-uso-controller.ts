import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTermoUsoUseCase } from './get-termo-uso-use-case'

class GetTermoUsoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getTermoUsoUseCase = container.resolve(GetTermoUsoUseCase)
    const termoUso = await getTermoUsoUseCase.execute(id)

    return response.status(termoUso.statusCode).json(termoUso.data)
  }
}

export { GetTermoUsoController }
