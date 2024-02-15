import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository'

@injectable()
class DeleteGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const grupo = await this.grupoRepository.delete(id)

    return grupo
  }
}

export { DeleteGrupoUseCase }
