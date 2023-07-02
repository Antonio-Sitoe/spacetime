import Link from "next/link"

import { User } from 'lucide-react'
import Image from "next/image";
import NlwLogo from '../assets/nlw-spacetime-logo.svg'

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden bg-[url(../assets/bg-stars.svg)]">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 rounded-full blur-full" />
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-stripes" />

        <a href="" className="flex items-center gap-3 text-left hover:text-gray-50 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-small leading-snug"><span className="underline">Crie sua conta</span> e salve as suas Memorias</p>
        </a>
        {/* hero */}

        <div className="space-y-5">
          <Image src={NlwLogo} alt="logotipo" />
          <div className="max-w-[420px] space-y-4">
            <h1 className="mt-5 text-5xl font-bold leading-tight text-gray-50">
              Sua capsula do tempo
            </h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos da sua jornada e compartilhe (se quiser) com o Mundo
            </p>
          </div>
          <a href="" className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-small leading-none uppercase text-black hover:bg-green-600">CADASTRAR LEMBRANCA</a>
        </div>

        <p className="text-sm leading-relaxed text-gray-200">Feito com Amor (Antonio Sitoe)</p>

      </div>
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center leading-relaxed w-[360px]">Voce ainda nao cadastrou nenhuma lembranca {" "}
            <a href="" className="underline hover:text-gray-50">Criar agora</a></p>
        </div>
      </div>
    </main>
  );
}
