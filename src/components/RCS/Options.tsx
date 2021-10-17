import React, { useEffect, useState } from "react";
import Select, {
  components,
  StylesConfig,
  SingleValueProps,
  PlaceholderProps,
  OptionProps,
} from "react-select";
import { OptionsProps } from "../../interfaces";

const bgColorHasValue = "#97d498";
const bgColorEmpty = "#ead5ff";

const singleOption = ({ children, ...props }: OptionProps) => {
  return (
    <components.Option {...props}>
      <div className="flex flex-col justify-center pl-2">{children}</div>
    </components.Option>
  );
};

const singleValue = ({ children, ...props }: SingleValueProps) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex flex-row justify-center items-center text-lg">
        <span
          className="check-mark w-8 ml-6"
          style={{
            color: "#ffffff",
          }}
        ></span>
        <div className="flex flex-col justify-center pl-2">
          <p className="text-xs pb-1 text-white opacity-80 tracking-wider">
            {props.selectProps.placeholder}
          </p>
          <p className="pb-0 leading-none  font-bold text-white">{children}</p>
        </div>
      </div>
    </components.SingleValue>
  );
};

const Placeholder = (
  props: PlaceholderProps & { showRequired: boolean; isRequired: boolean }
) => {
  const { isDisabled, showRequired, isRequired, hasValue } = props;

  return (
    <components.Placeholder {...props}>
      <div className="flex flex-row justify-center items-center text-lg">
        <span
          className="question-mark w-8 ml-6"
          style={{
            opacity: isDisabled ? 0.5 : 1,
            color: showRequired
              ? isRequired
                ? " #e44562"
                : "#584c62"
              : "#584c62",
          }}
        ></span>
        <span
          style={{
            color: hasValue
              ? isDisabled
                ? "#6a906e"
                : bgColorHasValue
              : isDisabled
              ? "#584c62"
              : "#6a5d83",
          }}
        >
          {props.children}
        </span>
      </div>
    </components.Placeholder>
  );
};

const Options = ({
  name,
  code,
  optionChildren,
  updateSelection,
  isRequired,
  isValid,
  selection,
  showRequired,
}: OptionsProps) => {
  const [value, setValue] = useState<string | null>(null);
  const childrenNotExist = optionChildren ? optionChildren.length === 0 : true;
  const disabled = !isValid || childrenNotExist;

  useEffect(() => {
    disabled && setValue(null);
  }, [disabled]);

  useEffect(() => {
    const value = selection[code] ? selection[code] : null;
    value && setValue(value);
  }, [selection[code]]);

  const colourStyles: StylesConfig = {
    valueContainer: (styles, { hasValue }) => {
      return {
        ...styles,
        padding: "5px 8px 5px 0px",
        width: "100%",
        minHeight: 36,
      };
    },
    control: (styles, props) => {
      const { isDisabled, hasValue } = props;
      return {
        ...styles,
        marginBottom: 13,
        width: "100%",
        paddingTop: "12px",
        paddingLeft: "5px",
        paddingBottom: "12px",
        boxShadow: "none",
        borderRadius: 50,
        minHeight: 36,
        opacity: isDisabled ? 0.7 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        backgroundColor: hasValue ? bgColorHasValue : bgColorEmpty,
        border: "0px solid " + (hasValue ? "#66ae67" : "#9b8bb8"),
        "&:hover": {
          borderColor: "#c5d4e0",
        },
        "&:focus": {
          borderColor: "#c5d4e0",
        },
      };
    },
    placeholder: (base) => {
      return {
        ...base,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      };
    },
    singleValue: (base) => ({
      ...base,
      minHeight: 36,
      display: "flex",
      fontSize: "14px",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "100% ",
      marginLeft: 5,
    }),
    menu: (base) => ({
      ...base,
      width: "100%",
      // marginLeft: "3%",
      // marginRight: "3%",
      top: 70,
      borderRadius: 30,
      borderStyle: "solid",
      borderWidth: "3px",
      padding: 10,
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#d5cae0"
          : isFocused
          ? "#f1f1f1"
          : "white",
        color: "#333333",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100% ",
        padding: "5px",
        borderBottom: "1px solid #f1f1f1",
        fontSize: "16px",
      };
    },
    indicatorSeparator: (styles, { isDisabled, hasValue }) => {
      return {
        ...styles,
        backgroundColor: hasValue
          ? isDisabled
            ? bgColorHasValue
            : "#bdeebe"
          : isDisabled
          ? bgColorEmpty
          : "#ccbee6",
      };
    },
    dropdownIndicator: (styles, props) => {
      const { isDisabled, hasValue } = props;
      return {
        ...styles,
        color: hasValue
          ? isDisabled
            ? bgColorHasValue
            : "#bdeebe"
          : isDisabled
          ? bgColorEmpty
          : "#ccbee6",
      };
    },
  };

  return (
    <>
      {optionChildren ? (
        <Select
          openMenuOnFocus={true}
          styles={colourStyles}
          value={optionChildren.filter(({ code }) => code === value)}
          placeholder={name}
          isDisabled={optionChildren.length === 1 || disabled}
          onChange={(option: any): void => {
            const newSelection = {
              ...selection,
              [code]: option.code,
            };
            updateSelection(newSelection);
          }}
          name={code}
          getOptionLabel={(option: any): string => option.name}
          getOptionValue={(option: any): string => option.code}
          options={optionChildren}
          components={{
            Option: singleOption,
            SingleValue: singleValue,
            Placeholder: (props) => (
              <Placeholder
                showRequired={showRequired}
                isRequired={isRequired}
                {...props}
              />
            ),
          }}
        />
      ) : null}
    </>
  );
};

export default Options;
