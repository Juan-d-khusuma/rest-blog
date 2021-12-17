import { Prisma, PrismaClient } from "@prisma/client";
import * as faker from "faker";

const prisma = new PrismaClient();
/**
 * Seed the database with fake data
 */
async function main() {
    const users = await prisma.user.createMany({
        data: Array<Prisma.UserCreateInput>(20)
            .fill(null)
            .map(() => ({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            })),
    });
    const posts = await prisma.post.createMany({
        data: Array<Prisma.PostCreateInput>(50)
            .fill(null)
            .map(() => ({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                slug: faker.lorem.slug(),
                userId: faker.datatype.number({ min: 1, max: 20 }),
            })),
    });
    const comments = await prisma.comment.createMany({
        data: Array<Prisma.CommentCreateInput>(100)
            .fill(null)
            .map(() => ({
                content: faker.lorem.paragraph(),
                postId: faker.datatype.number({ min: 1, max: 50 }),
                userId: faker.datatype.number({ min: 1, max: 20 }),
            })),
    });
    const tags = await prisma.tag.createMany({
        data: Array<Prisma.TagCreateInput>(50)
            .fill(null)
            .map(() => ({
                name: faker.lorem.words(3).toLowerCase(),
            })),
    });

    console.log({ posts, users, comments, tags });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
