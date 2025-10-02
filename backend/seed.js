import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        username: "alice",
        password: await bcrypt.hash("alice123", 10),
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        username: "bob",
        password: await bcrypt.hash("bob123", 10),
      },
    }),
    prisma.user.create({
      data: {
        email: "carol@example.com",
        username: "carol",
        password: await bcrypt.hash("carol123", 10),
      },
    }),
    prisma.user.create({
      data: {
        email: "dave@example.com",
        username: "dave",
        password: await bcrypt.hash("dave123", 10),
      },
    }),
  ]);

  const comments = [];

  comments.push(await prisma.comment.create({
    data: { text: "Welcome to the discussion!", userId: users[0].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "Thanks Alice! Happy to be here.", userId: users[1].id, parentId: comments[0].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "Looking forward to contributing!", userId: users[2].id, parentId: comments[0].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "I have a question about the project.", userId: users[3].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "What's your question, Dave?", userId: users[0].id, parentId: comments[3].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "Can we support nested replies?", userId: users[3].id, parentId: comments[4].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "Yes, Prisma relations handle that.", userId: users[0].id, parentId: comments[5].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "Great! Let's test it thoroughly.", userId: users[1].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "Agreed, we need multiple test cases.", userId: users[2].id, parentId: comments[7].id },
  }));

  comments.push(await prisma.comment.create({
    data: { text: "I will prepare some test data.", userId: users[3].id, parentId: comments[7].id },
  }));

  console.log("Seeding completed with hashed passwords and threaded comments");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
