import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../../components/containers/Dialog";
import { Feedback } from "../../types/feedback/feedback";

interface Props {
  feedback: Feedback;
}
const FeedbackDisplay: React.FC<Props> = ({ feedback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hours = Math.floor(feedback.minutesServed / 60);
  const minutes = feedback.minutesServed % 60;
  return (
    <>
      <EyeIcon className="w-6 h-6 fill-black" onClick={() => setIsOpen(true)} />
      <Modal
        title="Feedback"
        buttonDisplay="Close Feedback"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <p className="mt-4">Your Reflection</p>
        {feedback.userReflection}
        <p className="mt-2">Your Feedback</p>
        {feedback.actualFeedback}
        <p className="mt-2">Time Served</p>
        {hours} h {minutes} minutes
      </Modal>
    </>
  );
};

export default FeedbackDisplay;
