import { PairsRepository } from '../repositories/pairs-repository';

class PairsService {
  private repository: PairsRepository;

  constructor(repository: PairsRepository) {
    this.repository = repository;
  }

  getPair = async (base: string, other: string): Promise<Pair> => {
    return await this.repository.get(base, other);
  };
}

class Pair {
  name: string;
  rate: number;
  time: number;
  constructor(base: string, other: string, rate: number, time: number) {
    this.name = `${base}-${other}`;
    this.rate = rate;
    this.time = time;
  }
}

export { PairsService, Pair };
