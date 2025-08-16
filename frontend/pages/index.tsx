import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl text-green-500">Home Page</h1>
      <Link href="/login" className="text-blue-500 underline">Go to Login</Link>
    </div>
  );
}
