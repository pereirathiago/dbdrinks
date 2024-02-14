import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountTipoUseCase } from './count-tipo-use-case'

class CountTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countTipoUseCase = container.resolve(CountTipoUseCase)

    const tipoCount = await countTipoUseCase.execute({
      search: search as string
    })

    return response.status(tipoCount.statusCode).json(tipoCount)
  }
}

export { CountTipoController }
