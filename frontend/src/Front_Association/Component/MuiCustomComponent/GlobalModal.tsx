import React from "react";
import CustomModal from "./CustomModal";

interface ModalProps {
  title: string;
  content: React.ReactNode;
}

export interface globalModalContextProps {
  globalModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
}

export const GlobalModalContext =
  React.createContext<globalModalContextProps | null>(null);

interface Props {
  children: React.ReactNode;
}

export const GlobalModalProvider = ({ children }: Props) => {
  const [modalProps, setModalProps] = React.useState<ModalProps | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const context = React.useMemo<globalModalContextProps>(
    () => ({
      globalModal: (title: string, content: React.ReactNode) => {
        setModalProps({ title, content });
        setIsOpen(true);
      },
      closeModal: () => {
        setIsOpen(false);
      },
    }),
    []
  );

  return (
    <>
      <GlobalModalContext.Provider value={context}>
        {modalProps && (
          <CustomModal title={modalProps.title} open={isOpen}>
            {modalProps.content}
          </CustomModal>
        )}
        {children}
      </GlobalModalContext.Provider>
    </>
  );
};

export const useGlobalModal = () => {
  const ctx = React.useContext(GlobalModalContext);
  if (!ctx) throw new Error("Cannot display modal.");
  return ctx.globalModal;
};
