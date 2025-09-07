import React from 'react';
import { useUnit } from 'effector-react';
import { buttonClicked, ButtonTypes } from '../../events/button';
import { cva, VariantProps } from 'class-variance-authority';

export interface ButtonProps {
  label: string;
  value?: string;
  className?: string;
  type: ButtonTypes;
  isDisabled?: boolean;
}

const button = cva(
  'border-border border rounded-xl px-3 py-2 text-lg disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  }
);

export const Button = ({
  className,
  type,
  variant,
  ...props
}: VariantProps<typeof button> & ButtonProps) => {
  const handleClick = useUnit(buttonClicked);

  const onClick = () => {
    handleClick({ type, value: props.value });
  };

  return (
    <button
      disabled={props.isDisabled}
      onClick={onClick}
      className={button({ className, variant })}
    >
      {props.label}
    </button>
  );
};
