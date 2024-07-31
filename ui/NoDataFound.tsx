export default function NoDataFound({ dataName, className = '' }: { dataName: string; className?: string }) {
  return <h1 className={`${className} text-4xl font-black`}>No "{dataName}" could be found..</h1>;
}
