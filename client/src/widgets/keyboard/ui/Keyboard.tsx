import { Button } from "../../../components/ui/button";
import { ButtonTypes } from "../../../events/button";

export const Keyboard = () => {
  return (
    // <div className="flex justify-center items-center">
    <div className="grid grid-cols-4 grid-rows-5 gap-2 p-3">
      <Button label="AC" type={ButtonTypes.CLEAR} />
      <Button label="(" type={ButtonTypes.ADD_VALUE} value="(" />
      <Button label=")" type={ButtonTypes.ADD_VALUE} value=")" />
      <Button label="÷" type={ButtonTypes.ADD_VALUE} value="/" variant="accent" />

      <Button label="7" type={ButtonTypes.ADD_VALUE} value="7" />
      <Button label="8" type={ButtonTypes.ADD_VALUE} value="8" />
      <Button label="9" type={ButtonTypes.ADD_VALUE} value="9" />
      <Button label="×" type={ButtonTypes.ADD_VALUE} value="*" variant="accent" />

      <Button label="4" type={ButtonTypes.ADD_VALUE} value="4" />
      <Button label="5" type={ButtonTypes.ADD_VALUE} value="5" />
      <Button label="6" type={ButtonTypes.ADD_VALUE} value="6" />
      <Button label="-" type={ButtonTypes.ADD_VALUE} value="-" variant="accent" />

      <Button label="1" type={ButtonTypes.ADD_VALUE} value="1" />
      <Button label="2" type={ButtonTypes.ADD_VALUE} value="2" />
      <Button label="3" type={ButtonTypes.ADD_VALUE} value="3" />
      <Button label="+" type={ButtonTypes.ADD_VALUE} value="+" variant="accent" />

      <Button label="0" type={ButtonTypes.ADD_VALUE} value="0" className="col-span-2" />
      <Button label="." type={ButtonTypes.ADD_VALUE} value="." />
      <Button label="=" type={ButtonTypes.CALCULATE} variant="primary" />
    </div>
    // </div>
  );
};