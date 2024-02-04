import { QrScanner } from '@yudiel/react-qr-scanner';
import { ActivityMiniData } from '../../types/activities/activities';
import { ArrowTopRightOnSquareIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Tag from '../../components/dataDisplay/Tag';
import SessionMiniCardDateDisplay from './minicard/SessionMiniCardDateDisplay';
import SessionMiniCardHeader from './minicard/SessionMiniCardHeader';
import { SessionData } from '../../types/sessions/sessions';

interface DropInAttendanceQrScannerProps {
  session: SessionData;
  activity: ActivityMiniData;
}

const DropInAttendanceQrScanner: React.FC<DropInAttendanceQrScannerProps> = ({
  session,
  activity
}: DropInAttendanceQrScannerProps) => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col p-8 bg-white rounded-md shadow max-w-fit col-span-1">
        <div>
          <QrScanner
            onDecode={(result) => console.log(result)}
            onError={(error) => console.log(error?.message)}
            stopDecoding={false}
            containerStyle={{ width: 500, height: 500, paddingTop: 0 }}
            videoStyle={{ width: '100%', height: '100%' }}
            constraints={{
              facingMode: 'environment',
              aspectRatio: { ideal: 1 }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col col-span-1 gap-2">
        <div className="flex flex-col p-8 bg-white rounded-md shadow w-full">
          {/* Activity Name */}
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
            {activity.name}
          </h2>

          {/* Activity Organisation */}
          <div className="text-sky-700">
            <Link to={`/organisations/${activity.organisationId}`} target="_blank">
              <div className="flex items-center underline">
                {activity.organisationName}
                <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2 stroke-2 ml-2" />
              </div>
            </Link>
          </div>

          {/* Activity Location */}
          <div className="flex items-center text-md text-gray-700 mb-2">
            <MapPinIcon className="w-5 h-5 mr-2" />
            {activity.location}
          </div>

          {/* Activity Description */}
          <div className="flex text-gray-500">{activity.description}</div>

          <div className="flex mt-4">
            <Tag text={activity.type} textSize="text-sm" />
          </div>
        </div>

        <div className="flex flex-col bg-white p-8 rounded-md shadow gap-4">
          <SessionMiniCardHeader session={session} />
          <SessionMiniCardDateDisplay sessionStart={session.start} sessionEnd={session.end} />
        </div>
      </div>
    </div>
  )
};

export default DropInAttendanceQrScanner;
