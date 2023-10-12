import { CheckIn, Prisma } from "@prisma/client";
import crypto from "node:crypto";
import { ICheckInsRepository } from "../ICheckInsRepository";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  constructor(public checkIns: CheckIn[] = []) {}

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkOnSameDate = this.checkIns.find(
      (checkIn) => checkIn.user_id === userId
    );

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      ...data,
      id: crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
      updated_at: null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
