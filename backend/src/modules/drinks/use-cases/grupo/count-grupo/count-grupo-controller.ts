import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountGrupoUseCase } from './count-grupo-use-case'

class CountGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countGrupoUseCase = container.resolve(CountGrupoUseCase)

    const categoriaCount = await countGrupoUseCase.execute({
      search: search as string
    })

    return response.status(categoriaCount.statusCode).json(categoriaCount)
  }
}

export { CountGrupoController }
