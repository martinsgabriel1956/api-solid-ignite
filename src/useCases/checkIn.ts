import { InvalidCredentialsError } from "@/errors/useCases/invalidCredentialsError";
import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";
import { IUsersRepository } from "@/repositories/IUsersRepository";
import { CheckIn } from "@prisma/client";
import { compare } from "bcryptjs";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
