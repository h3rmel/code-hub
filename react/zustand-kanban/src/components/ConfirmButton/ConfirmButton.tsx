import { useState } from "react";

interface ConfirmButtonsProps {
  onFirstClick?: () => void;
  onConfirm: () => void;
  times?: number;
  messages: string[];
  dialog: React.ReactNode[];
  className?: string;
}

export const ConfirmButton = ({
  onFirstClick = undefined,
  onConfirm,
  times = 2,
  messages,
  dialog,
  className,
}: ConfirmButtonsProps) => {
  const [timesPressed, setTimesPressed] = useState<number>(0);

  const handleClick = () => {
    setTimesPressed(timesPressed + 1);

    if (onFirstClick) onFirstClick();

    if (timesPressed + 1 === times) {
      onConfirm();
      setTimesPressed(0);
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      <span
        className="tooltip tooltip-top"
        data-tooltip={messages[timesPressed]}
      >
        {dialog[timesPressed]}
      </span>
    </button>
  );
};
