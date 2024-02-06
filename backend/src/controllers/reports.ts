import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { Activity, Interest, Session, User } from "@prisma/client";
import { startOfMonth, addMonths, format, differenceInMinutes } from "date-fns";

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
