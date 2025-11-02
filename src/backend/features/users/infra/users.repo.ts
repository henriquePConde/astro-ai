import { prisma } from '@/backend/core/db/prisma';

export async function makeUsersRepo() {
  return {
    async findByUserId(userId: string) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return user ?? null;
    },
    async ensureUser({
      userId,
      email,
      name,
    }: {
      userId: string;
      email: string;
      name?: string | null;
    }) {
      const existing = await prisma.user.findUnique({ where: { id: userId } });
      if (existing) return existing;
      const created = await prisma.user.create({
        data: { id: userId, email, name: name ?? null },
      });
      return created;
    },
  };
}
