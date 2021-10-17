import React from "react";
import { CategoryItemProps } from "../../interfaces";
import Options from "./Options";
const CategoryItem = ({
  categoryName,
  categoryChildren,
  updateSelection,
  selection,
  showRequired,
}: CategoryItemProps) => {
  const showCategoryName = () => {
    let show = false;
    for (let child of categoryChildren) {
      if (child.isValid) {
        show = true;
        break;
      }
    }
    return show;
  };
  return (
    <>
      {showCategoryName() && (
        <h3 className="text-2xl text-primary-100 mb-4 first:pt-0 pt-4 font-title">
          {categoryName}
        </h3>
      )}

      {categoryChildren.map((option, i) => {
        return (
          option.isVisible &&
          option.isValid && (
            <Options
              key={option.code}
              selection={selection}
              showRequired={showRequired}
              name={option.name}
              code={option.code}
              isRequired={option.isRequired}
              isValid={option.isValid}
              optionChildren={option.validValues}
              updateSelection={updateSelection}
            />
          )
        );
      })}
    </>
  );
};

export default CategoryItem;
