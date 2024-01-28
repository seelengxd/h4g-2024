interface Props {
  question: string;
  linkText: string;
  href: string;
}

const Footer: React.FC<Props> = ({ question, linkText, href }) => {
  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {question}
      <a
        href={href}
        className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        {linkText}
      </a>
    </p>
  );
};

export default Footer;
