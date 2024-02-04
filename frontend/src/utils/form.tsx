import { type ColumnDef, type ColumnHelper } from "@tanstack/react-table";

import {
  FormData,
  MultiselectInputData,
  SelectInputData,
  Submission,
} from "../types/forms/forms";
import { SubmissionData } from "../types/enrollmentForms/submissions";

export const FormColumns = (
  columnHelper: ColumnHelper<SubmissionData>,
  formData: FormData
): Array<ColumnDef<SubmissionData>> => {
  const accessors = formData.components.map((component, index) =>
    columnHelper.accessor(
      (submission: SubmissionData) => {
        console.log({ index, component });
        const answer = submission.answer.filter(
          (ans) => ans.questionId === component.id
        )[0];
        if (answer) {
          if (typeof answer.value === "string") {
            return answer.value;
          } else if (typeof answer.value === "number") {
            return (component as SelectInputData).options.filter(
              (option) => option.id === answer.value
            )[0]!.value;
          } else {
            // must be the multiselect
            const answers = answer.value.map(
              (part) =>
                (component as MultiselectInputData).options.filter(
                  (option) => option.id === part
                )[0]!.value
            );
            return answers;
          }
        }
      },
      {
        header: component.title,
        cell: (answerCellContext) => {
          const answer = answerCellContext.getValue();
          if (typeof answer === "string") {
            return answer;
          } else {
            return (
              <>
                {answer?.map((ans) => (
                  <div>{ans}</div>
                ))}
              </>
            );
          }
        },
      }
    )
  );
  return [
    columnHelper.accessor("id", {
      cell: (id): number => id.getValue()!,
      header: "ID",
    }),
    // Todo: if there is a admin page to volunteers, link it here.
    columnHelper.accessor((submission) => submission.user.fullName, {
      cell: (name) => name.getValue()!,
      header: "Volunteer",
    }),
    ...accessors,
  ] as Array<ColumnDef<SubmissionData>>;
};
