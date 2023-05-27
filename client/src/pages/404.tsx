import Link from "next/link";

interface NotFoundProps {
  
}

export default function NotFound({ }: NotFoundProps) {
  return <div className="flex justify-center items-center h-screen flex-col gap-y-3">
            <h1 className="text-3xl text-slate-800 font-semibold">404 | Not Found</h1>
            <Link href={`/`} className="btn-dark">Back to home page</Link>
  </div>
}
