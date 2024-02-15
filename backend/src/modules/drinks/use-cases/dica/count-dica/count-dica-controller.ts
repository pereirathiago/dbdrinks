import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDicaUseCase } from './count-dica-use-case'

class CountDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countDicaUseCase = container.resolve(CountDicaUseCase)

    const categoriaCount = await countDicaUseCase.execute({
      search: search as string
    })

    return response.status(categoriaCount.statusCode).json(categoriaCount)
  }
}

export { CountDicaController }
