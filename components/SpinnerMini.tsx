import { BiLoaderAlt } from 'react-icons/bi';

type MiniSpinnerType = { className?: string };

export default function Spinner({ className }: MiniSpinnerType) {
  return <BiLoaderAlt className={`${className} spinner-mini text-primary-yellow-dark`} />;
}
