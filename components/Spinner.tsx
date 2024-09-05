type SpinnerType = { className?: string };

export default function Spinner({ className }: SpinnerType) {
  return <div className={`${className} spinner`} />;
}
