interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  onChangeCallback?: (e: any) => void;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  name,
  onChangeCallback,
}: InputProps) {
  return (
    <div className='flex flex-col'>
      <label className='text-left label-text' htmlFor={name}>
        {label}
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className='input input-bordered w-full max-w-xs'
        name={name}
        id={name}
        {...(onChangeCallback && {
          onChange: onChangeCallback,
        })}
      />
    </div>
  );
}
