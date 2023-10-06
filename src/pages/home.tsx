import { ITaskList } from "_core";
import { TaskList } from "components";
import { Dictionary, keyBy } from "lodash";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const defaultTaskLists: ITaskList[] = [
  {
    id: "listA",
    title: "To do",
    items: [
      { id: "1", title: "Item 1" },
      { id: "2", title: "Item 2" },
      { id: "3", title: "Item 3" },
    ],
  },

  {
    id: "listB",
    title: "In progress",
    items: [
      { id: "4", title: "Item 4" },
      { id: "5", title: "Item 5" },
      { id: "6", title: "Item 6" },
    ],
  },
];

const HomePage = () => {
  const [lists, setLists] = useState<Dictionary<ITaskList>>({});

  const checkDropPositionKeep = (result: DropResult): boolean => {
    // drop outside of list
    if (!result || !result.destination) {
      return true;
    }

    const { source, destination } = result;

    // drop at same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return true;
    }

    return false;
  };

  const handleDragEnd = (result: DropResult): void => {
    if (checkDropPositionKeep(result)) {
      return;
    }

    const { source, destination } = result;

    console.clear();
    console.log(result);
  };

  useEffect(() => {
    const mappedTaskList = keyBy(defaultTaskLists, "id");

    setLists(mappedTaskList);
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 10 }}>
        {Object.values(lists)?.map((list) => (
          <Droppable droppableId={list.id} key={list.id}>
            {(provided) => <TaskList taskList={list} provided={provided} />}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default HomePage;
