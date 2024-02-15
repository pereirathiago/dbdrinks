import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDicaUseCase } from './get-dica-use-case'

class GetDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDicaUseCase = container.resolve(GetDicaUseCase)
    const dica = await getDicaUseCase.execute(id)

    return response.status(dica.statusCode).json(dica.data)
  }
}

export { GetDicaController }
