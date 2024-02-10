import {
  ActivityType,
  CommitmentLevel,
  EducationLevel,
  FeedbackStatus,
  Gender,
  ImmigrationStatus,
  Organisation,
  Registration,
  Role,
  User,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";

export const skillsToAdd = [
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

export const interestsToAdd = [
  { name: "Elderly Care" },
  { name: "Childcare" },
  { name: "Environmental Cleanup" },
  { name: "Community Gardening" },
  { name: "Meals on Wheels" },
  { name: "Animal Shelter Volunteer" },
  { name: "Homeless Shelter Support" },
];

const allActivites = [
  {
    name: "Community Empowerment Workshop",
    type: ActivityType.TRAINING,
    description:
      "Join our Community Empowerment Workshop and learn how to make a positive impact in your community. Gain valuable skills and knowledge to lead and inspire others.",
    capacity: 14,
    location: "Youth Corps Singapore Headquarters",
    images: ["uploads/food3.jpeg", "uploads/comm1.jpeg"],
    sessions: [1, 2, 3],
  },
  {
    name: "Elderly Care Volunteer Program",
    type: ActivityType.VOLUNTEER,
    description:
      "Volunteer with us for our Elderly Care Program and make a difference in the lives of seniors in our community. Spend quality time with the elderly and provide companionship and support.",
    capacity: 10,
    location: "Various elderly care facilities",
    images: ["uploads/old1.jpeg", "uploads/old2.jpeg"],
    sessions: [4, 5],
  },
  {
    name: "Environmental Cleanup Campaign",
    type: ActivityType.VOLUNTEER,
    description:
      "Join our Environmental Cleanup Campaign and help keep our environment clean and green. Participate in litter-picking activities and learn about the importance of environmental conservation.",
    capacity: 20,
    location: "Various locations across Singapore",
    images: ["uploads/clean1.jpeg", "uploads/clean2.jpeg"],
    sessions: [6],
  },
  {
    name: "Childcare Training Program",
    type: ActivityType.TRAINING,
    description:
      "Enroll in our Childcare Training Program and learn how to provide quality care and support to children in our community. Gain practical skills and knowledge to become a certified childcare volunteer.",
    capacity: 11,
    location: "Youth Corps Singapore Headquarters",
    images: ["uploads/kid1.jpeg"],
    sessions: [7, 8],
  },

  //comp of good
  {
    name: "Corporate Volunteering Workshop",
    type: ActivityType.TRAINING,
    description:
      "Join our Corporate Volunteering Workshop and learn how to engage employees in meaningful volunteer activities. Discover best practices for organizing corporate volunteering events and maximizing employee participation.",
    capacity: 20,
    location: "Company of Good Headquarters",
    images: ["uploads/ws1.jpeg", "uploads/ws2.jpeg"],
    sessions: [9, 10],
  },
  {
    name: "Philanthropy Forum",
    type: ActivityType.WORKSHOP,
    description:
      "Participate in our Philanthropy Forum and explore innovative approaches to corporate giving and philanthropy. Connect with industry leaders and gain insights into creating impactful giving programs.",
    capacity: 30,
    location: "Online",
    images: ["uploads/ws2.jpeg"],
    sessions: [11, 12, 13],
  },
  {
    name: "Corporate Social Responsibility Training",
    type: ActivityType.TRAINING,
    description:
      "Enroll in our Corporate Social Responsibility Training program and learn how to integrate CSR into your company's culture. Gain practical strategies for implementing CSR initiatives and measuring their impact.",
    capacity: 15,
    location: "Company of Good Training Center",
    images: ["uploads/ws3.jpeg"],
    sessions: [14, 15],
  },
  {
    name: "Community Impact Project",
    type: ActivityType.VOLUNTEER,
    description:
      "Join our Community Impact Project and make a difference in the lives of those in need. Engage in activities such as volunteering at homeless shelters, environmental cleanups, and elderly care programs.",
    capacity: 25,
    location: "Various locations across Singapore",
    images: ["uploads/food1.jpeg", "uploads/food2.jpeg"],
    sessions: [16],
  },
];

const sessions = [
  {
    id: 1,
    start: new Date("2023-06-15T10:30:00+08:00"),
    end: new Date("2023-06-15T14:30:00+08:00"),
  },
  {
    id: 2,
    start: new Date("2023-07-20T09:00:00+08:00"),
    end: new Date("2023-07-20T12:00:00+08:00"),
  },
  {
    id: 3,
    start: new Date("2024-08-10T13:00:00+08:00"),
    end: new Date("2024-08-10T17:00:00+08:00"),
  },
  {
    id: 4,
    start: new Date("2023-09-05T11:00:00+08:00"),
    end: new Date("2023-09-05T15:00:00+08:00"),
  },
  {
    id: 5,
    start: new Date("2023-10-12T08:30:00+08:00"),
    end: new Date("2023-10-12T12:30:00+08:00"),
  },
  {
    id: 6,
    start: new Date("2024-11-18T10:00:00+08:00"),
    end: new Date("2024-11-18T13:00:00+08:00"),
  },
  {
    id: 7,
    start: new Date("2024-12-03T14:00:00+08:00"),
    end: new Date("2024-12-03T17:00:00+08:00"),
  },
  {
    id: 8,
    start: new Date("2025-01-22T12:00:00+08:00"),
    end: new Date("2025-01-22T15:00:00+08:00"),
  },
  //comp of good
  {
    id: 9,
    start: new Date("2024-06-19T09:00:00+08:00"),
    end: new Date("2024-06-19T12:00:00+08:00"),
  },
  {
    id: 10,
    start: new Date("2024-07-23T10:30:00+08:00"),
    end: new Date("2024-07-23T14:30:00+08:00"),
  },
  {
    id: 11,
    start: new Date("2024-08-11T13:00:00+08:00"),
    end: new Date("2024-08-11T17:00:00+08:00"),
  },
  {
    id: 12,
    start: new Date("2024-09-09T11:00:00+08:00"),
    end: new Date("2024-09-09T15:00:00+08:00"),
  },
  {
    id: 13,
    start: new Date("2024-10-13T08:30:00+08:00"),
    end: new Date("2024-10-13T12:30:00+08:00"),
  },
  {
    id: 14,
    start: new Date("2024-11-18T10:00:00+08:00"),
    end: new Date("2024-11-18T13:00:00+08:00"),
  },
  {
    id: 15,
    start: new Date("2024-12-03T14:00:00+08:00"),
    end: new Date("2024-12-03T17:00:00+08:00"),
  },
  {
    id: 16,
    start: new Date("2025-01-23T12:00:00+08:00"),
    end: new Date("2025-01-23T15:00:00+08:00"),
  },
];


const allBlogs = [
  {
    title: "Grandparents Gala: Celebrating Wisdom and Joy",
    description:
      "Yesterday, I had the privilege of participating in the Grandparents Gala, a delightful event filled with laughter, music, and heartwarming stories. It was heartening to see the seniors' faces light up as they reminisced about their fondest memories and shared their wisdom with younger generations.",
    tags: ["Elderly Care"],
    imageUrl: "uploads/old1.jpeg",
  },
  {
    title: "Kids Carnival: A Day of Fun and Laughter",
    description:
      "Last weekend, I volunteered at the Kids Carnival, an exhilarating event that brought smiles to children's faces. From exciting games to thrilling rides, it was a day filled with joy and laughter. Being part of their laughter-filled day was truly unforgettable.",
    tags: ["Childcare"],
    imageUrl: "uploads/kid1.jpeg",
  },
  {
    title: "Green Earth Festival: Preserving Nature Together",
    description:
      "Joining the Green Earth Festival yesterday was an inspiring experience. From tree planting to eco-friendly workshops, it was a day dedicated to preserving our planet. Together, we took a step towards a greener future.",
    tags: ["Environmental Cleanup"],
    imageUrl: "uploads/clean1.jpeg",
  },
  {
    title: "Blooming Community Gardens: Planting Seeds of Hope",
    description:
      "Today, I volunteered for Blooming Community Gardens, an initiative aimed at transforming our neighborhood into a vibrant oasis. Planting flowers and vegetables alongside fellow volunteers was not only enjoyable but also uplifting. Let's watch our gardens bloom with beauty and hope.",
    tags: ["Community Gardening"],
    imageUrl: "uploads/clean2.jpeg",
  },
  {
    title: "Joyful Meals Parade: Spreading Happiness, One Meal at a Time",
    description:
      "Delivering meals through the Joyful Meals Parade was a heartwarming experience. Seeing the smiles on recipients' faces as they received their meals filled my heart with joy. Let's continue spreading happiness and kindness, one meal at a time.",
    tags: ["Meals on Wheels"],
    imageUrl: "uploads/food2.jpeg",
  },
  {
    title: "Furry Friends Fiesta: Bringing Joy to Shelter Animals",
    description:
      "Spending time at the Furry Friends Fiesta today was nothing short of heartwarming. Playing with the animals and seeing their wagging tails filled me with happiness. I'm grateful for the opportunity to bring joy to these shelter animals.",
    tags: ["Animal Shelter Volunteer"],
    imageUrl: "uploads/comm1.jpeg",
  },
  {
    title: "Hope Haven: A Night of Compassion and Support",
    description:
      "Volunteering at Hope Haven last night was a humbling experience. Providing support and comfort to the homeless reminded me of the power of compassion. Let's continue spreading hope and kindness in our community.",
    tags: ["Homeless Shelter Support"],
    imageUrl: "uploads/food1.jpeg",
  },
  {
    title: "Enchanted Storybook Adventure: Igniting Imaginations",
    description:
      "Today, I had the pleasure of hosting the Enchanted Storybook Adventure at the local library. Transporting children to magical realms through storytelling was an absolute joy. It's moments like these that ignite imaginations and inspire dreams.",
    tags: ["Childcare"],
    imageUrl: "uploads/kid2.jpeg",
  },
  {
    title: "Art Extravaganza: Unleashing Creativity in Every Brushstroke",
    description:
      "Hosting the Art Extravaganza for children yesterday was an explosion of creativity and color. Watching their artistic talents flourish brought me immense joy. Let's continue nurturing their creativity and passion for art.",
    tags: ["Childcare"],
    imageUrl: "uploads/kid3.jpeg",
  },
  {
    title: "Melodies for a Cause: Harmonizing Hearts and Minds",
    description:
      "Last night's performance at Melodies for a Cause was a symphony of compassion and unity. Music has the power to uplift spirits and bring people together, and it was a privilege to be part of such a meaningful event.",
    tags: ["Homeless Shelter Support"],
    imageUrl: "uploads/music.jpeg",
  },
];

export async function createUser(
  password: string,
  phone: string,
  email: string,
  role: Role,
  fullName: string,
  preferredName: string,
  gender: Gender,
  dob: string,
  description: string,
  interests: string[],
  skills: string[],
  imageUrl: string,
  blogTitles: string[],
  canDrive: boolean,
  hasVehicle: boolean,
  commitment: CommitmentLevel,
  immigrationStatus: ImmigrationStatus,
  educationLevel: EducationLevel,
  availability: string
): Promise<User> {
  return await prisma.user.create({
    data: {
      password: bcrypt.hashSync(password, 8),
      phone: phone,
      email: email,
      role: role,
      fullName: fullName,
      preferredName: preferredName,
      profile: {
        create: {
          gender: gender,
          dob: dob,
          description: description,
          interests: {
            connect: interests.map((interest) => ({ name: interest })),
          },
          skills: {
            connect: skills.map((skill) => ({ name: skill })),
          },
          imageUrl: imageUrl,
          driving: canDrive,
          ownVehicle: hasVehicle,
          commitmentLevel: commitment,
          immigrationStatus: immigrationStatus,
          educationLevel: educationLevel,
          availability: availability,
        },
      },
      blogs: {
        create: allBlogs
          .filter((blog) => blogTitles.includes(blog.title))
          .map((blog) => ({
            title: blog.title,
            description: blog.description,
            imageUrl: blog.imageUrl,
            tags: {
              connect: interestsToAdd
                .filter((interest) => interest.name in blog.tags)
                .map((interest) => ({ name: interest.name })),
            },
          })),
      },
    },
    include: {
      blogs: true,
      profile: true,
    },
  });
}

export async function createAdmin(
  password: string,
  phone: string,
  email: string,
  role: Role,
  fullName: string,
  preferredName: string
): Promise<User> {
  return await prisma.user.create({
    data: {
      password: bcrypt.hashSync(password, 8),
      phone: phone,
      email: email,
      role: role,
      fullName: fullName,
      preferredName: preferredName,
    },
  });
}

export async function createOrganisation(
  name: string,
  description: string,
  imageUrl: string,
  websiteUrl: string,
  activities: string[],
  categories: string[]
): Promise<{ organisation: Organisation; sessionIds: number[] }> {
  const orgs = await prisma.organisation.create({
    data: {
      name: name,
      description: description,
      imageUrl: imageUrl,
      websiteUrl: websiteUrl,
      categories: {
        connect: categories.map((category) => ({ name: category })),
      },
      activities: {
        create: allActivites
          .filter((activity) => activities.includes(activity.name))
          .map((activity) => {
            return {
              name: activity.name,
              type: activity.type,
              description: activity.description,
              capacity: activity.capacity,
              location: activity.location,
              images: {
                create: activity.images.map((imageurl) => ({
                  imageUrl: imageurl,
                })),
              },
              sessions: {
                create: sessions
                  .filter((session) => activity.sessions.includes(session.id))
                  .map((session) => ({
                    start: session.start,
                    end: session.end,
                  })),
              },
            };
          }),
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
  const sessionIds: number[] = orgs.activities.flatMap((activity) =>
    activity.sessions.map((session) => session.id)
  );
  return { organisation: orgs, sessionIds: sessionIds };
}

export async function createRegistration(
  attendance: boolean | null,
  userId: number,
  sessionId: number,
  userReflection: string | "",
  actualFeedback: string | "",
  minutesServed: number | 0,
  status: FeedbackStatus
): Promise<Registration> {
  return await prisma.registration.create({
    data: {
      attendance: attendance,
      userId: userId,
      sessionId: sessionId,
      feedback: {
        create: {
          userReflection: userReflection,
          actualFeedback: actualFeedback,
          minutesServed: minutesServed,
          status: status,
        },
      },
    },
  });
}
