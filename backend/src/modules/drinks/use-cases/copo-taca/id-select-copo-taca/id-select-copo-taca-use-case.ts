import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { ICopoTacaRepository } from "@modules/drinks/repositories/i-copo-taca-repository"

@injectable()
class IdSelectCopoTacaUseCase {
  constructor(
    @inject('CopoTacaRepository')
    private copoTacaRepository: ICopoTacaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const copoTaca = await this.copoTacaRepository.idSelect(id)

    return copoTaca
  }
}

export { IdSelectCopoTacaUseCase }
