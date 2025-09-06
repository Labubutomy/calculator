export interface ScreenProps {
  expression?: string,
  result?: string,

  width?: string,
  minHeight?: string,

  className?: string,

  resultSize?: string,
  expressionSize?: string,
  isPadding?: boolean,

  // expression?: string,
  // result?: string,
}

export const Screen = ({ result = "", expression = "", width = "100%", minHeight = "min-h-94px", resultSize = "text-4xl", expressionSize = "text-lg", isPadding = true, ...props }: ScreenProps) => {

  return (
    <div className={`w-[${width}] ${minHeight} ${isPadding ? "p-3" : ""} ${props.className} truncate w-22`}>
      {result && (
        <div className={`text-lg text text-left text-secondary-foreground ${expressionSize}`}>
          {expression.replace("=", "").trim()}
        </div>
      )}

      <div className={`text-4xl text-right ${resultSize}`}>
        {result || expression}
      </div>
    </div>
  );
}