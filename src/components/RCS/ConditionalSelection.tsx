/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { formCallback } from "../../utils";
import { validate } from "../../utils/validation";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import Loading from "../Other/Loading";
const Configurator = ({
  data,
  showRequired,
  defaultValues = {},
  exampleMode = false,
}) => {
  const [stats, setStats] = useState({ isReady: false });
  const [selection, setSelection] = useState({});
  const [validData, setValidData] = useState(null);

  const handleValidate = async ({ data, selection }) => {
    const { newSelection, validData, stats } = await validate(data, selection);

    setSelection(newSelection);
    setValidData(validData);
    setStats(stats);
  };

  const handleUpdateSelection = (newSelection) => {
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
    <>
      {exampleMode && (
        <div className="light md:w-1/2 w-full text-sm text-left bg-primary-800 rounded-3xl md:order-none order-last md:mr-6 mr-0  md:mt-0 mt-10 p-6">
          {
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<pre>" +
                  highlight(
                    JSON.stringify({ selection, stats }, null, 4),
                    languages.js
                  ) +
                  "</pre>",
              }}
            ></div>
          }
        </div>
      )}
      <div
        className={
          "text-md text-left " + (exampleMode ? "md:w-1/2 w-full" : "w-full")
        }
      >
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
                  children={category.children}
                  updateSelection={handleUpdateSelection}
                />
              );
            })}
          </form>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Configurator;
