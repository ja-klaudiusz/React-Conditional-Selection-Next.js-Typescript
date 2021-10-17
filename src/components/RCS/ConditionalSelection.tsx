/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { formCallback } from "../../utils";
import { validate } from "../../utils/validation";
import {
  ConditionalSelectionProps,
  Validation,
  Selection,
  ValidData,
  Stats,
} from "../../interfaces";

const ConditionalSelection = ({
  data,
  showRequired,
  defaultValues = {},
}: ConditionalSelectionProps) => {
  const [stats, setStats] = useState<Stats>({ isReady: false });
  const [selection, setSelection] = useState<Selection>({});
  const [validData, setValidData] = useState<ValidData | null>(null);

  const handleValidate = async ({ data, selection }: Validation) => {
    const { newSelection, validData, stats } = await validate(data, selection);

    setSelection(newSelection);
    setValidData(validData);
    setStats(stats);
  };

  const handleUpdateSelection = (newSelection: Selection) => {
    handleValidate({
      data,
      selection: newSelection,
    });
  };

  useEffect(() => {
    if (data) {
      handleValidate({
        data,
        selection: defaultValues,
      });
    }
  }, [data]);

  return (
    <div className="text-md text-left w-full">
      {validData ? (
        <form
          onKeyUp={formCallback}
          className={stats.isReady ? "ready" : "not-ready"}
        >
          {Object.keys(validData).map((key) => {
            const category = validData[key];
            return (
              <CategoryItem
                key={key}
                selection={selection}
                showRequired={showRequired}
                categoryName={category.name}
                categoryChildren={category.children}
                updateSelection={handleUpdateSelection}
              />
            );
          })}
        </form>
      ) : (
        <>loading</>
      )}
    </div>
  );
};

export default ConditionalSelection;
