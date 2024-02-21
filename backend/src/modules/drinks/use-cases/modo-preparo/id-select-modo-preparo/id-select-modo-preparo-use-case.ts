import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { IModoPreparoRepository } from "@modules/drinks/repositories/i-modo-preparo-repository"

@injectable()
class IdSelectModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const modoPreparo = await this.modoPreparoRepository.idSelect(id)

    return modoPreparo
  }
}

export { IdSelectModoPreparoUseCase }
