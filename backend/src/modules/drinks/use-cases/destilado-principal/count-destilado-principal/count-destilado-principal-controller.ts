import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDestiladoPrincipalUseCase } from './count-destilado-principal-use-case'

class CountDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countDestiladoPrincipalUseCase = container.resolve(CountDestiladoPrincipalUseCase)

    const destiladoPrincipalCount = await countDestiladoPrincipalUseCase.execute({
      search: search as string
    })

    return response.status(destiladoPrincipalCount.statusCode).json(destiladoPrincipalCount)
  }
}

export { CountDestiladoPrincipalController }
