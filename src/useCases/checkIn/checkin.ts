import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";
import { IGymsRepository } from "@/repositories/IGymsRepository";
import { ResourceNotFoundError } from "@/errors/useCases/resourceNotFoundError";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";
import { MaxDistanceError } from "@/errors/useCases/maxDistanceError";
import { MaxNumberOfCheckInsError } from "@/errors/useCases/maxNumberOfCheckInsError";
interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance =  getDistanceBetweenCoordinates(
      { 
        latitude: userLatitude, 
        longitude: userLongitude 
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
