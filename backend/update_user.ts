import prisma from './src/config/db';

async function main() {
  await prisma.user.update({
    where: { email: 'owner@constructpro.in' },
    data: { name: 'Vishnu' }
  });
  console.log('Updated user name to Vishnu');
}

main()
  .catch(console.error)
  .then(() => prisma.$disconnect());
