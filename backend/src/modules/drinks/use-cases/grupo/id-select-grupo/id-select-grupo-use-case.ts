import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { IGrupoRepository } from "@modules/drinks/repositories/i-grupo-repository"

@injectable()
class IdSelectGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const grupo = await this.grupoRepository.idSelect(id)

    return grupo
  }
}

export { IdSelectGrupoUseCase }
