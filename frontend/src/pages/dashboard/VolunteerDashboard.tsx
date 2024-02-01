import CardContainer from "../../components/dashboard/CardContainer";

const VolunteerDashboard: React.FC = () => {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-3 p-8 grid-rows-8 gap-x-8 gap-y-4 h-dvh">
      <div className="col-span-2 row-start-1 row-end-4">
        <CardContainer label={"Volunteer Opportunities"} seeMoreUrl="#">
          {test.map(() => (
            <div className="w-4/12 overflow-hidden bg-green-200 max-h-56 rounded-2xl snap-start shrink-0">
              <img
                className="object-cover"
                src="https://www.pic-control.com/blog/thermal-camera-calibration-plate/thermal-camera-calibration-plate-checker-board-pattern-pcb.png"
                alt="placeholder"
              />
            </div>
          ))}
        </CardContainer>
      </div>
      <div className="col-span-2 row-start-4 row-end-9">
        <CardContainer label={"Featured Posts"} seeMoreUrl="#" />
      </div>
      <div className="col-span-1 row-start-1 row-end-3">
        <CardContainer label={"Upcoming Events"} seeMoreUrl="#" vertical />
      </div>
      <div className="col-span-1 row-start-3 row-end-5">
        <CardContainer label={"Certificates"} />
      </div>
      <div className="col-span-1 row-start-5 row-end-9">
        <CardContainer label={"Volunteer History"} seeMoreUrl="#" vertical />
      </div>
    </div>
  );
};

export default VolunteerDashboard;
