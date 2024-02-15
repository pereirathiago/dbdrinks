import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IDrinkRepository } from '@modules/drinks/repositories/i-drink-repository'

@injectable()
class GetDrinkUseCase {
  constructor(
    @inject('DrinkRepository')
    private drinkRepository: IDrinkRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const drink = await this.drinkRepository.get(id)

    return drink
  }
}

export { GetDrinkUseCase }
