import { randomUUID } from "node:crypto";
import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, IGymsRepository } from "../IGymsRepository";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter(item => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      const MAX_DISTANCE_IN_KILOMETERS = 10;
      return distance < MAX_DISTANCE_IN_KILOMETERS;
    });
  }

  async searchMany(query: string, page: number) {
    return this.gyms.filter((gym) => gym.title.includes(query)).slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      updated_at: null,
    };

    this.gyms.push(gym);

    return gym;
  }
}