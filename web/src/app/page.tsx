import { Hero } from "@/components/Hero";
import { SignIn } from "@/components/SignIn";
import { Copyright } from "@/components/Copyright";
import { EmptyMemories } from "@/components/EmptyMemories";
import { cookies } from "next/headers";
import { Profile } from "@/components/Profile";

export default function Home() {
  const isAuthenticated = cookies().has("token")
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden bg-[url(../assets/bg-stars.svg)]">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 rounded-full blur-full" />
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-stripes" />
        {isAuthenticated ? <Profile /> : <SignIn />}
        <Hero />
        <Copyright />
      </div>
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  );
}
