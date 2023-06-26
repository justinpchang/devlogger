import { Dispatch, SetStateAction, useState } from "react";
import { CheckIcon, ChevronUpDownIcon, FolderIcon } from "@heroicons/react/20/solid";
import { Combobox as _Combobox } from "@headlessui/react";

export interface ComboboxOption {
  id: string;
  name: string;
}

interface Props {
  value: ComboboxOption | null;
  setValue: Dispatch<SetStateAction<ComboboxOption | null>>;
  options: ComboboxOption[];
  className?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Combobox({ value, setValue, options, className }: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <_Combobox as="div" value={value} onChange={setValue}>
      <div className={"relative mt-2" + className}>
        <_Combobox.Button className="flex items-center">
          <FolderIcon className="h-5 w-5 mt-[-2px]" />
          <_Combobox.Input
            className="w-full rounded-md bg-white p-1.5 pr-10 text-gray-900 border-0 focus:outline-0 focus:border-0 focus:ring-transparent sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option: ComboboxOption) => option?.name}
          />
          <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </_Combobox.Button>

        {filteredOptions.length > 0 && (
          <_Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <_Combobox.Option
                key={option.id}
                value={option}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-mulberry-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames("block truncate", selected ? "font-semibold" : "")}>
                      {option.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-mulberry-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </_Combobox.Option>
            ))}
          </_Combobox.Options>
        )}
      </div>
    </_Combobox>
  );
}

export default Combobox;
