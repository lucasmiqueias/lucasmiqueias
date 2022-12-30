import Head from 'next/head'
import Link from 'next/link';
import { Work_Sans } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Work_Sans({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Lucas Miqueias</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <section>
          <h1 className={styles.title}>
            Lucas Miqueias
          </h1>
          <h2 className={styles.subTitle}>
          Product Designer morando em Natal, Brazil. 
          </h2>
          <p className={styles.description}>
            Atualmente trabao com Experiência do usuário na <a target="_blank" href="https://www.take.net/">Take Blip</a> atuando com descoberta de oportunidades e inteligencia artificial em projetos de chatbots (contato inteligente) para empresas.
          </p>
          <p className={styles.description}>
            Anteriormente Product Designer na <a target="_blank" href="https://klever.io/">Klever</a> atuando em projetos de interface visual para carteira digital e corretora de criptomoedas atigindo milhares de usuários em todo o mundo.
          </p>
          <ul className={styles.socialLinks}>
            <Link href="https://www.linkedin.com/in/lucasmiqueias/"><a target="_blank" rel="noopener noreferrer" >Linkedin</a></Link>
            <Link href="https://www.instagram.com/lucasmiqueias/"><a target="_blank" rel="noopener noreferrer">Instagram</a></Link>
            <Link href="https://medium.com/@lucasmiqueias"><a target="_blank" rel="noopener noreferrer">Medium</a></Link>
          </ul>
        </section>
      </div>
    </>
  )
}
