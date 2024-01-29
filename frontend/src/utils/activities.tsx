import {
  type SortingFn,
  type ColumnDef,
  type ColumnHelper,
  type Row,
} from "@tanstack/react-table";
// import {
//   QuestionComplexityEnum,
//   QuestionComplexityEnumToLevelMap,
//   type QuestionData,
// } from "../types/questions/questions";
// import { Stack, Tag, Wrap, WrapItem } from "@chakra-ui/react";
// import QuestionComplexityTag from "../components/questions/QuestionComplexityTag";
// import QuestionViewIconButton from "../components/questions/QuestionViewIconButton";
// import QuestionDeleteIconButton from "../components/questions/QuestionDeleteIconButton";
import React, { ReactNode, useEffect, useState } from "react";
// import QuestionsAPI from "../api/questions/questions";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../reducers/authSlice";
import { Activity } from "../types/activities/activities";
// import { Organisation } from "../types/organisations/organisations";
import { Link } from "react-router-dom";
import IconButton from "../components/buttons/IconButton";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

export interface ActivityRowData extends Activity {
  action?: undefined;
}

// export const ComplexitySortingFn: SortingFn<QuestionData> = (
//   rowA: Row<QuestionData>,
//   rowB: Row<QuestionData>,
//   _columnId: string
// ): number => {
//   const rowAComplexity: QuestionComplexityEnum = rowA.getValue("complexity");
//   const rowBComplexity: QuestionComplexityEnum = rowB.getValue("complexity");
//   const rowAComplexityLevel: number =
//     QuestionComplexityEnumToLevelMap[rowAComplexity];
//   const rowBComplexityLevel: number =
//     QuestionComplexityEnumToLevelMap[rowBComplexity];
//   return rowAComplexityLevel > rowBComplexityLevel
//     ? 1
//     : rowAComplexityLevel < rowBComplexityLevel
//     ? -1
//     : 0;
// };

export const ActivityTableColumns = (
  columnHelper: ColumnHelper<ActivityRowData>,
  setActivityList: React.Dispatch<React.SetStateAction<ActivityRowData[]>>
): Array<ColumnDef<ActivityRowData>> => {
  const isAdmin = useSelector(selectIsAdmin);
  return [
    columnHelper.accessor("id", {
      cell: (id): number => id.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (name): string => name.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("type", {
      cell: (type): ReactNode => {
        // TODO: replace with tag
        return <div>{type.getValue()}</div>;
      },
      header: "type",
    }),
    columnHelper.accessor("organisation", {
      cell: (organisation): ReactNode => (
        <Link to={"/organisations/" + organisation.getValue().id}>
          <p className="hover:underline hover:text-gray-800">
            {organisation.getValue().name}
          </p>
        </Link>
      ),
      header: "Organisation",
    }),
    columnHelper.accessor("action", {
      header: "",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (cell) => (
        <div className="flex space-x-2">
          <IconButton
            icon={<EyeIcon className="w-4 h-4" />}
            // questionId={cell.row.original.questionID}
            // title={cell.row.original.title}
          />
          {isAdmin && (
            // <QuestionDeleteIconButton
            //   questionId={cell.row.original.questionID}
            //   onDelete={(questionId) => {
            //     // Remove the deleted question from the list
            //     setQuestionList((prevList) =>
            //       prevList.filter(
            //         (question) => question.questionID !== questionId
            //       )
            //     );
            //   }}
            // />
            <IconButton icon={<TrashIcon />} />
          )}
        </div>
      ),
    }),
  ] as Array<ColumnDef<Activity>>;
};

// columnHelper.accessor("categories", {
//   meta: {
//     selectFilterOptions: categories,
//     selectOptionPrefix: "Category",
//   },
//   header: "Categories",
//   filterFn: "arrIncludes",
//   enableColumnFilter: true,
//   cell: (categories) => (
//     <Stack direction="row" spacing={4}>
//       <Wrap>
//         {categories.getValue().map((category) => (
//           <WrapItem key={category}>
//             <Tag>{category}</Tag>
//           </WrapItem>
//         ))}
//       </Wrap>
//     </Stack>
//   ),
// }),
// columnHelper.accessor("complexity", {
//   meta: {
//     selectFilterOptions: Object.values(QuestionComplexityEnum),
//     selectOptionPrefix: "Complexity",
//   },
//   sortingFn: ComplexitySortingFn,
//   header: "Complexity",
//   cell: (complexity) => (
//     <QuestionComplexityTag questionComplexity={complexity.getValue()} />
//   ),
// }),
// columnHelper.accessor("action", {
//   header: "",
//   enableSorting: false,
//   enableGlobalFilter: false,
//   cell: (cell) => (
//     <Stack direction="row" spacing={2}>
//       <QuestionViewIconButton
//         questionId={cell.row.original.questionID}
//         title={cell.row.original.title}
//       />
//       {isAdmin && (
//         <QuestionDeleteIconButton
//           questionId={cell.row.original.questionID}
//           onDelete={(questionId) => {
//             // Remove the deleted question from the list
//             setQuestionList((prevList) =>
//               prevList.filter(
//                 (question) => question.questionID !== questionId
//               )
//             );
//           }}
//         />
//       )}
//     </Stack>
//   ),
// }),
