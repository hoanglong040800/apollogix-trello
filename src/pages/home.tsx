import { ITaskList } from "_core";
import { LocalStorageKey, defaultTaskLists } from "_core/constants";
import { checkDropPositionKeep, swapArrayValues } from "_core/utils";
import { TaskList } from "components";
import { Dictionary } from "lodash";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

const HomePage = () => {
  const [lists, setLists] = useState<Dictionary<ITaskList>>({});

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

  useEffect(() => {
    const storageTaskLists = localStorage.getItem(LocalStorageKey.taskLists);

    setLists(
      storageTaskLists ? JSON.parse(storageTaskLists) : defaultTaskLists
    );
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 10 }}>
        {Object.values(lists)?.map((list) => (
          <Droppable droppableId={list.id} key={list.id}>
            {(provided) => <TaskList taskList={list} provided={provided} />}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default HomePage;
