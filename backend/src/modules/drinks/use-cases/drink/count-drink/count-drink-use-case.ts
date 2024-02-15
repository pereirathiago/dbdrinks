import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IDrinkRepository } from '@modules/drinks/repositories/i-drink-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountDrinkUseCase {
  constructor(
    @inject('DrinkRepository')
    private drinkRepository: IDrinkRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const drinkCount = await this.drinkRepository.count(
      search,
      filter
    )

    return drinkCount
  }
}

export { CountDrinkUseCase }
