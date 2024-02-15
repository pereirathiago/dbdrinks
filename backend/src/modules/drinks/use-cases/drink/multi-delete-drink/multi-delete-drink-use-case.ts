import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { IDrinkRepository } from '@modules/drinks/repositories/i-drink-repository';

@injectable()
class MultiDeleteDrinkUseCase {
  constructor(
    @inject('DrinkRepository')
    private drinkRepository: IDrinkRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const drink = await this.drinkRepository.multiDelete(ids)

    return drink
  }
}

export { MultiDeleteDrinkUseCase }
