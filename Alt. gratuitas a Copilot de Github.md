# Alternativas Gratuitas a GitHub Copilot para VS Code

Guía rápida con las mejores opciones de Inteligencia Artificial que puedes integrar directamente en tu instalación actual de Visual Studio Code sin pagar una suscripción.

---

## 📋 Resumen de Opciones Principales

| Extensión | Plan Gratuito | Especialidad | Requisitos |
| :--- | :--- | :--- | :--- |
| **Codeium** | Ilimitado (Chat + Autocompletado) | Experiencia completa todo en uno | Cuenta gratuita en su web |
| **Supermaven** | Ilimitado (Solo autocompletado) | Velocidad extrema y contexto grande | Cuenta gratuita en su web |
| **Continue** | Ilimitado (Interfaz de código abierto) | Flexibilidad y control absoluto | Clave API externa (ej. Gemini) |

---

## 🛠️ Guía de Instalación y Configuración

### 1. Codeium
Es la alternativa gratuita más robusta y similar a la experiencia completa de GitHub Copilot.

* **Cómo instalarlo:**
  1. Abre el panel de extensiones en VS Code (`Ctrl+Shift+X` o `Cmd+Shift+X`).
  2. Busca **Codeium** y haz clic en **Instalar**.
  3. Haz clic en el icono de perfil que aparece en la barra de estado inferior para registrar tu cuenta gratuita.
* **Uso principal:** Genera sugerencias automáticas en gris mientras escribes (se aceptan con `Tab`) y cuenta con un panel de chat lateral para explicar, refactorizar o generar funciones completas.

### 2. Supermaven
Destaca por encima de todos sus competidores por su motor de autocompletado ultra veloz y su capacidad para entender archivos masivos de código.

* **Cómo instalarlo:**
  1. Busca **Supermaven** en la tienda de extensiones de VS Code e instálalo.
  2. En la barra inferior derecha, haz clic en el botón de activación.
  3. Introduce tu correo electrónico para activar el *Free Tier*.
* **Uso principal:** Diseñado específicamente para autocompletado predictivo en tiempo real mientras tecleas. *Nota: La función de chat en su plan gratuito requiere que configures tus propias API keys.*

### 3. Continue + Gemini API
Una opción de código abierto que te da el control total de los modelos. Al enlazar la extensión con los niveles gratuitos para desarrolladores de Google, obtienes IA de nivel avanzado sin coste.

* **Cómo configurarlo:**
  1. Instala la extensión **Continue** en VS Code.
  2. Entra en [Google AI Studio](https://google.com) con una cuenta de Google y genera una **API Key** gratuita.
  3. Abre el panel de Continue, accede a su configuración e introduce tu clave API seleccionando un modelo rápido como `Gemini 2.5 Flash`.
* **Uso principal:** Selección de bloques de código y edición en línea mediante comandos de lenguaje natural (`Ctrl+I` o `Cmd+I`).

---

## ⚠️ Consejo de Convivencia con GitHub Copilot

Si mantienes activado GitHub Copilot junto con estas alternativas, las sugerencias de código se solaparán en la pantalla, causando un conflicto visual molesto.

**Para desactivar temporalmente Copilot mientras pruebas otra opción:**
1. Localiza el pequeño icono de GitHub Copilot en la esquina inferior derecha de VS Code.
2. Haz clic en él y selecciona **"Disable Completions"** (Desactivar autocompletado).
3. Para volver a usarlo, realiza el mismo proceso seleccionando **"Enable Completions"**.
