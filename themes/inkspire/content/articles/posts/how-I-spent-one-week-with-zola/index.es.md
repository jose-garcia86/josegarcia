+++
title = "Como pasé una semana con Zola"
description = "Le di a Zola siete días para demostrar su valía. Aquí está lo que sucedió cuando reconstruí mi blog con un generador de sitios estáticos impulsado por Rust que prometía simplicidad y velocidad."
date = 2025-11-20
lang = "es"

[taxonomies]
categories = ["Simple Post"]
tags = ["Zola", "Bloging"]

[extra]
featured = false
image = ""
+++


Llevaba meses posponiendo la reconstrucción de mi blog. Sabía que quería alejarme de mi configuración actual, pero cada generador de sitios estáticos que miraba parecía requerir demasiada sobrecarga. Entonces me encontré con Zola, y algo sobre la propuesta de "binario único, cero dependencias" me hizo lo suficientemente curioso como para darle una oportunidad real.

Me di una semana. Siete días para evaluar Zola, reconstruir mi sitio y decidir si esta era la herramienta que había estado buscando. Aquí está lo que realmente sucedió.

## Día 1: Configuración y primeras impresiones

La instalación fue casi anticlimática. Descargar un binario, añadirlo a mi PATH, ejecutar `zola init`. Sin entorno virtual, sin esperar la barra de progreso de npm install, sin resolución de dependencias. Simplemente... listo.

Pasé el resto del día uno leyendo la documentación y configurando la estructura básica. Los docs están bien organizados y sorprendentemente concisos. En unas pocas horas, tenía un sitio básico funcionando con `zola serve`, y la recarga en vivo era notablemente rápida. No rápido "lo suficiente"—realmente rápido.

La sintaxis de plantillas Tera se sintió inmediatamente familiar. Si has usado Jinja2 (y yo lo he hecho), básicamente ya estás entrenado. Armé una plantilla base simple y un diseño de post, y estaba renderizando Markdown para la noche.

**Veredicto del día 1:** Esto es refrescantemente simple. Cautelosamente optimista.

## Día 2: Migración de contenido y estructura

Pasé el día dos migrando mis posts de blog existentes y descubriendo el modelo de contenido de Zola. Aquí es donde la estructura dogmática se hizo aparente.

Zola quiere que organices el contenido en secciones. Cada sección es un directorio con un archivo `_index.md`. Las páginas son archivos markdown individuales. Es más estructurado que simplemente tirar archivos markdown en cualquier lugar, pero una vez que entendí el patrón, tuvo sentido.

El formato del front matter era ligeramente diferente de lo que estaba usando antes, así que escribí un script rápido para convertir mis posts. Nada complicado—principalmente ajustando formatos de fecha y campos de metadatos.

Lo que me sorprendió fue lo rápido que Zola reconstruía el sitio incluso mientras añadía más contenido. Estoy acostumbrado a que los SSG se ralenticen a medida que crece el contenido. Zola simplemente... no lo hizo.

**Veredicto del día 2:** La estructura dogmática requiere algo de ajuste pero vale la pena en claridad.

## Día 3: Soporte multilingüe

Necesitaba que mi sitio funcionara tanto en inglés como en español. Aquí es donde esperaba dolor, porque el soporte multilingüe suele ser una idea tardía o una pesadilla de configuración compleja.

El soporte multilingüe de Zola es sorprendentemente directo. Añades `default_language` a tu configuración, defines tus idiomas y creas contenido con códigos de idioma en los nombres de archivo (como `about.es.md`). Eso es todo. Zola maneja el enrutamiento y el cambio.

Pasé tal vez dos horas configurando esto, incluyendo crear versiones traducidas de mis plantillas. El cambio de idioma simplemente funcionó. Sin plugins, sin reglas de enrutamiento complejas, sin confusión.

**Veredicto del día 3:** Así es como el soporte multilingüe debería funcionar en todas partes.

## Día 4: Construyendo las funcionalidades que realmente quiero

El día cuatro se trató de construir las funcionalidades que realmente necesitaba: una sección de posts destacados, paginación apropiada, páginas de etiquetas y feeds RSS.

RSS ya estaba integrado. Solo habilitarlo en la configuración. Listo.

La paginación está integrada. Añade unas pocas líneas a tu plantilla. Listo.

Las taxonomías (etiquetas, categorías) son conceptos de primera clase. Configúralas una vez, úsalas en todas partes.

La sección de posts destacados requirió un poco más de reflexión. Añadí un campo `featured` al front matter de mis posts, luego filtré los posts en mi plantilla:

```
{% set featured = section.pages | filter(attribute="extra.featured", value=true) %}
```

Limpio, legible, funciona perfectamente. Para el final del día cuatro, mi sitio tenía todas las funcionalidades que quería, y no había escrito ningún plugin o script externo.

**Veredicto del día 4:** Las funcionalidades integradas cubren el 90% de lo que realmente necesitas.

## Día 5: Estilización con Sass

No me encanta escribir CSS, pero sí me gusta Sass para organización y variables. Zola compila Sass desde el principio.

Creé un directorio `sass`, escribí mis estilos con anidación y variables, y Zola simplemente lo manejó. Sin configuración de webpack, sin dependencias adicionales, sin scripts de compilación. Se compiló al guardar y los cambios aparecieron inmediatamente.

Aquí es donde la filosofía de "baterías incluidas" realmente hizo clic. Cada vez que esperaba necesitar una herramienta o plugin extra, Zola ya lo tenía integrado.

**Veredicto del día 5:** Cuanto más uso Zola, menos tengo que configurar.

## Día 6: Pulido y refinamientos

El día seis fue limpieza: mejorar plantillas, añadir metadatos apropiados, probar la compilación con diferente contenido, y asegurarme de que todo funcionara correctamente.

Experimenté con los shortcodes de Zola para incrustar contenido en Markdown. Son directos—define una plantilla, llámala desde markdown. Construí un par para galerías de imágenes y ejemplos de código.

También probé la compilación de producción. La salida es limpia, mínima y rápida. Zola no añade JavaScript innecesario o hinchazón. Lo que construyes es lo que obtienes.

**Veredicto del día 6:** El pulido está en los detalles que Zola hizo bien.

## Día 7: Despliegue y reflexión

El día final se trató del despliegue. Empujé a GitHub, configuré una GitHub Action simple que descarga Zola, construye el sitio y despliega a GitHub Pages. Todo el script CI es de unas 15 líneas.

Sin instalar Node.js en CI, sin pip instalando dependencias, sin capas de caché para acelerar compilaciones repetidas. Descargar un binario, ejecutar un comando, desplegar.

Mientras miraba lo que había construido en una semana, me di cuenta de algo: había pasado la mayor parte de mi tiempo construyendo mi sitio, no configurando mi herramienta de compilación. No estaba depurando conflictos de plugins o luchando con documentación complicada. Estaba escribiendo plantillas, estilizando páginas y migrando contenido.

**Veredicto del día 7:** Esto es lo que he estado buscando.

## Lo que aprendí sobre Zola

**La velocidad es real.** No es marketing. Las reconstrucciones son genuinamente lo suficientemente rápidas como para que el ciclo de retroalimentación se sienta instantáneo. Esto importa más de lo que pensarías—te mantiene en flujo en lugar de esperar.

**Baterías incluidas funciona.** Estoy acostumbrado a que los generadores de sitios estáticos sean núcleos mínimos que extiendes con plugins. El enfoque de Zola de incluir todo es diferente, pero es eficiente. Nunca tuve que evaluar plugins o preocuparme por compatibilidad.

**La estructura dogmática ayuda.** Al principio, el modelo de contenido estructurado de Zola se sintió restrictivo. Para el día tres, lo aprecié. Las restricciones hacen las cosas predecibles, y predecible significa menos tiempo decidiendo cómo organizar las cosas.

**Tera es excelente.** Las plantillas son lo suficientemente poderosas para cualquier cosa que necesitara pero lo suficientemente simples para leer seis meses después. La inspiración de Jinja2 fue la decisión correcta.

**Cero dependencias no es solo una característica—es una filosofía.** No gestionar versiones de Python, paquetes npm o entornos virtuales eliminó una categoría completa de problemas. Mi proyecto es mi contenido y mis plantillas. Eso es todo.

## Lo que extrañé (brevemente)

El ecosistema de plugins. Cuando quería algo personalizado, tenía que construirlo en plantillas en lugar de buscar un plugin. Esto estuvo bien en realidad—Tera es lo suficientemente capaz—pero hubo momentos en los que deseé un script de Python o paquete npm.

El ecosistema de temas es más pequeño. Construí mi propio diseño, que de todos modos quería hacer, pero si esperas tomar un tema pulido e irte, las opciones son limitadas.

## El veredicto

Siete días después, me quedo con Zola.

Esto no es porque Zola haga cosas que otros generadores de sitios estáticos no puedan—es porque Zola hace menos cosas pero las hace con menos fricción. La simplicidad no es simplista; es intencional.

Llegué escéptico de que una herramienta pudiera ser tanto poderosa como simple. Zola me demostró que estaba equivocado siendo dogmática sobre las cosas correctas y flexible sobre todo lo demás.

Mi blog está en vivo, las compilaciones son rápidas, el desarrollo es agradable, y tengo cero dependencias que mantener. Si eso suena atractivo, dale a Zola una semana. Podrías sorprenderte de cuánto puedes construir cuando la herramienta se quita del medio.

## Recursos que ayudaron

- La documentación oficial de Zola (comienza aquí)
- La documentación de plantillas Tera (para plantillas avanzadas)
- Las discusiones de GitHub de Zola (comunidad útil)
- Sitios de ejemplo en el showcase de Zola (ver implementaciones reales ayuda)

¿Recomendaría Zola? Si quieres simplicidad, velocidad, y no necesitas ecosistemas de plugins extensos, absolutamente. Si necesitas integraciones complejas con Python o quieres miles de temas para elegir, busca en otro lugar.

Para mí, Zola dio en el punto ideal: lo suficientemente poderoso para lo que necesito, lo suficientemente simple para mantenerse fuera de mi camino. Una semana fue suficiente para estar convencido.
