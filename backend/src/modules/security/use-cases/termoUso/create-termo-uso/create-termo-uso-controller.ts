import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { CreateTermoUsoUseCase } from './create-termo-uso-use-case'

class CreateTermoUsoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      ip,
      modeloDispositivo
    } = request.body

    const createTermoUsoUseCase = container.resolve(CreateTermoUsoUseCase)

    const result = await createTermoUsoUseCase.execute({
      userId,
      ip,
      modeloDispositivo
    })
      .then(termoUsoResult => {
        return termoUsoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateTermoUsoController }
