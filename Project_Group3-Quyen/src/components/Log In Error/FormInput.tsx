interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-gray-700">{label}:</label>
    <div className="px-4 py-3.5 rounded-lg border border-gray-300 border-solid">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-base text-gray-700 border-[none]"
      />
    </div>
  </div>
);
