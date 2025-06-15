const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // 既存データをチェックして重複を避ける
  const existingUser = await prisma.user.findUnique({
    where: { email: 'tanaka@example.com' }
  });

  if (!existingUser) {
    const user1 = await prisma.user.create({
      data: {
        name: '田中太郎',
        email: 'tanaka@example.com',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: '佐藤花子',
        email: 'sato@example.com',
      },
    });

    console.log('ユーザーが作成されました:', { user1, user2 });
  } else {
    console.log('ユーザーは既に存在します');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });