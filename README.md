# Entre Nos · Sabores del mundo — Landing

Landing mobile-first para **Entre Nos**, experiencia gastronómica a puertas cerradas en Córdoba Capital.
Next.js (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion, con export estático (`/out`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera /out (sitio estático)
npm start        # sirve /out localmente
```

## Estructura

```
app/            layout (fuentes, SEO, JSON-LD) y página
components/     una sección por archivo + ui/ (botones, fotos, ornamentos, íconos, animaciones)
data/           TODO el contenido editable
lib/            helpers: whatsapp.ts (waLink + mensajes), fechas.ts, track.ts (analítica)
public/images/  fotos (ver lista abajo)
```

Orden de la página (según el documento de estructura): Navbar · Hero · Por qué Entre Nos · Qué es un teanner · Nosotras · **Elegí tu experiencia** (mapa → caja con carta de 5 pasos y fotos de cada destino; calendario de Próximas fechas con banderas; cómo es la tarde) · Experiencias · Regalá una experiencia · Encargos · La casa · Invitados · Preguntas frecuentes · Lista de espera + Pasaporte · Footer · Botón flotante de WhatsApp.

## Cómo editar el contenido

| Qué | Archivo |
|---|---|
| **Próximas fechas** | `data/fechas.json` |
| Destinos del teanner (menús, fotos, sellos, colaboraciones) | `data/destinos.ts` · países y banderas del mapa en `data/paises.ts` |
| Experiencias (Teanner, Workshop, Privada, Eventos) | `data/experiencias.ts` |
| Encargos de pastelería | `data/encargos.ts` |
| Preguntas frecuentes | `data/faqs.ts` |
| Testimonios y reels | `data/testimonios.ts` |
| Hero, cómo funciona, cómo es la tarde (dentro de Elegí tu experiencia), regalos, nosotras, la casa, pasaporte, lista de espera, footer, SEO | `data/site.ts` |
| Mensajes precargados de WhatsApp | `lib/whatsapp.ts` |

### Fechas (`data/fechas.json`)

```json
{
  "id": "teanner-italia-1011",
  "tipo": "Teanner",          // Teanner | Workshop | Evento
  "destino": "Italia",
  "fecha": "2026-10-10",      // AAAA-MM-DD
  "horario": "17:00 hs",
  "cupos": 8,
  "disponibles": 5,           // 0 = AGOTADO · 1-2 = últimos lugares · 3+ = disponible
  "nota": "Con café de @rito.tostadores"
}
```

- El estado sale de `disponibles`, así la web nunca muestra una escasez que no existe.
- Las fechas pasadas se ocultan solas **al hacer el build** → después de editar, volver a buildear y subir.
- Las 3 fechas actuales tienen `"ejemplo": true` (se ven con la etiqueta EJEMPLO y no se publican como `Event` en el JSON-LD). Borrarlas o quitar esa línea al cargar fechas reales.
- La página no muestra precios en ningún lado: se consultan por WhatsApp.
- El hero muestra automáticamente la próxima fecha con lugares.
- Destino y colaboración: si el destino no tiene fecha, la tarjeta de "Elegí tu destino" cambia a "Avisame cuando vuelva".

## WhatsApp

1. Copiar `.env.example` a `.env.local` (o cargar la variable en Vercel).
2. Poner el número en formato internacional sin `+` ni espacios: `NEXT_PUBLIC_WHATSAPP=5493511234567`.
3. Volver a buildear.

Todos los botones usan `waLink(mensaje)` de `lib/whatsapp.ts`, con un mensaje distinto por sección (fecha puntual, destino sin fecha, workshop, privada, regalo, encargo, destino sugerido, lista de espera). Cada botón tiene `data-cta="seccion:detalle"` para medir qué sección convierte.

### Analítica (desactivada por defecto)

Cargar `NEXT_PUBLIC_GA4_ID` y/o `NEXT_PUBLIC_META_PIXEL_ID` en el `.env`. `components/Analytics.tsx` inyecta los scripts y envía un evento `cta_click` (GA4) / `CtaClick` (Meta) con el valor de `data-cta` en cada clic.

### Lista de espera

`site.listaEspera.action` en `data/site.ts`: URL de un endpoint (Formspree, Google Apps Script, etc.). Si queda vacío, el formulario valida los datos y abre WhatsApp con el pedido ya escrito.

## Imágenes

Mientras no estén, cada foto se muestra como un bloque con degradado de la paleta y el nombre del archivo que va ahí. Al copiar un archivo con ese nombre en `public/images/` y volver a buildear, aparece la foto real. **Solo fotos reales de ellas, nunca de stock.** Exportar en JPG calidad ~80, idealmente < 300 KB.

| Archivo | Dónde | Medida recomendada |
|---|---|---|
| `hero-mesa.jpg` | Hero (mesa larga con lámparas encendidas) | 2400×1600 (horizontal) |
| `og-entre-nos.jpg` | Imagen para compartir (WhatsApp, redes) | 1200×630 |
| `destino-italia.jpg` | Tarjeta destino | 1200×1500 (4:5) |
| `destino-nueva-york.jpg` | Tarjeta destino | 1200×1500 |
| `destino-mexico.jpg` | Tarjeta destino | 1200×1500 |
| `teanner-mesa.jpg` | Experiencias · Teanner | 1200×1440 (5:6) |
| `workshop-puglia.jpg` | Experiencias · Workshop | 1200×1440 |
| `privada-grupo.jpg` | Experiencias · Reserva privada | 1200×1440 |
| `evento-temporada.jpg` | Experiencias · Eventos | 1200×1440 |
| `encargo-carrot-cake.jpg` | Encargos | 1200×1200 (1:1) |
| `encargo-tarta-vasca.jpg` | Encargos | 1200×1200 |
| `encargo-baci-di-dama.jpg` | Encargos | 1200×1200 |
| `vero-y-pili.jpg` | Nosotras (polaroid) | 1000×1250 (4:5) |
| `manos-cocinando.jpg` | Nosotras (polaroid) | 1000×1250 |
| `casa-entrada.jpg` | La casa (grande) | 1600×1600 |
| `casa-mesa-larga.jpg` | La casa | 1200×900 |
| `casa-lamparas.jpg` | La casa | 1200×900 |
| `casa-vajilla.jpg` | La casa (vertical) | 900×1600 |
| `casa-platos.jpg` | La casa | 1200×900 |
| `casa-sobremesa.jpg` | La casa (ancha) | 1600×800 |

El hero admite reemplazarse por un video corto (8–15 s, sin sonido, comprimido) más adelante.

## Placeholders pendientes `[COMPLETAR]`

Se ven en la web con borde punteado para que sea fácil encontrarlos. Buscar `COMPLETAR` en `/data` para listarlos.

**Experiencia**
- Horario de llegada y duración del teanner (`site.ts` → laTarde; caja de cada destino).
- Qué incluye la experiencia / si hay alcohol.
- Horario de cada fecha (`fechas.json` → `horario`).
- Foto del Teanner **Chicago**, del Workshop Puglia y de la tarta vasca (hoy muestran un bloque con la hoja de la marca).
- Confirmar cupo del Workshop (hoy: Teanner y privada, 10 personas).

**Marca**
- Anécdota fundacional, primer teanner y significado de "Entre Nos" (`site.ts` → nosotras).
- Cómo quieren contar quién cocina ("Vero cocina, Pili te recibe" o las dos en la cocina).
- Beneficio del Pasaporte Entre Nos.

**Regalos y encargos**
- Formato, vigencia y canje de las invitaciones de regalo.
- Anticipación mínima y retiro/envío de encargos.

**Preguntas frecuentes** (`faqs.ts`): duración/horario, si se repiten los destinos, adaptación del menú a cada alimentación, forma de pago y seña, cancelación y cesión de lugar, qué pasa si se suspende la experiencia, si hace falta saber cocinar para el workshop, validez de la invitación de regalo, anticipación y envíos de encargos.

**Prueba social**
- Testimonios reales con permiso (`testimonios.ts`). **No inventar reseñas.**
- Links de reels de Instagram con permiso de cada creador.

**Técnico**
- WhatsApp: por defecto se usa el de Vero; los dos contactos (Vero y Pili) están en `site.ts` → `contactos`.
- Dominio definitivo (`NEXT_PUBLIC_SITE_URL`).
- Link a políticas de reserva (`site.ts` → footer.politicasHref).
- Endpoint de la lista de espera (opcional).
- IDs de GA4 y Meta Pixel (opcional).
- Fechas reales (reemplazar las 3 de ejemplo).

**A verificar antes de publicar**
- Registro del término "teanner" en el INPI (se usa como descriptor, la marca es "Entre Nos").
- El evento "Recibí la Primavera" (21/09) ya pasó: se menciona como ejemplo de formato, no como fecha.
- El destacado "Día de la Madre · 18 de octubre" en Regalos: poner `destacado: null` en `site.ts` cuando pase.

## Deploy

### GitHub Pages (link para compartir)
El repo incluye `.github/workflows/pages.yml`: cada push a `main` construye el sitio y lo publica en
**https://liriosmkt.github.io/entre-nos-landing/**

Activación (una sola vez):
1. En el plan gratis, el repo tiene que ser público: *Settings → General → Danger Zone → Change visibility*.
2. *Settings → Pages → Build and deployment → Source*: elegir **GitHub Actions**.
3. *Actions* → "Publicar en GitHub Pages" → *Run workflow* (o hacer cualquier push).
4. Número de WhatsApp: *Settings → Secrets and variables → Actions → Variables → New variable*, nombre `WHATSAPP`, valor `5493511234567`. Volver a correr el workflow.

### Vercel
1. Subir el proyecto a un repo de GitHub.
2. En vercel.com → *Add New Project* → importar el repo (detecta Next.js solo).
3. En *Environment Variables* cargar `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_SITE_URL` (y analítica si aplica).
4. Deploy. Cada push a `main` vuelve a publicar (y así se actualizan las fechas).
5. Conectar el dominio en *Settings → Domains*.

### Hostinger (hosting estático)
1. Crear `.env.local` con las variables.
2. `npm run build` → se genera la carpeta `out/`.
3. En hPanel → *Administrador de archivos* → `public_html/`: subir **el contenido** de `out/` (no la carpeta en sí).
4. Cada vez que se editen fechas o contenido: volver a buildear y reemplazar los archivos.

## Checklist técnico
- Mobile-first, probado en 375 px y 1280 px sin scroll horizontal.
- `lang="es-AR"`, HTML semántico, foco visible, acordeón con ARIA, menú mobile cerrable con Escape, link "Saltar al contenido".
- Animaciones sutiles (Framer Motion) que respetan `prefers-reduced-motion`; el hero entra con CSS para no depender de JS.
- SEO: title, description, Open Graph, JSON-LD `FoodEstablishment` (solo ciudad) y `Event` generado desde `fechas.json`.
