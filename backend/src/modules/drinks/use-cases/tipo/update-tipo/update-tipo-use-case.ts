import { ITipoRepository } from '@modules/drinks/repositories/i-tipo-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateTipoUseCase {
  constructor(@inject('TipoRepository')
  private tipoRepository: ITipoRepository
  ) { }

  async execute({
    id,
    nome,
    descricao,
  }: IRequest): Promise<HttpResponse> {
    const tipo = await this.tipoRepository.update({
      id,
      nome,
      descricao,
    })

    return tipo
  }
}

export { UpdateTipoUseCase }

