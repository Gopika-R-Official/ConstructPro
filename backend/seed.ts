import prisma from './src/config/db';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'owner@constructpro.in' },
    update: {},
    create: {
      name: 'Arjun (Owner)',
      email: 'owner@constructpro.in',
      password: hashedPassword,
      role: 'Owner'
    }
  });
  console.log('Database seeded with test user:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
