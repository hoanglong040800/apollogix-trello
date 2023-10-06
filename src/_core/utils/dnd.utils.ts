import { DropResult } from "react-beautiful-dnd";

export const checkDropPositionKeep = (result: DropResult): boolean => {
  // drop outside of list
  if (!result || !result.destination) {
    return true;
  }

  const { source, destination } = result;

  // drop at same position
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return true;
  }

  return false;
};