import { type ColumnDef, type ColumnHelper } from "@tanstack/react-table";

import {
  FormData,
  MultiselectInputData,
  SelectInputData,
  Submission,
} from "../types/forms/forms";

export const FormColumns = (
  columnHelper: ColumnHelper<Submission>,
  formData: FormData
): Array<ColumnDef<Submission>> => {
  const accessors = formData.components.map((component, index) =>
    columnHelper.accessor(
      (submission: Submission) => {
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
    ...accessors,
  ] as Array<ColumnDef<Submission>>;
};
