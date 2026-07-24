# Brief de Proyecto — Sitio Web Fuente de Vida Nueva AC

## 1. Resumen del proyecto

Landing page corporativa para **Hogar de Rehabilitación Fuente de Vida Nueva AC**, centro con 20 años de experiencia en rehabilitación de alcoholismo, adicciones y otros problemas emocionales.

El desarrollo se realizará sobre una **plantilla base de HTML ya existente**. Ya se entregó un prompt inicial para adaptar dicha plantilla al negocio; este documento es el brief complementario con la información del negocio, el branding y los requerimientos visuales que debe cumplir el sitio final.

> **No se debe modificar ni reinventar la estructura de secciones de la plantilla base.** El desarrollador debe seguir la estructura ya definida en la plantilla, adaptando únicamente contenido, estilo, branding y efectos según lo indicado en este documento.

---

## 2. Información del negocio

**Nombre:** Hogar de Rehabilitación Fuente de Vida Nueva AC

**Teléfono / Informes:** 55 5838 7066

**Redes sociales:** [Facebook](https://www.facebook.com/share/1EWH9r3sDD/)

**Experiencia:** 20 años de experiencia respaldando la rehabilitación del alcoholismo, las adicciones y otros problemas emocionales.

### Compromiso
Brindar un espacio seguro, digno, cómodo y de calidad para acompañar a cada paciente en su proceso de rehabilitación y transformación personal.

### Enfoque
La rehabilitación no es solo dejar de consumir sustancias. El centro trabaja en la adquisición y reconstrucción de hábitos saludables, el fomento de la disciplina, el desarrollo de habilidades para la vida y la elaboración de un proyecto de vida personal a corto, mediano y largo plazo en todas las áreas de la vida del paciente.

### Modelo de Rehabilitación Mixto
El tratamiento se sostiene en tres bases fundamentales:

- **Cuerpo:** Desintoxicación, ejercicio, higiene y terapéuticas del bienestar integral.
- **Mental:** Tratamiento psicológico, psicosocial y emocional profesional.
- **Espiritual:** Principios espirituales, valores universales, sentido de vida y desarrollo espiritual.

### Problemáticas atendidas
- Alcoholismo
- Drogadicción y farmacodependencia
- Consumo de sustancias psicoactivas

### Método de recuperación
- Atención psicológica profesional
- Valoración psiquiátrica
- Consejería especializada en adicciones
- 12 pasos para la recuperación personal
- Formación en hábitos y disciplina personal
- Terapias individuales y grupales
- Superación personal

---

## 3. Branding

El branding se definió a partir del logo y las imágenes disponibles en la carpeta `imagenes/`. El logo actual es una paloma blanca en vuelo con una rama de olivo, sobre un amanecer y un camino entre montañas, enmarcada con un filo ornamental dorado. Esta imagen conecta directamente con el pilar **espiritual** del centro (paz, esperanza, nuevo comienzo, transformación), por lo que debe ser el eje de la identidad visual.

### Paleta de colores sugerida

| Uso | Color | HEX |
|---|---|---|
| Azul principal (confianza, calma) | Azul profundo | `#1B4F72` |
| Azul secundario (cielo del logo) | Azul cielo | `#5DA9E9` |
| Acento dorado (detalle ornamental del logo) | Dorado | `#C9A227` |
| Acento cálido (amanecer del logo) | Naranja amanecer | `#E8935B` |
| Base clara | Blanco | `#FFFFFF` |
| Texto principal | Gris oscuro | `#2B2B2B` |

### Tipografía sugerida
- **Títulos:** una tipografía serif elegante (ej. Playfair Display, Cormorant Garamond o similar) que transmita calidez, espiritualidad y jerarquía premium.
- **Cuerpo de texto:** una tipografía sans-serif limpia (ej. Inter, Poppins o similar) que garantice legibilidad y una lectura moderna.

### Identidad visual
Paz, esperanza, renovación y acompañamiento profesional. La comunicación visual debe evitar la frialdad clínica excesiva y balancear seriedad profesional con calidez humana y espiritual, reflejando tanto el respaldo de 20 años de experiencia como la contención emocional que ofrece el centro.

---

## 4. Estilo visual obligatorio

El sitio debe manejar:

- Estilo **premium, enterprise y de marca corporativa**.
- Nivel **big tech**: elegante y a la vez minimalista.

---

## 5. Efectos y animaciones requeridos

- Efectos visuales y animaciones activadas por scroll.
- Pantalla de carga (**preloader**) con spinner + logo del negocio.
- Animación en el título del hero: efecto máquina de escribir, cambio de color en las letras u otros efectos tipográficos.

---

## 6. Instrucciones sobre assets

- El logo (`imagenes/logo.jpeg`) viene **con fondo**: se debe remover el fondo antes de usarlo en el sitio (dejar únicamente la paloma con la rama de olivo, en PNG con transparencia), tanto para el header/navbar como para el preloader.
- El resto de las imágenes de la carpeta `imagenes/` corresponden a fotografías de las instalaciones del centro; deben revisarse y usarse únicamente aquellas que estén en buen estado y aporten valor visual al sitio.

---

## 7. Nota para el desarrollador

Este brief es un punto de partida. El desarrollador puede **iterar sobre el proyecto dándole instrucciones a Claude las veces que sea necesario** hasta lograr el resultado deseado, tanto para ajustes de diseño como de contenido.

---

## 8. Checklist de trabajo

- [ ] Remover el fondo del logo (`imagenes/logo.jpeg`) y exportarlo en PNG transparente.
- [ ] Aplicar la paleta de colores definida (sección 3) sobre la plantilla base.
- [ ] Aplicar la tipografía sugerida (títulos y cuerpo).
- [ ] Adaptar todos los textos de la plantilla con la información del negocio (sección 2).
- [ ] Implementar preloader con spinner + logo del negocio.
- [ ] Implementar animación de máquina de escribir / cambio de color en el título del hero.
- [ ] Implementar animaciones y efectos activados por scroll en el resto del sitio.
- [ ] Asegurar estilo premium, enterprise y minimalista en todo el sitio.
- [ ] Incluir teléfono de contacto (55 5838 7066) y enlace a Facebook.
- [ ] Revisar y seleccionar las fotografías de instalaciones aptas para publicar.
- [ ] Iterar con Claude Code hasta alcanzar el resultado final deseado.
