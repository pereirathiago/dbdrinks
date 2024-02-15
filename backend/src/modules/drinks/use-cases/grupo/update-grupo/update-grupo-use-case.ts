import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateGrupoUseCase {
  constructor(@inject('GrupoRepository')
  private grupoRepository: IGrupoRepository
  ) { }

  async execute({
    id,
    nome,
    descricao,
  }: IRequest): Promise<HttpResponse> {
    const grupo = await this.grupoRepository.update({
      id,
      nome,
      descricao,
    })

    return grupo
  }
}

export { UpdateGrupoUseCase }

