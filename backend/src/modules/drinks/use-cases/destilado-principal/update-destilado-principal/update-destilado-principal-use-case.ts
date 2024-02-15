import { IDestiladoPrincipalRepository } from '@modules/drinks/repositories/i-destilado-principal-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateDestiladoPrincipalUseCase {
  constructor(@inject('DestiladoPrincipalRepository')
  private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) { }

  async execute({
    id,
    nome,
    descricao,
  }: IRequest): Promise<HttpResponse> {
    const destiladoPrincipal = await this.destiladoPrincipalRepository.update({
      id,
      nome,
      descricao,
    })

    return destiladoPrincipal
  }
}

export { UpdateDestiladoPrincipalUseCase }

