import { ITaskList } from "_core/interface";
import { Dictionary } from "lodash";

export const defaultTaskLists: Dictionary<ITaskList> = {
  listA: {
    id: "listA",
    title: "To do",
    items: [
      { id: "1", title: "Code", description: "" },
      { id: "2", title: "Go to library", description: "" },
      { id: "3", title: "Meeting with clients", description: "" },
    ],
  },

  listB: {
    id: "listB",
    title: "In progress",
    items: [{ id: "4", title: "Write docs", description: "description" }],
  },

  listC: {
    id: "listC",
    title: "Done",
    items: [{ id: "5", title: "Interview", description: "description" }],
  },
};
