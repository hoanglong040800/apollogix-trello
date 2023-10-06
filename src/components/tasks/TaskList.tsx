import { ITaskList } from "_core";
import TaskItem from "./TaskItem";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";

type Props = {
  taskList: ITaskList;
  provided: DroppableProvided;
};

const TaskList = ({ taskList, provided }: Props) => {
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{ background: "grey", width: 150 }}
    >
      <h3>{taskList.title}</h3>

      {taskList.items?.map((item, index) => (
        <Draggable draggableId={item.id} index={index} key={item.id}>
          {(dragProvided) => (
            <TaskItem key={item.id} item={item} provided={dragProvided} />
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskList;
