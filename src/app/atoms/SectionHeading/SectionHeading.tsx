interface SectionHeadingProps {
  children: string;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-primary">
      {children}
    </h2>
  );
}
