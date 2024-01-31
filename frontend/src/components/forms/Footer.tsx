import { Link } from "react-router-dom";

interface Props {
  question: string;
  linkText: string;
  href: string;
}

const Footer: React.FC<Props> = ({ question, linkText, href }) => {
  return (
    <p className="mt-10 text-sm text-center text-gray-500">
      {question}
      <Link
        to={href}
        className="ml-1 font-semibold text-indigo-600 leading-6 hover:text-indigo-500"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default Footer;
