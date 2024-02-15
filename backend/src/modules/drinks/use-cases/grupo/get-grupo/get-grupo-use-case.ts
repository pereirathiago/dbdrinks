import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository'

@injectable()
class GetGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const grupo = await this.grupoRepository.get(id)

    return grupo
  }
}

export { GetGrupoUseCase }
