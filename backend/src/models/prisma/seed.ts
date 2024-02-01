// TODO
import { ActivityType, PrismaClient, Role, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.interest.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.profile.deleteMany({});
    await prisma.enrollmentForm.deleteMany({});
    await prisma.activityDate.deleteMany({});
    await prisma.activity.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.organisation.deleteMany({});

    //user 1
    const user1 = await prisma.user.upsert({
      where: { email: "user1@gmail.com" },
      update: {},
      create: {
        password: bcrypt.hashSync("user1123", 8),
        email: "user1@gmail.com",
        fullName: "user1123",
        preferredName: "user1123",
      },
    });

    //user 2
    const user2 = await prisma.user.upsert({
      where: { email: "user2@gmail.com" },
      update: {},
      create: {
        password: bcrypt.hashSync("user2123", 8),
        email: "user2@gmail.com",
        fullName: "user2",
        preferredName: "user2",
      },
    });

    //admin
    const admin = await prisma.user.upsert({
      where: { email: "admi@gmail.com" },
      update: {},
      create: {
        password: bcrypt.hashSync("admin123", 8),
        email: "admin@gmail.com",
        role: Role.ADMIN,
        fullName: "admin",
        preferredName: "admin",
      },
    });

    //organisation
    const org1 = await prisma.organisation.create({
      data: {
        name: "Organisation 1",
        description: "Organisation 1 description.",
        imageUrl: "uploads/org_placeholder.jpeg",
        websiteUrl: "https://www.worldwildlife.org",
        activities: {
          create: [
            {
              name: "Volunteer Activity 1",
              type: ActivityType.VOLUNTEER,
              description:
                "Volunteer with us and make a positive impact in your community. Join our dedicated team and contribute to meaningful projects that inspire change.",
              activityDates: {
                create: [
                  {
                    start: new Date("2024-06-15T10:30:00"),
                    end: new Date("2024-06-15T14:30:00"),
                  },
                ],
              },
              EnrollmentForm: {
                create: [
                  {
                    formSchema: {},
                  },
                ],
              },
            },
            {
              name: "Training activity 1",
              type: ActivityType.TRAINING,
              description:
                "Explore our diverse training opportunity designed to enhance your skills and knowledge. ",
              activityDates: {
                create: [
                  {
                    start: new Date("2024-05-15T10:30:00"),
                    end: new Date("2024-07-15T10:30:00"),
                  },
                ],
              },
              EnrollmentForm: {
                create: [
                  {
                    formSchema: {},
                  },
                ],
              },
            },
          ],
        },
      },
    });

    //organisation
    const org2 = await prisma.organisation.create({
      data: {
        name: "Organisation 2",
        description: "Organisation 2 description.",
        imageUrl: "uploads/org_placeholder.jpeg",
        websiteUrl: "https://www.worldwildlife.org",
        activities: {
          create: [
            {
              name: "Volunteer Activity 2",
              type: ActivityType.VOLUNTEER,
              description:
                "Volunteer with us and make a positive impact in your community. Join our dedicated team and contribute to meaningful projects that inspire change.",
              activityDates: {
                create: [
                  {
                    start: new Date("2024-03-15T10:30:00"),
                    end: new Date("2024-03-15T14:30:00"),
                  },
                ],
              },
              EnrollmentForm: {
                create: [
                  {
                    formSchema: {},
                  },
                ],
              },
            },
            {
              name: "Workshop activity 1",
              type: ActivityType.WORKSHOP,
              description:
                "Explore our diverse workshop opportunity designed to enhance your skills and knowledge. ",
              activityDates: {
                create: [
                  {
                    start: new Date("2024-05-10T10:30:00"),
                    end: new Date("2024-05-12T10:30:00"),
                  },
                ],
              },
              EnrollmentForm: {
                create: [
                  {
                    formSchema: {},
                  },
                ],
              },
            },
          ],
        },
      },
    });

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
