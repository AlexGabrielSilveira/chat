import './globals.css'
import { Roboto} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['700'] })

export const metadata = {
  title: 'Chat',
  description: 'maked by alex',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
