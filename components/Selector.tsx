import React, { useState, Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";

type Data = {
  id: number;
  name: string;
  icon?: string;
};

type Props = {
  icon: JSX.Element;
  data: Data[];
  selected: Data;
  setSelected: (value: Data) => void;
};

function Selector({ icon, data, selected, setSelected }: Props) {
  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative ">
          <Listbox.Button className="relative flex max-w-[8rem] items-center gap-x-2 rounded-full bg-neutral-200 py-1.5 px-4">
            <div className="h-5 w-5 shrink-0">{icon}</div>
            <div className="block truncate">{selected.name}</div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-neutral-100 py-1 text-sm shadow-md">
              {data.map((d) => (
                <Listbox.Option
                  key={d.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-1.5 px-4 pl-12 text-gray-900 ${
                      active ? "bg-neutral-200 text-grass" : ""
                    }`
                  }
                  value={d}
                >
                  {({ selected }) => (
                    <span
                      className={`truncate ${
                        selected
                          ? "font-semibold text-neutral-600"
                          : "font-normal"
                      }`}
                    >
                      {d.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default Selector;
