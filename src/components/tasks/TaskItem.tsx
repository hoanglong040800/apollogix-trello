import { Box, Typography } from "@mui/material";
import { ITaskItem } from "_core";
import { DraggableProvided } from "react-beautiful-dnd";

type Props = {
  item: ITaskItem;
  provided: DraggableProvided;
  onClick: () => void;
};

const TaskItem = ({ item, provided, onClick }: Props) => {
  return (
    <div
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      <Box
        bgcolor="white"
        borderRadius={2}
        p={[2, 2, 1, 3]}
        border={0.5}
        borderColor="lightgrey"
        onClick={onClick}
      >
        <Typography variant="body2">{item.title}</Typography>
      </Box>
    </div>
  );
};

export default TaskItem;
