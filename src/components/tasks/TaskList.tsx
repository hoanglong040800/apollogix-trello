import { ITaskList } from "_core";
import TaskItem from "./TaskItem";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { Box, Stack, Typography } from "@mui/material";

type Props = {
  taskList: ITaskList;
  provided: DroppableProvided;
};

const TaskList = ({ taskList, provided }: Props) => {
  return (
    <div {...provided.droppableProps} ref={provided.innerRef}>
      <Box bgcolor="#ebecf0" borderRadius={2} py={2} width="290px">
        <Typography variant="h6" marginLeft={2}>
          {taskList.title}
        </Typography>

        <Stack spacing={2} p={1}>
          {taskList.items?.map((item, index) => (
            <Draggable draggableId={item.id} index={index} key={item.id}>
              {(dragProvided) => (
                <TaskItem key={item.id} item={item} provided={dragProvided} />
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </Stack>
      </Box>
    </div>
  );
};

export default TaskList;
