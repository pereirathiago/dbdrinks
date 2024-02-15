import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCategoriaUseCase } from './count-categoria-use-case'

class CountCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCategoriaUseCase = container.resolve(CountCategoriaUseCase)

    const categoriaCount = await countCategoriaUseCase.execute({
      search: search as string
    })

    return response.status(categoriaCount.statusCode).json(categoriaCount)
  }
}

export { CountCategoriaController }
