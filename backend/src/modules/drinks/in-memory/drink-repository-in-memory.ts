import { HttpResponse } from "@shared/helpers";
import { IDrinkDTO } from "../dtos/i-drink-dto";
import { IDrinkRepository } from "../repositories/i-drink-repository";

class DrinkRepositoryInMemory implements IDrinkRepository {
  create(data: IDrinkDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  select(filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  idSelect(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  count(search: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  update(data: IDrinkDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  multiDelete(ids: string[]): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

}

export { DrinkRepositoryInMemory }