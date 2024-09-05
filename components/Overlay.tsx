type OverlayProps = {
  bgOpacity?: string;
  bgColor?: string;
  backdropBlur?: string;
};

export default function Overlay({
  bgOpacity = 'bg-opacity-80',
  bgColor = 'bg-zinc-950',
  backdropBlur = '',
}: OverlayProps) {
  return <div className={`${bgOpacity} ${bgColor} ${backdropBlur} absolute z-10 h-full w-full`} />;
}
