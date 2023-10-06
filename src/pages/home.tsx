import { LocalStorageKey, defaultTaskLists } from "_core/constants";
import { TaskBoard } from "components";
import { useMemo } from "react";

const HomePage = () => {
  const initialLists = useMemo(() => {
    const storageTaskLists = localStorage.getItem(LocalStorageKey.taskLists);
    return storageTaskLists ? JSON.parse(storageTaskLists) : defaultTaskLists;
  }, []);

  return <TaskBoard initialLists={initialLists} />;
};

export default HomePage;
