import { ChangeEvent } from "preact/compat";

interface InputBoxInputs {
  label: string;
  placeholder: string;
  type?: string;
  onChange: any;
}

export const InputBox = ({
  label,
  placeholder,
  type,
  onChange,
}: InputBoxInputs) => {
  return (
    <div>
      <div className="mt-2">
        <label
          for={label}
          class="block mb-2 font-medium text-gray-900 dark:text-black text-left"
        >
          {label}
        </label>
        <input
          type={type || "text"}
          class="bg-gray-50 border text-gray-900 text-base rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};
