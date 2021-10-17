import React from "react";
import Options from "./Options";
const CategoryItem = ({
  categoryName,
  children,
  updateSelection,
  selection,
  showRequired,
}) => {
  const showCategoryName = () => {
    let show = false;
    for (let child of children) {
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

      {children.map((option, i) => {
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
              children={option.validValues}
              updateSelection={updateSelection}
            />
          )
        );
      })}
    </>
  );
};

export default CategoryItem;
