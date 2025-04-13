import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../ICheckInsRepository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckinsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    });

    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).startOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number) {
    const itemsPerPage = 20;
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage
    });

    return checkIns;
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    });

    return count;
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    });

    return checkIn;
  }
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    });

    return checkIn;
  }
}