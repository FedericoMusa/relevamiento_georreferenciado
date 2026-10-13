# Relevamiento Georreferenciado Offline

Aplicación web progresiva (PWA) ligera, autónoma y sin dependencias externas para inspección técnica, relevamiento de infraestructura y captura de puntos georreferenciados en campo sin conexión a internet.

Los datos se almacenan localmente en el dispositivo y son exportables a GeoJSON (compatible con QGIS/ArcGIS) y JSON estructurado.

---

## 📱 Instalación en el celular (PWA Offline)

La herramienta funciona como una aplicación nativa sin pasar por tiendas de aplicaciones, requiriendo conexión **únicamente la primera vez** para cachear los archivos.

### Requisitos previos
* Dispositivo con sensor GPS/GNSS integrado.
* Navegador moderno (Google Chrome en Android, Safari en iOS).
* Servidor con protocolo HTTPS (obligatorio para que el navegador habilite los sensores de ubicación y el Service Worker, por ejemplo GitHub Pages).

---

### En Android (Google Chrome)
1. Abrí el enlace del relevamiento en Chrome con datos móviles o Wi-Fi.
2. Tocá los **tres puntos verticales (⋮)** en la esquina superior derecha.
3. Seleccioná **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.
4. Confirmá en **Instalar**. 
5. Se creará un acceso directo en el cajón de aplicaciones. A partir de este momento, podés abrirla en modo avión o sin cobertura.

> **Importante:** Asegurate de conceder el permiso de **"Ubicación precisa"** cuando el navegador o la app lo soliciten.

---

### En iOS / iPhone (Safari)
1. Abrí el enlace en **Safari** (obligatorio para instalar PWAs en iOS).
2. Tocá el botón de **Compartir** (ícono del cuadrado con flecha hacia arriba en la barra inferior).
3. Hacé scroll hacia abajo y seleccioná **"Agregar a la pantalla de inicio"**.
4. Tocá **"Agregar"** en la esquina superior derecha.
5. Abrí la app desde la pantalla de inicio y aceptá los permisos de ubicación "Al usar la app".

---

## 🛰️ Pautas operativas para captura GNSS sin internet

En áreas remotas (sin cobertura celular), el dispositivo no cuenta con A-GPS (asistencia de antenas móviles) y debe sincronizar efemérides directamente desde los satélites en frío (*cold fix*):

1. **A cielo abierto:** Evitá iniciar la sincronización dentro de vehículos, casetas o debajo de estructuras metálicas densas. Mantené el teléfono orientado hacia el cielo despejado.
2. **Sincronización progresiva:** Al presionar **📍 Sincronizar GPS**, la app mantendrá una escucha activa (`watchPosition`). Verás en pantalla el margen de error descendiendo en metros (`±45m`, `±25m`, `±12m`).
3. **Fijación automática vs. manual:**
   * **Automática:** Si la precisión alcanza $\le 15$ metros, el punto se consolida solo y detiene el sensor para ahorrar batería.
   * **Manual:** Si estás en una zona con visibilidad satelital reducida (cañadones, vegetación densa) y la precisión se estanca (ej: $\pm 22$ m), podés presionar **⚠️ Aceptar precisión actual** para fijar la coordenada sin perder el tiempo de inspección.

---

## 📁 Flujo de trabajo y exportación

* **Almacenamiento local:** Todo el catálogo se guarda en la memoria del navegador (`LocalStorage`). Las fotos tomadas se reescalan y comprimen automáticamente a ~100 KB para evitar saturar el almacenamiento.
* **Exportación GeoJSON:**