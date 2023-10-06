import { ITaskList } from "_core/interface";
import { Dictionary } from "lodash";

export const defaultTaskLists: Dictionary<ITaskList> = {
  listA: {
    id: "listA",
    title: "To do",
    items: [
      { id: "1", title: "Item 1" },
      { id: "2", title: "Item 2" },
      { id: "3", title: "Item 3" },
    ],
  },

  listB: {
    id: "listB",
    title: "In progress",
    items: [
      { id: "4", title: "Item 4" },
      { id: "5", title: "Item 5" },
      { id: "6", title: "Item 6" },
    ],
  },
};
