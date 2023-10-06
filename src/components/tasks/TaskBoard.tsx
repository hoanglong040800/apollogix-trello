import { ITaskList } from "_core";
import { TaskItemModalContent, TaskList } from "components";
import { Dictionary } from "lodash";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTaskBoard, useTaskItemModal } from "./hooks";
import { Dialog, Stack } from "@mui/material";

type Props = {
  initialLists: Dictionary<ITaskList>;
};

const TaskBoard = ({ initialLists }: Props) => {
  const { lists, handleDragEnd, setNewLists } = useTaskBoard({
    initialLists,
  });

  const { open, onClose, updateTaskItem, handleUpdateItem } = useTaskItemModal({
    lists,
    setNewLists,
  });

  const renderTaskLists = () =>
    Object.values(lists)?.map((list) => (
      <Droppable droppableId={list.id} key={list.id}>
        {(provided) => <TaskList taskList={list} provided={provided} />}
      </Droppable>
    ));

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack direction="row" spacing={2}>
          {renderTaskLists()}
        </Stack>

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <TaskItemModalContent
            {...updateTaskItem}
            onBlurUpdate={handleUpdateItem}
          />
        </Dialog>
      </DragDropContext>
    </>
  );
};

export default TaskBoard;
