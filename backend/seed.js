// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const employer = await prisma.employer.create({
    data: {
      email: 'admin@example.com',
      password: 'supersecurepassword',
      company: 'Test Company Pvt Ltd',
    },
  });

  console.log('Employer created:', employer);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
