import { ITaskList, IUpdateTaskItem } from "_core";
import { TaskItemModalContent, TaskList, useModalContext } from "components";
import { Dictionary } from "lodash";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTaskBoard } from "./hooks";
import { Dialog, Modal } from "@mui/material";
import { useState } from "react";

type Props = {
  initialLists: Dictionary<ITaskList>;
};

const TaskBoard = ({ initialLists }: Props) => {
  const { lists, handleDragEnd } = useTaskBoard({ initialLists });
  const { open, onClose, data } = useModalContext<IUpdateTaskItem>();

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: 10 }}>
          {Object.values(lists)?.map((list) => (
            <Droppable droppableId={list.id} key={list.id}>
              {(provided) => <TaskList taskList={list} provided={provided} />}
            </Droppable>
          ))}
        </div>

        <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
          <TaskItemModalContent {...data} />
        </Dialog>
      </DragDropContext>
    </>
  );
};

export default TaskBoard;
