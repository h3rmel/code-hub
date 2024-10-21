//#region Imports

import { RefObject } from "react";

import { X } from "@phosphor-icons/react";

//#endregion

interface ModalProps {
  children: React.ReactNode;
  modalCloseRef: RefObject<HTMLLabelElement>;
  id: string;
}

export const Modal = ({ children, modalCloseRef, id }: ModalProps) => {
  return (
    <div className="modal w-screen">
      <label htmlFor={id} className="modal-overlay"></label>
      <div className="modal-content flex flex-col gap-4 max-w-md w-full">
        <label
          htmlFor={id}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          ref={modalCloseRef}
        >
          <X size={16} weight="bold" />
        </label>
        {children}
      </div>
    </div>
  );
};

interface ModalTriggerProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const ModalTrigger = ({
  id,
  className,
  children,
}: ModalTriggerProps) => {
  return (
    <>
      <label htmlFor={id} className={className}>
        {children}
      </label>
      <input type="checkbox" id={id} className="modal-state" />
    </>
  );
};

interface ModalHeaderProps {
  title: string;
  description: string;
}

export const ModalHeader = ({ title, description }: ModalHeaderProps) => {
  return (
    <hgroup>
      <h2 className="text-xl text-slate-200">{title}</h2>
      <p className="text-slate-500">{description}</p>
    </hgroup>
  );
};
