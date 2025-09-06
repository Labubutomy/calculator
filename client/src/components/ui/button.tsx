import React from "react";
import { useUnit } from 'effector-react';
import { buttonClicked, ButtonTypes } from "../../events/button";

export interface ButtonProps {
  label: string;
  value?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  type: ButtonTypes;
}

export const Button = ({ className, type, ...props }: ButtonProps) => {
  const handleClick = useUnit(buttonClicked);

  const onClick = () => {
    switch (type) {
      case ButtonTypes.ADD_VALUE:
        const value = props.value || ""
        return handleClick({ type, value })
      case ButtonTypes.CALCULATE:
        return handleClick({ type })
      case ButtonTypes.CLEAR_HISTORY:
        return handleClick({ type })
      case ButtonTypes.CLEAR:
        return handleClick({ type })
    }
  }

  return (
    <button
      onClick={onClick}
      className={`${className} bg-${props.variant} border-border border rounded-xl pl-3 pr-3 pt-2 pb-2 text-lg`}
    >
      {props.label}
    </button>
  );
};
