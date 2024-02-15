import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountLinkUseCase } from './count-link-use-case'

class CountLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countLinkUseCase = container.resolve(CountLinkUseCase)

    const categoriaCount = await countLinkUseCase.execute({
      search: search as string
    })

    return response.status(categoriaCount.statusCode).json(categoriaCount)
  }
}

export { CountLinkController }
