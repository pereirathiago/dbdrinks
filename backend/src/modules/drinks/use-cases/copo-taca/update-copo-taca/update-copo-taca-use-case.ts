import { ICopoTacaRepository } from '@modules/drinks/repositories/i-copo-taca-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateCopoTacaUseCase {
  constructor(@inject('CopoTacaRepository')
  private copoTacaRepository: ICopoTacaRepository
  ) { }

  async execute({
    id,
    nome,
    descricao,
  }: IRequest): Promise<HttpResponse> {
    const copoTaca = await this.copoTacaRepository.update({
      id,
      nome,
      descricao,
    })

    return copoTaca
  }
}

export { UpdateCopoTacaUseCase }

