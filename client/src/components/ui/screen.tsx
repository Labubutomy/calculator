import { cva, VariantProps } from 'class-variance-authority';

export interface ScreenProps {
  expression: string;
  result: string;

  className?: string;
  isCalculateError?: boolean;
  isCalculating?: boolean;
}

const screen = cva('', {
  variants: {
    variant: {
      main: 'text-4xl p-3',
      history: 'text-2xl mt-2',
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

const expressionField = cva(
  'text-left text-secondary-foreground overflow-hidden',
  {
    variants: {
      variant: {
        main: 'text-lg',
        history: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'main',
    },
  }
);

const enteryField = cva('text-right overflow-hidden', {
  variants: {
    variant: {
      main: 'text-4xl',
      history: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

export const Screen = ({
  result,
  expression,
  className,
  variant,
  ...props
}: VariantProps<typeof screen> & ScreenProps) => {
  return (
    <div className={screen({ variant, className })}>
      {props.isCalculateError === true ? (
        <div className="text-red-500 text-right">Error</div>
      ) : (
        <div>
          {result && (
            <div className={expressionField({ variant })}>
              {expression.replace('=', '').trim()}
            </div>
          )}

          <div className={enteryField({ variant })}>
            <span
              className={
                props.isCalculating ? 'text-secondary-foreground' : undefined
              }
            >
              {result || expression}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
