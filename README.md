<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

Esta aplicación de facturación de Raul está construida con React y Vite, utilizando la API de Gemini para funcionalidad de IA.

Ver tu app en AI Studio: https://ai.studio/apps/drive/1dK8dR_rH0ooNmkhQTqTkGTXECmfuJJn0

## Ejecutar Localmente

**Prerequisitos:** Node.js

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno:
   - Copia `.env.example` a `.env.local`
   - Establece `GEMINI_API_KEY` con tu clave API de Gemini

3. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

## Desplegar en Render

### Opción 1: Despliegue automático con render.yaml

1. **Conectar repositorio:**
   - Ve a [Render Dashboard](https://dashboard.render.com/)
   - Conecta tu repositorio de GitHub

2. **Configurar variables de entorno:**
   - En el dashboard de Render, ve a tu servicio
   - Agrega la variable de entorno `GEMINI_API_KEY`

3. **Despliegue automático:**
   - Render detectará automáticamente el archivo `render.yaml`
   - El build se ejecutará automáticamente

### Opción 2: Despliegue manual

1. **Crear nuevo Static Site en Render:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

2. **Configurar variables de entorno:**
   - Agrega `GEMINI_API_KEY` en Environment Variables

### Variables de Entorno Requeridas

- `GEMINI_API_KEY`: Tu clave API de Google Gemini

## Estructura del Proyecto

```
├── components/           # Componentes React
│   ├── BillingDataPage.tsx
│   ├── ClientDataModal.tsx
│   ├── MainMenuPage.tsx
│   ├── PolicyTrackingPage.tsx
│   └── icons/
├── public/              # Archivos estáticos
│   └── _redirects      # Configuración de rutas SPA
├── App.tsx             # Componente principal
├── index.tsx           # Punto de entrada
├── vite.config.ts      # Configuración de Vite
└── render.yaml         # Configuración de Render
