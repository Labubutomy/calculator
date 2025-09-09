import { useUnit } from 'effector-react';
import { Button } from '../../../components/ui/button';
import { ButtonTypes, calculateExpressionFx } from '../../../events/button';

export const Keyboard = () => {
  const isDisabled = useUnit(calculateExpressionFx.pending);
  return (
    // <div className="flex justify-center items-center">
    <div className="grid grid-cols-4 grid-rows-5 gap-2 p-3">
      <Button label="AC" type={ButtonTypes.CLEAR} isDisabled={isDisabled} />
      <Button
        label="("
        type={ButtonTypes.ADD_VALUE}
        value="("
        isDisabled={isDisabled}
      />
      <Button
        label=")"
        type={ButtonTypes.ADD_VALUE}
        value=")"
        isDisabled={isDisabled}
      />
      <Button
        label="÷"
        type={ButtonTypes.ADD_VALUE}
        value="/"
        variant="accent"
        isDisabled={isDisabled}
      />

      <Button
        label="7"
        type={ButtonTypes.ADD_VALUE}
        value="7"
        isDisabled={isDisabled}
      />
      <Button
        label="8"
        type={ButtonTypes.ADD_VALUE}
        value="8"
        isDisabled={isDisabled}
      />
      <Button
        label="9"
        type={ButtonTypes.ADD_VALUE}
        value="9"
        isDisabled={isDisabled}
      />
      <Button
        label="×"
        type={ButtonTypes.ADD_VALUE}
        value="*"
        variant="accent"
        isDisabled={isDisabled}
      />

      <Button
        label="4"
        type={ButtonTypes.ADD_VALUE}
        value="4"
        isDisabled={isDisabled}
      />
      <Button
        label="5"
        type={ButtonTypes.ADD_VALUE}
        value="5"
        isDisabled={isDisabled}
      />
      <Button
        label="6"
        type={ButtonTypes.ADD_VALUE}
        value="6"
        isDisabled={isDisabled}
      />
      <Button
        label="-"
        type={ButtonTypes.ADD_VALUE}
        value="-"
        variant="accent"
        isDisabled={isDisabled}
      />

      <Button
        label="1"
        type={ButtonTypes.ADD_VALUE}
        value="1"
        isDisabled={isDisabled}
      />
      <Button
        label="2"
        type={ButtonTypes.ADD_VALUE}
        value="2"
        isDisabled={isDisabled}
      />
      <Button
        label="3"
        type={ButtonTypes.ADD_VALUE}
        value="3"
        isDisabled={isDisabled}
      />
      <Button
        label="+"
        type={ButtonTypes.ADD_VALUE}
        value="+"
        variant="accent"
        isDisabled={isDisabled}
      />

      <Button
        label="0"
        type={ButtonTypes.ADD_VALUE}
        value="0"
        className="col-span-2"
        isDisabled={isDisabled}
      />
      <Button
        label="."
        type={ButtonTypes.ADD_VALUE}
        value="."
        isDisabled={isDisabled}
      />
      <Button
        label="="
        type={ButtonTypes.CALCULATE}
        variant="primary"
        isDisabled={isDisabled}
      />
    </div>
    // </div>
  );
};
