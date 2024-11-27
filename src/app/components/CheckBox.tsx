interface CheckBoxProps {
  label: string;
  name: string;
}
export default function CheckBox({ label, name }: CheckBoxProps) {
  return (
    <div className='form-control'>
      <label className='flex flex-col p-0 cursor-pointer label' htmlFor={name}>
        <span className='label-text'> {label} </span>
        <input
          className='checkbox mt-3'
          type='checkbox'
          name={name}
          id={name}
        />
      </label>
    </div>
  );
}
