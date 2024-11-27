import { ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  name: string;
  label: string;
  defaultChecked?: boolean;
}

export default function Tab({
  children,
  name,
  label,
  defaultChecked,
}: TabProps) {
  return (
    <>
      <input
        type='radio'
        name={name}
        role='tab'
        className='tab [--tab-border-color:#A6ADBB] !w-max'
        aria-label={label}
        {...(defaultChecked && { defaultChecked })}
      />
      <div
        role='tabpanel'
        className='tab-content bg-base-100 border-[#A6ADBB] rounded-box p-6'
      >
        {children}
      </div>
    </>
  );
}
