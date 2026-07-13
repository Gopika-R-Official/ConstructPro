import prisma from './src/config/db';

async function main() {
  const client = await prisma.client.findFirst({ where: { name: 'Vishnu' } });
  
  if (!client) {
    console.log('Client Vishnu not found!');
    return;
  }

  const project = await prisma.project.create({
    data: {
      name: 'Skyline Apartment',
      clientId: client.id,
      status: 'Active',
      budget: 5000000,
    }
  });
  console.log('Created Project:', project.name);
}

main()
  .catch(console.error)
  .then(() => prisma.$disconnect());
