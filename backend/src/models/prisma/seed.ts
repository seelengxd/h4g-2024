import {
  ActivityType,
  PrismaClient,
  Role,
  Prisma,
  FeedbackStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const skillsToAdd = [
  { name: "Art and Craft" },
  { name: "Story Telling" },
  { name: "Painting" },
  { name: "Pottery" },
  { name: "Knitting" },
  { name: "Calligraphy" },
  { name: "Cooking" },
  { name: "Cleaning" },
  { name: "Dance" },
  { name: "Sports" },
  { name: "Math" },
  { name: "Creative Writing" },
  { name: "Drawing" },
  { name: "Sculpture" },
  { name: "Musician" },
  { name: "Performing Arts" },
  { name: "Reading Comprehension" },
  { name: "Language Teaching" },
  { name: "Sewing" },
  { name: "Photography" },
];
const interestsToAdd = [
  { name: "Elderly Care" },
  { name: "Childcare" },
  { name: "Environmental Cleanup" },
  { name: "Community Gardening" },
  { name: "Meals on Wheels" },
  { name: "Animal Shelter Volunteer" },
  { name: "Homeless Shelter Support" },
];
const placeholder_text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at sapien arcu. Vivamus eget placerat dui, a luctus elit. Maecenas bibendum erat vel laoreet ultricies. Sed sed turpis sed lacus luctus iaculis. Fusce tellus dolor, tempor ac est quis, condimentum porta tortor. Quisque in pellentesque ipsum, dignissim accumsan dolor.";

async function main() {
  try {
    //clear db
    await prisma.submission.deleteMany({});
    await prisma.feedback.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.registration.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.enrollmentForm.deleteMany({});
    await prisma.activity.deleteMany({});
    await prisma.organisation.deleteMany({});
    await prisma.image.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.interest.deleteMany({});
    await prisma.profile.deleteMany({});
    await prisma.blog.deleteMany({});
    await prisma.user.deleteMany({});

    // add skills
    const skills = await prisma.skill.createMany({
      data: skillsToAdd,
      skipDuplicates: true,
    });

    // add interests
    const interest = await prisma.interest.createMany({
      data: interestsToAdd,
      skipDuplicates: true,
    });

    // user 1
    const user1 = await prisma.user.create({
      data: {
        password: bcrypt.hashSync("password", 8),
        email: "user1@gmail.com",
        fullName: "user1 user1",
        phone: "87654321",
        preferredName: "user1",
        profile: {
          create: {
            dob: "2022-01-15T12:30:00.000Z",
            description: "user 1 description",
            interests: {
              connect: [
                { name: "Elderly Care" },
                { name: "Environmental Cleanup" },
                { name: "Community Gardening" },
              ],
            },
            skills: {
              connect: [
                { name: "Story Telling" },
                { name: "Dance" },
                { name: "Sports" },
                { name: "Math" },
              ],
            },
            imageUrl: "uploads/user_icons/icon_1.png",
          },
        },
        blogs: {
          create: [
            {
              title: "user 1 blog 1",
              description: placeholder_text,
              tags: {
                connect: [{ name: "Elderly Care" }],
              },
            },
          ],
        },
      },
    });
    // user 2
    const user2 = await prisma.user.create({
      data: {
        password: bcrypt.hashSync("password", 8),
        email: "user2@gmail.com",
        fullName: "user2 user2",
        preferredName: "user2",
        phone: "87654321",
        profile: {
          create: {
            dob: "2022-01-15T12:30:00.000Z",
            description: "user 2 description",
            interests: {
              connect: [
                { name: "Meals on Wheels" },
                { name: "Animal Shelter Volunteer" },
                { name: "Homeless Shelter Support" },
              ],
            },
            skills: {
              connect: [
                { name: "Art and Craft" },
                { name: "Story Telling" },
                { name: "Painting" },
                { name: "Pottery" },
                { name: "Knitting" },
              ],
            },
            imageUrl: "uploads/user_icons/icon_4.png",
          },
        },
        blogs: {
          create: [
            {
              title: "user 2 blog 1",
              description: placeholder_text,
              tags: {
                connect: [{ name: "Meals on Wheels" }],
              },
            },
            {
              title: "user 2 blog 2",
              description: placeholder_text,
              tags: {
                connect: [{ name: "Meals on Wheels" }],
              },
            },
          ],
        },
      },
    });
    // admin
    const admin = await prisma.user.create({
      data: {
        password: bcrypt.hashSync("password", 8),
        phone: "87654321",
        email: "admin@gmail.com",
        role: Role.ADMIN,
        fullName: "admin admin",
        preferredName: "admin",
        profile: {
          create: {
            description: "admin description",
            imageUrl: "uploads/user_icons/icon_3.png",
          },
        },
      },
    });

    // organisations
    const org1 = await prisma.organisation.create({
      data: {
        name: "Organisation 1",
        description: "Organisation 1 description.",
        imageUrl: "uploads/org_placeholder.jpeg",
        websiteUrl: "https://www.worldwildlife.org",
        categories: {
          connect: [{ name: "Meals on Wheels" }],
        },
        activities: {
          create: [
            {
              name: "Volunteer Activity 1",
              type: ActivityType.VOLUNTEER,
              location: "some location",
              description:
                "Volunteer with us and make a positive impact in your community. Join our dedicated team and contribute to meaningful projects that inspire change.",
              capacity: 10,
              sessions: {
                create: [
                  {
                    start: new Date("2024-06-15T10:30:00"),
                    end: new Date("2024-06-15T14:30:00"),
                  },
                  {
                    start: new Date("2025-06-15T10:30:00"),
                    end: new Date("2025-06-15T14:30:00"),
                  },
                ],
              },
              images: {
                create: [
                  { imageUrl: "uploads/placeholder-image.png" },
                  { imageUrl: "uploads/org_placeholder.jpeg" },
                ],
              },
            },
            {
              name: "Training activity 1",
              type: ActivityType.TRAINING,
              location: "some location",
              capacity: 5,
              description:
                "Explore our diverse training opportunity designed to enhance your skills and knowledge. ",
              sessions: {
                create: [
                  {
                    start: new Date("2024-06-15T10:30:00"),
                    end: new Date("2024-06-15T14:30:00"),
                  },
                ],
              },
              images: {
                create: [
                  { imageUrl: "uploads/placeholder-image.png" },
                  { imageUrl: "uploads/org_placeholder.jpeg" },
                ],
              },
            },
          ],
        },
      },
      include: {
        activities: {
          include: {
            sessions: true,
          },
        },
      },
    });

    const org2 = await prisma.organisation.create({
      data: {
        name: "Organisation 2",
        description: "Organisation 2 description.",
        imageUrl: "uploads/org_placeholder.jpeg",
        websiteUrl: "https://www.worldwildlife.org",
        categories: {
          connect: [
            { name: "Environmental Cleanup" },
            { name: "Community Gardening" },
          ],
        },
        activities: {
          create: [
            {
              name: "Volunteer Activity 2",
              type: ActivityType.VOLUNTEER,
              location: "some location",
              capacity: 2,
              description:
                "Volunteer with us and make a positive impact in your community. Join our dedicated team and contribute to meaningful projects that inspire change.",
              sessions: {
                create: [
                  {
                    start: new Date("2024-03-15T10:30:00"),
                    end: new Date("2024-03-15T14:30:00"),
                  },
                ],
              },
              images: {
                create: [
                  { imageUrl: "uploads/placeholder-image.png" },
                  { imageUrl: "uploads/org_placeholder.jpeg" },
                ],
              },
            },
            {
              name: "Workshop activity 1",
              type: ActivityType.WORKSHOP,
              location: "some location",
              capacity: 1,
              description:
                "Explore our diverse workshop opportunity designed to enhance your skills and knowledge. ",
              sessions: {
                create: [
                  {
                    start: new Date("2024-05-10T12:30:00"),
                    end: new Date("2024-05-10T16:30:00"),
                  },
                ],
              },
              images: {
                create: [
                  { imageUrl: "uploads/placeholder-image.png" },
                  { imageUrl: "uploads/org_placeholder.jpeg" },
                ],
              },
            },
          ],
        },
      },
      include: {
        activities: {
          include: {
            sessions: true,
          },
        },
      },
    });

    const sampleForm = {
      title: "",
      description: "",
      components: [
        {
          id: 2,
          type: "text",
          title: "short",
        },
        {
          id: 1,
          type: "multiselect",
          title: "checkboxes",
          options: [
            {
              id: 1,
              value: "test",
            },
            {
              id: 2,
              value: "test",
            },
          ],
        },
        {
          id: 3,
          type: "multiline",
          title: "paragraph",
        },
        {
          id: 4,
          type: "select",
          title: "dropdown",
          options: [
            {
              id: 1,
              value: "test",
            },
            {
              id: 2,
              value: "test",
            },
          ],
        },
      ],
      meta: {
        nextId: 5,
      },
    };

    const enrollmentForm1 = await prisma.enrollmentForm.create({
      data: { formSchema: sampleForm, activityId: org1.activities[0].id },
    });

    const enrollmentForm2 = await prisma.enrollmentForm.create({
      data: { formSchema: sampleForm, activityId: org1.activities[1].id },
    });

    const enrollmentForm3 = await prisma.enrollmentForm.create({
      data: { formSchema: sampleForm, activityId: org1.activities[2].id },
    });

    // registrations
    // attended and with feedback
    const registration1 = await prisma.registration.create({
      data: {
        userId: user1.id,
        sessionId: org1.activities[0].sessions[0].id,
        attendance: true,
        feedback: {
          create: {
            userReflection: placeholder_text,
            actualFeedback: placeholder_text,
            minutesServed: 2,
            status: FeedbackStatus.Approved,
          },
        },
      },
    });

    // not yet attended, no feedback
    const registration2 = await prisma.registration.create({
      data: {
        userId: user1.id,
        sessionId: org2.activities[1].sessions[0].id,
      },
    });

    // attended and feedback pending approval?
    const registration3 = await prisma.registration.create({
      data: {
        userId: user2.id,
        sessionId: org1.activities[1].sessions[0].id,
        attendance: true,
        feedback: {
          create: {
            userReflection: placeholder_text,
            actualFeedback: placeholder_text,
            minutesServed: 3,
          },
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
