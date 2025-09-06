import { Button } from "../../../components/ui/button";
import { Screen } from "../../../components/ui/screen";
import { ButtonTypes } from "../../../events/button";
import { useUnit } from "effector-react";
import { $history } from "../../../events/button"

export const History = () => {
  const history = useUnit($history)

  return (
    <div className="p-6 rounded-lg border w-[200px] ml-4 flex flex-col">
      <div className="mb-3 text-left mt-0">
        <p className="text-bold text-xl">History</p>
      </div>
      {history?.length !== 0 ?
        <div className="flex flex-col h-[100%]">
          <div>
            {history?.map((item) => (
              <Screen
                expression={item.split("=")[0].trim()}
                result={item.split("=")[1].trim()}
                resultSize="text-2xl"
                isPadding={false}
                expressionSize="text-sm"
              />
            ))}

            {/* <Screen resultSize="text-2xl" isPadding={false} expressionSize="text-sm"/>
            <Screen resultSize="text-2xl" isPadding={false} expressionSize="text-sm"/>
            <Screen resultSize="text-2xl" isPadding={false} expressionSize="text-sm"/> */}
          </div>
          <div className="mb-0 mt-auto">
            <Button label="ClearHistory" type={ButtonTypes.CLEAR_HISTORY} className="w-full text-base" />
          </div>
        </div>
        :
        <div className="m-auto bold">
          No history :(
        </div>

      }
    </div>
  );
}