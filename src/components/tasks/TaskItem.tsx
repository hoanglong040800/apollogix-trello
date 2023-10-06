import { ITaskItem } from "_core";
import { DraggableProvided } from "react-beautiful-dnd";

type Props = {
  item: ITaskItem;
  provided: DraggableProvided;
};

const TaskItem = ({ item, provided }: Props) => {
  return (
    <div
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <div
        style={{
          width: 100,
          height: 30,
          marginBottom: 10,
          background: "white",
        }}
      >
        {item.title}
      </div>
    </div>
  );
};

export default TaskItem;
