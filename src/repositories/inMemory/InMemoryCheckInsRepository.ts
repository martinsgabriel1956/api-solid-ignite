import { CheckIn, Prisma } from "@prisma/client";
import crypto from "node:crypto";
import { ICheckInsRepository } from "../ICheckInsRepository";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  constructor(public checkIns: CheckIn[] = []) {}

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkOnSameDate = this.checkIns.find(
      (checkIn) => {
        const checkInDate = dayjs(checkIn.created_at);
        const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

        return checkIn.user_id === userId && isOnSameDate;
      }
    );

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length;
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

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex((item) => item.id === checkIn.id);

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
