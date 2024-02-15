import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDrinkUseCase } from './update-drink-use-case'

class UpdateDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome, 
      descricao,
      categoriaId,
      copoTacaId, 
      destiladoPrincipalId, 
      grupoId, 
      tipoId,
    } = request.body

    const { id } = request.params

    const updateDrinkUseCase = container.resolve(UpdateDrinkUseCase)

    const result = await updateDrinkUseCase.execute({
      id,
      nome, 
      descricao,
      categoriaId,
      copoTacaId, 
      destiladoPrincipalId, 
      grupoId, 
      tipoId,
    })
      .then(drinkResult => {
        return drinkResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateDrinkController }

