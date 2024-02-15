import { IDrinkRepository } from '@modules/drinks/repositories/i-drink-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDrinkUseCase {
  constructor(
    @inject('DrinkRepository')
    private drinkRepository: IDrinkRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const drink = await this.drinkRepository.select(filter)

    const newDrink = {
      items: drink.data,
      hasNext: false
    }

    return newDrink
  }
}

export { SelectDrinkUseCase }
