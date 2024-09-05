import * as React from "react";
import { GlobalModalContext, globalModalContextProps } from "./GlobalModal";
import MUIDialogModal from "./MUIDialogModal";

interface Props {
  children: React.ReactNode;
  title: string;
  open: boolean;
}

export default function CustomModal({ open, children, title }: Props) {
  const { closeModal } = React.useContext(
    GlobalModalContext
  ) as globalModalContextProps;

  return (
    <React.Fragment>
      <MUIDialogModal
        open={open}
        title={title}
        children={children}
        closeModal={closeModal}
      />
    </React.Fragment>
  );
}
