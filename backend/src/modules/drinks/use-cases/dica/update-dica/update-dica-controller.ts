import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDicaUseCase } from './update-dica-use-case'

class UpdateDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      drinkId,
      dica,
    } = request.body

    const { id } = request.params

    const updateDicaUseCase = container.resolve(UpdateDicaUseCase)

    const result = await updateDicaUseCase.execute({
      id,
      drinkId,
      dica,
    })
      .then(dicaResult => {
        return dicaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateDicaController }

