import { supabaseServer } from '@/backend/core/db/supabase-server';
import { prisma } from '@/backend/core/db/prisma';

export async function makeUsersRepo() {
  const db = await supabaseServer();
  return {
    async getCurrent() {
      const { data: auth } = await db.auth.getUser();
      const authId = auth.user?.id;
      if (!authId) return null;
      const user = await prisma.user.findUnique({ where: { id: authId } });
      return user ?? null;
    },
    async ensureCurrent({ email, name }: { email: string; name?: string | null }) {
      const { data: auth } = await db.auth.getUser();
      const authId = auth.user?.id;
      if (!authId) return null;
      const existing = await prisma.user.findUnique({ where: { id: authId } });
      if (existing) return existing;
      const created = await prisma.user.create({
        data: { id: authId, email, name: name ?? null },
      });
      return created;
    },
  };
}
