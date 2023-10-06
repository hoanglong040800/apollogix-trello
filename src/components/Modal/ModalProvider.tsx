import { ReactNode, createContext, useContext, useState } from "react";

// Define a generic type for the data that can be passed to the context
type ModalContextValue<T> = {
  open: boolean;
  onOpen: (data?: T) => void;
  onClose: () => void;
  data: T;
  updateModalData: (data?: T) => void;
};

// Create a generic context
const ModalContext = createContext<ModalContextValue<any>>({
  open: false,
  onOpen: () => {},
  onClose: () => {},
  data: null,
  updateModalData: () => null,
});

export function ModalContextProvider<T>({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<T | null>(null);

  const onOpen = (data?: T) => {
    setOpen(true);
    setModalData(data || null);
  };

  const onClose = () => {
    setOpen(false);
  };

  const updateModalData = (data?: T) => {
    setModalData(data || null);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        onOpen,
        onClose,
        data: modalData,
        updateModalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext<T>() {
  return useContext<ModalContextValue<T>>(ModalContext);
}
