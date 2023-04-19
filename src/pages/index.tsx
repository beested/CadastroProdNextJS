import { Footer } from '@/Components/Footer'
import { Header } from '@/Components/Header'
import { ProdTabela } from '@/Components/ProdTabela'
import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <Header />
      <ProdTabela />
      <Footer />
    </ChakraProvider>
  )
}
