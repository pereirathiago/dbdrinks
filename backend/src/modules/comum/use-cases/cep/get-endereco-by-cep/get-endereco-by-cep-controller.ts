import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEnderecoByCepUseCase } from './get-endereco-by-cep-use-case'

class GetEnderecoByCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const cep = request.params.cep
    const getEnderecoCepUseCase = container.resolve(GetEnderecoByCepUseCase)
    const cepInfo = await getEnderecoCepUseCase.execute(cep)

    return response.status(cepInfo.statusCode).json(cepInfo.data)
  }
}

export { GetEnderecoByCepController }
