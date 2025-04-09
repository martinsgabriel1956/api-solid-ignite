import { Gym } from "@prisma/client";
import { IGymsRepository } from "@/repositories/IGymsRepository";

interface GetNearbyGymsUseCaseProps {
  userLatitude: number;
  userLongitude: number;
}

interface GetNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class GetNearbyGymsUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearbyGymsUseCaseProps): Promise<GetNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      }
    );

    return {
      gyms,
    };
  }
}
