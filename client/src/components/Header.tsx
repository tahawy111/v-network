
interface HeaderProps {

}

export default function Header({ }: HeaderProps) {
  return <nav className="w-full bg-main h-16 text-white flex items-center">
    <div className="w-full bg-main h-16 text-white flex items-center container mx-auto">
      <h1 className="text-2xl font-semibold">V-Network</h1>
      <div className=""></div>
    </div>
  </nav>;
}
