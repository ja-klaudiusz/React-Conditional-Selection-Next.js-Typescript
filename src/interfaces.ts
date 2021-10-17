export interface Selection {
  [key: string]: string;
}

export interface Options {
  code: string;
  name: string;
  default: null | string;
  isValid?: boolean;
  rules: any;
}

export interface Category {
  name: string;
  code: string;
}

export interface ValidValues {
  code: string;
  default: null | string;
  isValid: boolean;
  name: string;
  rules: any;
}

export interface DataCategory {
  code: string;
  name: string;
  options: Options[];
  category: Category;
  isVisible: boolean;
  isValid?: boolean;
  isRequired: boolean;
  validValues?: ValidValues[];
  rules: any;
}

export interface Data {
  [key: string]: DataCategory;
}

export interface ConditionalSelectionProps {
  data: Data;
  exampleMode: boolean;
  showRequired: boolean;
  defaultValues: Selection;
}

export interface OptionsProps {
  name: string;
  code: string;
  optionChildren?: ValidDataCategoryChildrenOptions[];
  isRequired: boolean;
  isValid: boolean;
  selection: Selection;
  showRequired: boolean;
  updateSelection: (newSelection: Selection) => void;
}

export interface CategoryItemProps {
  categoryName: string;
  categoryChildren: ValidDataCategoryChildren[];
  selection: Selection;
  showRequired: boolean;
  updateSelection: (newSelection: Selection) => void;
}

export interface Validation {
  data: Data;
  selection: Selection;
}

export interface ValidDataCategoryChildrenOptions {
  code: string;
  name: string;
  default: null | string;
  isValid?: boolean;
  rules: any;
}

export interface ValidDataCategoryChildren {
  category: Category;
  code: string;
  isRequired: boolean;
  isValid?: boolean;
  isVisible: boolean;
  name: string;
  options: ValidDataCategoryChildrenOptions[];
  rules: any;
  validValues?: ValidValues[];
}

export interface ValidDataCategory {
  children: ValidDataCategoryChildren[];
  name: string;
}

export interface ValidData {
  [key: string]: ValidDataCategory;
}

export interface Stats {
  isReady: boolean;
  notSelected?: number;
  notSelectedMandatory?: number;
  progressPercent?: string;
  totalMandatoryOptions?: number;
  totalOptions?: number;
}

export interface SelectionStatsIds {
  requiredIds: string[];
  toSelectIds: string[];
}
