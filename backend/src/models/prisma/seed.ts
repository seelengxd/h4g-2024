import {
  ActivityType,
  PrismaClient,
  Role,
  Prisma,
  FeedbackStatus,
  Gender,
  CommitmentLevel,
  EducationLevel,
  ImmigrationStatus,
  User,
  Profile,
} from "@prisma/client";
import bcrypt from "bcryptjs";

import { createAdmin, createOrganisation, createRegistration, createUser, interestsToAdd, skillsToAdd } from "./data";


const prisma = new PrismaClient();


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

    const user1 = createUser(
      "password",
      "98765432",
      "tml@gmail.com",
      Role.USER,
      "Tan Mei Ling",
      "Mei Ling",
      Gender.Female,
      "1990-05-15T12:30:00.000Z",
      "Passionate about art and craft. Enjoys painting and pottery in spare time. Interested in volunteering for elderly care and community gardening.",
      ["Elderly Care", "Childcare"],
      ["Art and Craft", "Painting", "Pottery"],
      "uploads/user1.png", //todo insert icon
      ["Grandparents Gala: Celebrating Wisdom and Joy", "Kids Carnival: A Day of Fun and Laughter"], //todo deal with blogs
      false,
      false,
      CommitmentLevel.Weekly,
      ImmigrationStatus.Citizen,
      EducationLevel.Bachelor,
      "111000110000011100100",
    );

    const user2 = createUser(
      "password",
      "87654321",
      "lwj@gmail.com",
      Role.USER,
      "Lim Wei Jie",
      "Wei Jie",
      Gender.Male,
      "1988-10-20T12:30:00.000Z",
      "Avid sports enthusiast with a knack for teaching. Skilled in math and sports coaching. Interested in childcare and environmental cleanup initiatives.",
      ["Meals on Wheels", "Environmental Cleanup"],
      ["Sports", "Math", "Language Teaching"],
      "uploads/user2.png", //todo insert icon
      ["Green Earth Festival: Preserving Nature Together", "Joyful Meals Parade: Spreading Happiness, One Meal at a Time"], //todo deal with blogs
      true,
      false,
      CommitmentLevel.Monthly,
      ImmigrationStatus.Pr,
      EducationLevel.Master,
      "110110000011000111000",
    );

    const user3 = createUser(
      "password",
      "65432109",
      "nwt@gmail.com",
      Role.USER,
      "Ng Wei Ting",
      "Wei Ting",
      Gender.Female,
      "2010-03-12T12:30:00.000Z",
      "Musician with a passion for helping others. Proficient in performing arts and music composition. Interested in volunteering for animal shelter support and homeless shelter assistance.",
      ["Animal Shelter Volunteer", "Homeless Shelter Support"],
      ["Musician", "Performing Arts"],
      "uploads/user1.png", //todo insert icon
      ["Furry Friends Fiesta: Bringing Joy to Shelter Animals", "Hope Haven: A Night of Compassion and Support"], //todo deal with blogs
      false,
      false,
      CommitmentLevel.Adhoc,
      ImmigrationStatus.Citizen,
      EducationLevel.LowerSecondary,
      "100110110111011110101"
    );

    const user4 = createUser(
      "password",
      "90123456",
      "lhm@gmail.com",
      Role.USER,
      "Lee Hui Min",
      "Hui Min",
      Gender.Female,
      "2007-08-25T12:30:00.000Z",
      "Experienced in storytelling and creative writing. Enjoys working with children and participating in environmental cleanup projects.",
      ["Community Gardening", "Childcare"],
      ["Story Telling", "Creative Writing"],
      "uploads/user1.png", //todo insert icon
      ["Blooming Community Gardens: Planting Seeds of Hope", "Enchanted Storybook Adventure: Igniting Imaginations"], //todo deal with blogs
      true,
      true,
      CommitmentLevel.Monthly,
      ImmigrationStatus.Pr,
      EducationLevel.PostSecondary,
      "110001010100000010111"
    );

    const user5 = createUser(
      "password",
      "87654321",
      "cwl@gmail.com",
      Role.USER,
      "Chua Wei Lun",
      "Wei Lun",
      Gender.Male,
      "1992-11-30T12:30:00.000Z",
      "Passionate about music and photography. Interested in volunteering for community events and animal shelter support.",
      ["Community Gardening", "Animal Shelter Volunteer"],
      ["Musician", "Photography"],
      "uploads/user2.png", //todo insert icon
      ["Art Extravaganza: Unleashing Creativity in Every Brushstroke", "Melodies for a Cause: Harmonizing Hearts and Minds"], //todo deal with blogs
      true,
      false,
      CommitmentLevel.Adhoc,
      ImmigrationStatus.Citizen,
      EducationLevel.Diploma,
      "111111110100011000010"
    )


    // admin
    const admin1 = createAdmin(
      "password",
      "98795432",
      "lwh@gmail.com",
      Role.ADMIN,
      "Lau Wei Heng",
      "Wei Heng",
    )

    const admin2 = createAdmin(
      "password",
      "98865492",
      "rk@gmail.com",
      Role.ADMIN,
      "Rajesh Kumar",
      "Raj"
    )

    // organisations
    const org1 = createOrganisation(
      "Youth Corps Singapore",
      "Youth Corps Singapore empowers and supports youths who are keen to serve the community. Learn, volunteer, and lead to make a difference in the community.",
      "uploads/ycsg.png",
      "http://www.youthcorps.gov.sg",
      ["Community Empowerment Workshop",
        "Elderly Care Volunteer Program",
        "Environmental Cleanup Campaign",
        "Childcare Training Program",],
      ["Elderly Care", "Environmental Cleanup", "Childcare"]
    )

    const org2 = createOrganisation(
      "Company of Good",
      "With its new Company of Good strategy, NVPC seeks to partner, support and recognise businesses in Singapore along their journey towards corporate purpose—and becoming Companies of Good.",
      "uploads/cog.png",
      "https://www.thecompanyofgood.sg",
      ["Corporate Volunteering Workshop",
        "Philanthropy Forum",
        "Corporate Social Responsibility Training",
        "Community Impact Project",
      ],
      ["Animal Shelter Volunteer", "Elderly Care", "Environmental Cleanup", "Homeless Shelter Support"]
    )


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

    // const enrollmentForm1 = await prisma.enrollmentForm.create({
    //   data: { formSchema: sampleForm, activityId: org1.activities[0].id },
    // });

    // const enrollmentForm2 = await prisma.enrollmentForm.create({
    //   data: { formSchema: sampleForm, activityId: org1.activities[1].id },
    // });

    // const enrollmentForm3 = await prisma.enrollmentForm.create({
    //   data: { formSchema: sampleForm, activityId: org1.activities[2].id },
    // });

    // registrations
    // attended and with feedback

    const reg1 = await createRegistration(
      true,
      (await user1).id,
      (await org1).sessionIds[0],
      "I thoroughly enjoyed the Community Empowerment Workshop. It was enlightening to learn about different ways to contribute to my community and empower others. The skills and knowledge gained will definitely help me make a positive impact.",
      "Thank you for your participation! We're glad you found the workshop enlightening. Keep applying the skills you've learned to inspire others in your community.",
      120,
      FeedbackStatus.Approved
    )

    // not yet attended, no feedback
    const reg2 = await createRegistration(
      false,
      (await user1).id,
      (await org2).sessionIds[1],
      "",
      "",
      0,
      FeedbackStatus.Pending
    )

    // attended and feedback pending approval?
    const reg3 = await createRegistration(
      true,
      (await user2).id,
      (await org1).sessionIds[1],
      "I thoroughly enjoyed the Community Empowerment Workshop. It was enlightening to learn about different ways to contribute to my community and empower others. The skills and knowledge gained will definitely help me make a positive impact.",
      "Thank you for your participation! We're glad you found the workshop enlightening. Keep applying the skills you've learned to inspire others in your community.",
      120,
      FeedbackStatus.Pending
    )

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
