import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import {
  Activity,
  Gender,
  ImmigrationStatus,
  Interest,
  Role,
  Session,
  User,
} from "@prisma/client";
import {
  startOfMonth,
  addMonths,
  format,
  differenceInMinutes,
  differenceInYears,
  subYears,
} from "date-fns";

// Stores counts for graphs.
interface DataPoint {
  y: number;
  label: string;
}

export const getVolunteerActivityReport: RequestHandler = async (req, res) => {
  // Find minimum month
  const minimumMonth = startOfMonth(
    (
      await prisma.session.aggregate({
        _min: {
          start: true,
        },
      })
    )._min.start!
  );

  const maximumMonth = startOfMonth(
    (
      await prisma.session.aggregate({
        _max: {
          start: true,
        },
      })
    )._max.start!
  );

  // Find maximum month
  const interests = await prisma.interest.findMany();

  const response = {
    data: interests.map((interest) => ({
      id: interest.id,
      name: interest.name,
      volunteers: {
        dataPoints: [] as DataPoint[],
        users: [] as User[][],
      },
      // frontend can do the divmod 60 later
      minutes: {
        dataPoints: [] as DataPoint[],
        activities: [] as Activity[][],
      },
    })),
  };

  const populate = async (interest: Interest, index: number) => {
    const part = response["data"][index];
    let currentMonth = minimumMonth;
    while (currentMonth <= maximumMonth) {
      const formattedDate = format(currentMonth, "MMM yyyy");
      // query volunteers
      const nextMonth = startOfMonth(addMonths(currentMonth, 1));
      const volunteers = await prisma.user.findMany({
        where: {
          registrations: {
            some: {
              session: {
                activity: {
                  organisation: {
                    categories: {
                      some: {
                        name: interest.name,
                      },
                    },
                  },
                },
                start: {
                  gte: currentMonth,
                  lt: nextMonth,
                },
              },
            },
          },
        },
      });

      part["volunteers"].users.push(volunteers);
      part["volunteers"].dataPoints.push({
        y: volunteers.length,
        label: formattedDate,
      });

      // query time
      const activities = await prisma.activity.findMany({
        where: {
          organisation: {
            categories: {
              some: {
                name: interest.name,
              },
            },
          },
          sessions: {
            some: {
              start: {
                gte: currentMonth,
                lt: nextMonth,
              },
            },
          },
        },
        include: {
          sessions: true,
          organisation: true,
        },
      });
      const activitiesWithMinutes = activities.map((activity) => ({
        ...activity,
        sessions: (activity.sessions as Session[]).map((session) => ({
          ...session,
          minutes: differenceInMinutes(session.end, session.start),
        })),
      }));

      part["minutes"].dataPoints.push({
        label: formattedDate,
        y: activitiesWithMinutes.reduce(
          (sum, currActivity) =>
            sum +
            currActivity.sessions.reduce(
              (sum, currSession) => sum + currSession.minutes,
              0
            ),
          0
        ),
      });
      part["minutes"].activities.push(activitiesWithMinutes);

      currentMonth = nextMonth;
      console.dir({ part, activitiesWithMinutes, index });
    }
  };

  for (let index = 0; index < interests.length; index++) {
    const interest = interests[index];
    await populate(interest, index);
  }
  console.log(response.data[0].volunteers, response.data[0].minutes);
  res.json(response);
};

// - reports by available demographics (age, gender, work status, immigration status, interests or skills) to understand volunteer behavior and response,
export const getVolunteerDemographicReport: RequestHandler = async (
  req,
  res
) => {
  const response = {
    data: {
      gender: {
        dataPoints: [] as DataPoint[],
        users: [] as Array<{
          name: string;
          users: User[];
        }>,
      },
      immigrationStatus: {
        dataPoints: [] as DataPoint[],
        users: [] as Array<{
          name: string;
          users: User[];
        }>,
      },
      interests: {
        dataPoints: [] as DataPoint[],
        users: [] as Array<{
          name: string;
          users: User[];
        }>,
      },
      skills: {
        dataPoints: [] as DataPoint[],
        users: [] as Array<{
          name: string;
          users: User[];
        }>,
      },
      age: {
        dataPoints: [] as DataPoint[],
        users: [] as Array<{
          name: string;
          users: User[];
        }>,
      },
    },
  };

  for (const gender of Object.values(Gender)) {
    const volunteers = await prisma.user.findMany({
      where: {
        profile: {
          gender,
        },
        role: Role.USER,
      },
    });
    const volunteerCount = volunteers.length;
    response.data.gender.dataPoints.push({
      y: volunteerCount,
      label: gender,
    });
    response.data.gender.users.push({
      name: gender,
      users: volunteers,
    });
  }

  const noGender = await prisma.user.findMany({
    where: {
      OR: [
        {
          profile: {
            gender: null,
          },
        },
        { profile: { is: null } },
      ],
      role: Role.USER,
    },
  });
  const noGenderCount = noGender.length;
  response.data.gender.dataPoints.push({
    y: noGenderCount,
    label: "No Gender Data",
  });
  response.data.gender.users.push({
    name: "No Gender Data",
    users: noGender,
  });

  for (const immigrationStatus of Object.values(ImmigrationStatus)) {
    const volunteers = await prisma.user.findMany({
      where: {
        profile: {
          immigrationStatus,
        },
        role: Role.USER,
      },
    });
    const volunteerCount = volunteers.length;
    response.data.immigrationStatus.dataPoints.push({
      y: volunteerCount,
      label: immigrationStatus,
    });
    response.data.immigrationStatus.users.push({
      name: immigrationStatus,
      users: volunteers,
    });
  }

  const noImmigrationStatus = await prisma.user.findMany({
    where: {
      OR: [
        {
          profile: {
            immigrationStatus: null,
          },
        },
        { profile: { is: null } },
      ],
      role: Role.USER,
    },
  });
  const noImmigrationCount = noImmigrationStatus.length;
  response.data.immigrationStatus.dataPoints.push({
    y: noImmigrationCount,
    label: "No Immigration Data",
  });
  response.data.immigrationStatus.users.push({
    name: "No Immigration Data",
    users: noImmigrationStatus,
  });

  const interests = await prisma.interest.findMany();

  for (const interest of interests) {
    const volunteers = await prisma.user.findMany({
      where: {
        profile: {
          interests: {
            some: {
              id: interest.id,
            },
          },
        },
        role: Role.USER,
      },
    });
    const volunteerCount = volunteers.length;
    response.data.interests.dataPoints.push({
      y: volunteerCount,
      label: interest.name,
    });
    response.data.interests.users.push({
      name: interest.name,
      users: volunteers,
    });
  }
  const noInterest = await prisma.user.findMany({
    where: {
      OR: [
        {
          profile: {
            interests: {
              none: {},
            },
          },
        },
        { profile: { is: null } },
      ],
      role: Role.USER,
    },
  });
  const noInterestCount = noInterest.length;
  response.data.interests.dataPoints.push({
    y: noInterestCount,
    label: "No Interest Data",
  });
  response.data.interests.users.push({
    name: "No Interest Data",
    users: noInterest,
  });

  const skills = await prisma.skill.findMany();

  for (const skill of skills) {
    const volunteers = await prisma.user.findMany({
      where: {
        profile: {
          skills: {
            some: {
              id: skill.id,
            },
          },
        },
        role: Role.USER,
      },
    });
    const volunteerCount = volunteers.length;
    response.data.skills.dataPoints.push({
      y: volunteerCount,
      label: skill.name,
    });
    response.data.skills.users.push({
      name: skill.name,
      users: volunteers,
    });
  }
  const noSkills = await prisma.user.findMany({
    where: {
      OR: [
        {
          profile: {
            skills: {
              none: {},
            },
          },
        },
        { profile: { is: null } },
      ],
      role: Role.USER,
    },
  });
  const noSkillCount = noSkills.length;
  response.data.skills.dataPoints.push({
    y: noSkillCount,
    label: "No Skill Data",
  });
  response.data.skills.users.push({
    name: "No Skill Data",
    users: noSkills,
  });

  const ageRanges = [
    [0, 13],
    [13, 16],
    [16, 25],
    [26, 35],
    [36, 45],
    [46, 55],
    [56, 65],
    [66, 75],
    [75, 1000],
  ];

  for (const [start, end] of ageRanges) {
    const volunteers = await prisma.user.findMany({
      where: {
        profile: {
          dob: {
            lte: subYears(new Date(), start),
            gt: subYears(new Date(), end),
          },
        },
        role: Role.USER,
      },
    });
    const volunteerCount = volunteers.length;
    const label =
      start === 0 ? "< 13" : end === 1000 ? "> 75" : `${start}-${end}`;
    response.data.age.dataPoints.push({
      y: volunteerCount,
      label: label,
    });
    response.data.age.users.push({
      name: label,
      users: volunteers,
    });
  }

  const noAge = await prisma.user.findMany({
    where: {
      OR: [
        {
          profile: {
            dob: null,
          },
        },
        { profile: { is: null } },
      ],
      role: Role.USER,
    },
  });
  const noAgeCount = noAge.length;
  response.data.age.dataPoints.push({
    y: noAgeCount,
    label: "No Age Data",
  });
  response.data.age.users.push({
    name: "No Age Data",
    users: noAge,
  });

  return res.json(response);
};
