import { Box, TextField } from "@mui/material";
import { ITaskItem } from "_core";

type Props = {
  listId: string;
  item: ITaskItem;
  onBlurUpdate: (listId: string, item: ITaskItem) => void;
};

const TaskItemModalContent = ({ listId, item, onBlurUpdate }: Props) => {
  const handleBlur = (key: keyof ITaskItem, value: string) => {
    const newItem: ITaskItem = { ...item, [key]: value };

    onBlurUpdate(listId, newItem);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="white"
      borderRadius={2}
      p={2}
    >
      <TextField
        defaultValue={item.title}
        onBlur={(e) => handleBlur("title", e.target.value)}
        variant="standard"
        sx={{ fontWeight: "bold" }}
      />

      <TextField
        defaultValue={item.description}
        onBlur={(e) => handleBlur("description", e.target.value)}
        variant="outlined"
        multiline
        sx={{ mt: 4 }}
      />
    </Box>
  );
};

export default TaskItemModalContent;
