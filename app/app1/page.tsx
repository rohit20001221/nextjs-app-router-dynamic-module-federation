import Link from "next/link";

export default async function Home() {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello World");
    }, 5000);
  });

  return (
    <main>
      <Link href={"/"}>page1</Link>
      {data as string}
    </main>
  );
}
