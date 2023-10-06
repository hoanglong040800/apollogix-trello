import { ITaskList } from "_core";
import { TaskList } from "components";
import { Dictionary } from "lodash";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTaskBoard } from "./hooks";

type Props = {
  initialLists: Dictionary<ITaskList>;
};

const TaskBoard = ({ initialLists }: Props) => {
  const { lists, handleDragEnd } = useTaskBoard({ initialLists });

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

export default TaskBoard;
