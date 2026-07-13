import prisma from './src/config/db';

async function main() {
  const client = await prisma.client.create({
    data: {
      name: 'Vishnu',
      company: 'Vishnu Builders',
      phone: '9876543210',
      email: 'vishnu@example.com'
    }
  });
  console.log('Created Client:', client.name);
}

main()
  .catch(console.error)
  .then(() => prisma.$disconnect());
