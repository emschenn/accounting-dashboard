import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
type Props = {
  selectedOption: string;
  setSelectedOption: (s: string) => void;
  options: string[];
};

function Selector({ selectedOption, setSelectedOption, options }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" onClick={() => setOpen(!open)} ref={ref}>
      <div className="cursor-pointer "> {selectedOption}</div>
      {open && (
        <ul className="border-gray-500 absolute top-9 z-20 w-full rounded border bg-white px-3 text-base font-normal ">
          {options
            .filter((o) => o !== selectedOption)
            .map((o, i) => (
              <li
                key={o}
                className={`${
                  i !== 0 ? "border-t border-neutral-500" : ""
                } cursor-pointer py-1.5 hover:font-medium`}
                onClick={() => setSelectedOption(o)}
              >
                {o}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Selector;
