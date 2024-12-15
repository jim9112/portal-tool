interface HeadingProps {
  children: string;
}

export function H1({ children }: HeadingProps) {
  return <h1 className='text-3xl font-heading text-center mb-3'>{children}</h1>;
}
