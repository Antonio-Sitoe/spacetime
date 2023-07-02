import './globals.css'
import { Inter, Roboto_Flex, Bai_Jamjuree } from 'next/font/google'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: "--font-roboto" })
const baiJamJuree = Bai_Jamjuree({ subsets: ['latin'], weight: "700", variable: "--font-bai-jamjuree" })

export const metadata = {
  title: 'NLW NextTime',
  description: 'Uma capsula do tempo construida com React, Nextjs, Typescript e tailWindcss',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans text-gray-100 bg-gray-900`}>{children}</body>
    </html>
  )
}
