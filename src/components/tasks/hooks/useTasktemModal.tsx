import { ITaskItem, ITaskList, IUpdateTaskItem } from "_core";
import { useModalContext } from "components/Modal";
import { Dictionary } from "lodash";

type Props = {
  lists: Dictionary<ITaskList>;
  setNewLists: (lists: Dictionary<ITaskList>) => void;
};

export const useTaskItemModal = ({ lists, setNewLists }: Props) => {
  const {
    open,
    onClose,
    data: updateTaskItem,
    updateModalData,
  } = useModalContext<IUpdateTaskItem>();

  const handleUpdateItem = (listId: string, updateItem: ITaskItem) => {
    const updatedLists = lists;

    const updatedItemIndex = updatedLists[listId].items.findIndex(
      (i) => i.id === updateItem.id
    );

    if (updatedItemIndex === -1) {
      return;
    }

    updatedLists[listId].items[updatedItemIndex] = updateItem;

    setNewLists(updatedLists);
    updateModalData({ listId, item: updateItem });
  };

  return {
    open,
    onClose,
    updateTaskItem,
    handleUpdateItem
  };
};
