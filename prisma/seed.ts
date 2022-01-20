import { PrismaClient } from '@prisma/client';
import { crypto } from '../src/common/helpers/crypto';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const password = await crypto.encrypt('nance@POWER!');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@nance.com',
      name: 'Main Admin',
      status: 'ACTIVE',
      role: 'ADMIN',
      password
    }
  });

  console.info(admin);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
