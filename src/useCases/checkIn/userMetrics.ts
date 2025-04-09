import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";

interface UserMetricsUseCaseRequest {
  userId: string;
}

interface UserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class UserMetricsUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({
    userId,
  }: UserMetricsUseCaseRequest): Promise<UserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
