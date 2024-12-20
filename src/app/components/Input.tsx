interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  onChangeCallback?: (e: any) => void;
  isRequired?: boolean;
  value?: string;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  name,
  value,
  isRequired = false,
  onChangeCallback,
}: InputProps) {
  return (
    <div className='flex flex-col'>
      <label className='text-left label-text' htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className='input input-bordered w-full max-w-xs'
        name={name}
        value={value}
        required={isRequired}
        id={name}
        {...(onChangeCallback && {
          onChange: onChangeCallback,
        })}
      />
    </div>
  );
}
