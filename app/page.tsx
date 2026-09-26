import { ComoFunciona } from "@/components/ComoFunciona";
import { Destinos } from "@/components/Destinos";
import { Encargos } from "@/components/Encargos";
import { Experiencias } from "@/components/Experiencias";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LaCasa } from "@/components/LaCasa";
import { LaTarde } from "@/components/LaTarde";
import { ListaEspera } from "@/components/ListaEspera";
import { Navbar } from "@/components/Navbar";
import { Nosotras } from "@/components/Nosotras";
import { ProximasFechas } from "@/components/ProximasFechas";
import { Regalos } from "@/components/Regalos";
import { Testimonios } from "@/components/Testimonios";
import { WhatsAppFlotante } from "@/components/WhatsAppFlotante";

// Recorrido: emoción → explicación → acción → confianza → ventas complementarias → cierre
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <ComoFunciona />
        <LaTarde />
        <Nosotras />
        <ProximasFechas />
        <Destinos />
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
