import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { IDrinkRepository } from "@modules/drinks/repositories/i-drink-repository"

@injectable()
class IdSelectDrinkUseCase {
  constructor(
    @inject('DrinkRepository')
    private drinkRepository: IDrinkRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const drink = await this.drinkRepository.idSelect(id)

    return drink
  }
}

export { IdSelectDrinkUseCase }
