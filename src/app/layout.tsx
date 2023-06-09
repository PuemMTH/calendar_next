import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Table Share',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: {children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
