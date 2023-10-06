import { Box, Typography } from "@mui/material";
import { ITaskItem } from "_core";

type Props = {
  listId: string;
  item: ITaskItem;
};

const TaskItemModalContent = ({ listId, item }: Props) => {
  return (
    <Box bgcolor="white" borderRadius={2} p={2}>
      <Typography variant="h3">{item.title}</Typography>

      <Typography variant="body2">{item.description}</Typography>
    </Box>
  );
};

export default TaskItemModalContent;
