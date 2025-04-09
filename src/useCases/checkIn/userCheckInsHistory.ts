import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";

interface UserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface UserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class UserCheckInsHistoryUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({
    userId,
    page,
  }: UserCheckInsHistoryUseCaseRequest): Promise<UserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return {
      checkIns,
    };
  }
}
