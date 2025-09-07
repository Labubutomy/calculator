import { Display } from '../../display/ui/Display';
import { History } from '../../history/ui/History';
import { Keyboard } from '../../keyboard/ui/Keyboard';

export const Calculator = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg border-border border raunded min-h-[428px] flex">
      {/* <h1 className="p-3 text-3xl">Calculator</h1> */}
      <div className="flex items-center justify-between mb-0">
        <div className="mb-0 mt-auto w-[255px]">
          <Display />
          <Keyboard />
        </div>
        <div className="flex mt-0 mb-auto min-h-[388px]">
          <History />
        </div>
      </div>
    </div>
  );
};
