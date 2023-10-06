import { ITaskList } from "_core";
import { TaskList } from "components";
import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const defaultTaskLists: ITaskList[] = [
  {
    id: "listA",
    title: "To do",
    items: [
      { id: "1", title: "Item 1" },
      { id: "2", title: "Item 2" },
    ],
  },
  {
    id: "listB",
    title: "In progress",
    items: [
      { id: "3", title: "Item 3" },
      { id: "4", title: "Item 4" },
    ],
  },
];

const HomePage = () => {
  const [lists, setLists] = useState<ITaskList[]>(defaultTaskLists);

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists?.map((list) => (
        <Droppable droppableId={list.id} key={list.id}>
          {(provided) => <TaskList taskList={list} provided={provided} />}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default HomePage;
