import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/music" className="text-3xl p-28 text-center text-black font-extrabold absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Enter Store</Link>
    </div>
  );
}
