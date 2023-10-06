import { LocalStorageKey } from "_core/constants";
import { ITaskList } from "_core";
import { checkDropPositionKeep, swapArrayValues } from "_core/utils";
import { Dictionary } from "lodash";
import { useState } from "react";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";

type Props = {
  initialLists: Dictionary<ITaskList>;
};

export const useTaskBoard = ({ initialLists }: Props) => {
  const [lists, setLists] = useState<Dictionary<ITaskList>>(initialLists);

  const rearrangeSameList = (
    originLists: Dictionary<ITaskList>,
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const { droppableId: souListId, index: souIndex } = source;
    const { index: desIndex } = destination;

    const sourceItems = originLists[souListId].items;

    originLists[souListId].items = swapArrayValues(
      sourceItems,
      souIndex,
      desIndex
    );

    return originLists;
  };

  const rearrangeDifferentLists = (
    originLists: Dictionary<ITaskList>,
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    const { droppableId: souListId, index: souIndex } = source;
    const { droppableId: desListId, index: desIndex } = destination;

    const [draggedItem] = originLists[souListId].items.splice(souIndex, 1);

    originLists[desListId].items.splice(desIndex, 0, draggedItem);

    return originLists;
  };

  const rearrangeLists = (
    originLists: Dictionary<ITaskList>,
    source: DraggableLocation,
    destination: DraggableLocation
  ): Dictionary<ITaskList> => {
    return source.droppableId === destination.droppableId
      ? rearrangeSameList(originLists, source, destination)
      : rearrangeDifferentLists(originLists, source, destination);
  };

  const handleDragEnd = (result: DropResult): void => {
    // check destination again to avoid type check error
    if (checkDropPositionKeep(result) || !result?.destination) {
      return;
    }

    const updatedLists = rearrangeLists(
      lists,
      result.source,
      result.destination
    );

    setLists(updatedLists);
    localStorage.setItem(
      LocalStorageKey.taskLists,
      JSON.stringify(updatedLists)
    );
  };

  return {
    lists,
    handleDragEnd,
  };
};
