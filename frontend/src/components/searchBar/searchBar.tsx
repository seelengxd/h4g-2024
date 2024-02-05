import React from "react";
import interestApi from "../../api/interests/interests";
import skillsApi from "../../api/skills/skills";
import { Interest } from "../../types/interests/interests";
import { useState } from "react";
import { useEffect } from "react";
import { Skill } from "../../types/skills/skills";

//todo: display present tags
//todo: track tags that are selected
//todo: handle when tag is selected -> add


const SearchBar: React.FC<{s:string}> = ({s}) => {
  
  const [interests, setInterests] = useState<Interest[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<Interest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (s === 'interest') {
        const interestData = await interestApi.getAllInterests();
        setInterests(interestData);
        const filtered = interestData.filter((result) =>
          result.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredResults(filtered);
      } else {
        const skillData = await skillsApi.getAllSkills();
        setSkills(skillData);
        const filtered = skillData.filter((result) =>
          result.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredResults(filtered);
      }
    };

    fetchData();
  }, [s, searchTerm]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="pr-20">
      <form className="flex items-center">
        <input
          id="default-search"
          className="px-4 w-full text-sm text-gray-900 border focus:ring-0 rounded-xl bg-primary-300 border-primary-400 focus:border-primary-600"
          placeholder="Search"
          onChange={handleInputChange}
          required
        />
        <label className="text-sm text-gray-800 sr-only dark:text-white ">
          Search
        </label>
        <svg
          className="absolute right-24 w-4 h-4 text-gray-500 dark:text-gray-400 ml-2 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </form>

      <div className="mt-3 p-4 rounded-md bg-primary-200 border border-primary-600 max-h-[25vh] overflow-y-auto">
        <ul className="flex flex-col space-y-1">
          {filteredResults.map((result) => (
            <li className="text-gray-700 text-sm hover:bg-white hover:rounded-lg pl-2 py-1" key={result.id}>
              {result.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
