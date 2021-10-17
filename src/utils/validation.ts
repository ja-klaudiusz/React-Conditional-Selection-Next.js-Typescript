import clonedeep from "lodash.clonedeep";
import { Data, Selection, ValidData, Stats } from "../interfaces";
import { checkStats, validateRule } from "./index";

// ----------------------------------------------------------------------
// React Conditional Selection validation
// Copyright © Klaudiusz Marszałek
// License: MITNFA
// ----------------------------------------------------------------------

export const validate = (data: Data, selection: Selection) => {
  return new Promise<{
    validData: ValidData;
    newSelection: Selection;
    stats: Stats;
  }>(async (resolve, reject) => {
    let forceUpdate = false;

    let newSelection = { ...selection };
    let flatData: Data = {};
    let validData: ValidData = {};
    let toSelectIds = [];
    let requiredIds = [];
    for (let key in data) {
      let record = clonedeep(data[key]);
      const code = record.code;
      const categoryCode = record.category.code;

      record = {
        ...record,
        isValid: validateRule(newSelection, record.rules),
      };
      record.validValues = [];

      for (let option in record.options) {
        if (record.isValid) {
          let value = record.options[option];

          if (value.isValid || validateRule(newSelection, value.rules))
            record.validValues.push({ ...value, isValid: true });
        } else {
          record.options[option].isValid = false;
        }
      }

      if (record.validValues.length === 1) {
        newSelection[code] = record.validValues[0].code;
      } else if (record.validValues.length === 0) {
        delete newSelection[code];
      }

      if (record.options.length === 1) {
        record.isVisible = false;
      }

      record.isRequired &&
        record.isVisible &&
        record.isValid &&
        requiredIds.push(code);
      record.isVisible && record.isValid && toSelectIds.push(code);

      flatData[key] = record;

      if (!validData[categoryCode]) {
        validData[categoryCode] = {
          children: [record],
          name: record.category.name,
        };
      } else {
        validData[categoryCode].children.push(record);
      }
    }

    for (let key in newSelection) {
      let record = flatData[key];
      if (record) {
        let isOK = false;
        if (record.validValues) {
          for (let value of record.validValues) {
            if (newSelection[key] == value.code) {
              isOK = true;
              break;
            }
          }
        }

        if (!isOK) {
          delete newSelection[key];
          forceUpdate = true;
        }
      } else if (!selection[key]) {
        delete newSelection[key];
      }
    }

    const stats = await checkStats({ toSelectIds, requiredIds }, newSelection);

    if (forceUpdate) {
      validate(data, newSelection).then((data) => {
        resolve({ ...data, stats });
      });
    } else {
      resolve({
        newSelection,
        stats,
        validData,
      });
    }
  });
};
