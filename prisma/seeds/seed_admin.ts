import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('zulupris', 10);
  const user = await prisma.users.upsert({
    where: { email: 'ars44pro@gmail.com' },
    update: {},
    create: {
      username: 'ars44pro',
      email: 'ars44pro@gmail.com',
      password: passwordHash
    },
  });

  console.log('✅ Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });