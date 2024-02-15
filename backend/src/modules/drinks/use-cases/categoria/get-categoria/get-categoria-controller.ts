import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCategoriaUseCase } from './get-categoria-use-case'

class GetCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCategoriaUseCase = container.resolve(GetCategoriaUseCase)
    const categoria = await getCategoriaUseCase.execute(id)

    return response.status(categoria.statusCode).json(categoria.data)
  }
}

export { GetCategoriaController }
