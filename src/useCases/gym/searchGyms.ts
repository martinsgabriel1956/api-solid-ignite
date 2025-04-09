import { Gym } from "@prisma/client";
import { IGymsRepository } from "@/repositories/IGymsRepository";

interface SearchGymsUseCaseProps {
  query: string;
  page: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    page,
    query,
  }: SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(
      query,
      page,
    );

    return {
      gyms,
    };
  }
}
