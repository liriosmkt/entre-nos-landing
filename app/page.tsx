import { ComoFunciona } from "@/components/ComoFunciona";
import { Encargos } from "@/components/Encargos";
import { Experiencias } from "@/components/Experiencias";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LaCasa } from "@/components/LaCasa";
import { ListaEspera } from "@/components/ListaEspera";
import { Navbar } from "@/components/Navbar";
import { Nosotras } from "@/components/Nosotras";
import { PorQue } from "@/components/PorQue";
import { Regalos } from "@/components/Regalos";
import { Testimonios } from "@/components/Testimonios";
import { Viajes } from "@/components/Viajes";
import { WhatsAppFlotante } from "@/components/WhatsAppFlotante";

// Recorrido: emoción → explicación → acción → confianza → ventas complementarias → cierre
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <PorQue />
        <ComoFunciona />
        <Nosotras />
        <Viajes />
        <Experiencias />
        <Regalos />
        <Encargos />
        <LaCasa />
        <Testimonios />
        <Faq />
        <ListaEspera />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}
