// src/backend/features/users/infra/users.repo.ts
import { prisma } from '@/backend/core/db/prisma';
import { Prisma } from '@prisma/client';

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
      if (!userId) throw new Error('[users.repo.ensureUser] userId is required');
      if (!email) throw new Error('[users.repo.ensureUser] email is required');

      // 1) if it already exists by id, return it
      const byId = await prisma.user.findUnique({ where: { id: userId } });
      if (byId) return byId;

      // 2) try create
      try {
        const created = await prisma.user.create({
          data: { id: userId, email, name: name ?? null },
        });
        return created;
      } catch (err: unknown) {
        // We must NOT log raw Error objects (Next dev sourcemap crashes).
        const e = err as Prisma.PrismaClientKnownRequestError | Error | any;
        const code = (e && e.code) || 'n/a';
        const meta = e?.meta ? JSON.stringify(e.meta) : '';
        const message = e?.message || 'create failed';
        console.error(
          `[users.repo.ensureUser] create failed userId=${userId} email=${email} name=${name ?? ''} code=${code} meta=${meta} msg=${message}`,
        );

        // 3) if it’s unique-violation on email, reconcile by email
        // P2002 = Unique constraint failed
        if (e && e.code === 'P2002') {
          // Try to load by email
          const byEmail = await prisma.user.findUnique({ where: { email } });
          if (byEmail) {
            // If the row exists but has a different id, we promote Supabase id as the PK.
            // NOTE: This will update the primary key; ensure no FK constraints block this.
            if (byEmail.id !== userId) {
              try {
                const updated = await prisma.user.update({
                  where: { email }, // email is unique
                  data: { id: userId, name: name ?? byEmail.name ?? null },
                });
                return updated;
              } catch (updErr: any) {
                const ucode = updErr?.code || 'n/a';
                const umeta = updErr?.meta ? JSON.stringify(updErr.meta) : '';
                const umsg = updErr?.message || 'update failed';
                console.error(
                  `[users.repo.ensureUser] update-by-email failed email=${email} newId=${userId} code=${ucode} meta=${umeta} msg=${umsg}`,
                );
                throw updErr;
              }
            }
            return byEmail;
          }
        }

        // otherwise bubble up
        throw err;
      }
    },
  };
}
