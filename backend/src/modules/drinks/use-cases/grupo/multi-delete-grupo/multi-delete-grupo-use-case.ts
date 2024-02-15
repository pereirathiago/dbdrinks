import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository';

@injectable()
class MultiDeleteGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const grupo = await this.grupoRepository.multiDelete(ids)

    return grupo
  }
}

export { MultiDeleteGrupoUseCase }
