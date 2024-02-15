import { IDrinkDTO } from '@modules/drinks/dtos/i-drink-dto';
import { IDrinkRepository } from '@modules/drinks/repositories/i-drink-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IDrinkDTO[],
  hasNext: boolean
}

@injectable()
class ListDrinkUseCase {
  constructor(
    @inject('DrinkRepository')
    private drinkRepository: IDrinkRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const drink = await this.drinkRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countDrink = await this.drinkRepository.count(
      search,
      filter
    )

    const numeroDrink = page * rowsPerPage

    const drinkResponse = {
      items: drink.data,
      hasNext: numeroDrink < countDrink.data.count
    }

    return drinkResponse
  }
}

export { ListDrinkUseCase };
