import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDicaUseCase } from './id-select-dica-use-case'

class IdSelectDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDicaUseCase = container.resolve(IdSelectDicaUseCase)

    const dica = await idSelectDicaUseCase.execute({
      id: id as string
    })

    return response.json(dica.data)
  }
}

export { IdSelectDicaController }
