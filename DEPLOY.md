# Guía de Despliegue en Render

## Pasos para desplegar tu aplicación de facturas en Render

### 1. Preparar el repositorio

Asegúrate de que todos los archivos estén commiteados en tu repositorio de Git:

```bash
git add .
git commit -m "Configuración para despliegue en Render"
git push origin main
```

### 2. Crear cuenta en Render

1. Ve a [render.com](https://render.com)
2. Regístrate o inicia sesión
3. Conecta tu cuenta de GitHub

### 3. Crear nuevo Static Site

#### Opción A: Usando render.yaml (Recomendado)
1. En el dashboard de Render, haz clic en "New +"
2. Selecciona "Blueprint"
3. Conecta tu repositorio
4. Render detectará automáticamente el archivo `render.yaml`

#### Opción B: Configuración manual
1. En el dashboard de Render, haz clic en "New +"
2. Selecciona "Static Site"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

### 4. Configurar Variables de Entorno

**⚠️ IMPORTANTE**: Debes configurar la variable de entorno para que la aplicación funcione:

1. Ve a tu servicio en el dashboard de Render
2. Haz clic en "Environment"
3. Agrega la siguiente variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Tu clave API de Gemini (la misma que usas localmente)

### 5. Desplegar

1. Haz clic en "Deploy" en tu servicio
2. Render construirá automáticamente tu aplicación
3. Una vez completado, obtendrás una URL pública

### 6. Configurar dominio personalizado (Opcional)

1. En tu servicio, ve a "Settings"
2. Scroll hasta "Custom Domains"
3. Agrega tu dominio personalizado

## Solución de Problemas

### Error de build
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el comando `npm run build` funcione localmente

### Variables de entorno no funcionan
- Verifica que `GEMINI_API_KEY` esté configurada en Render
- Asegúrate de que no haya espacios extra en la clave

### Problemas de routing
- El archivo `public/_redirects` debe estar presente
- Asegúrate de que el directorio `public` esté en tu repositorio

### Actualizaciones automáticas
- Render desplegará automáticamente cuando hagas push a la rama principal
- Puedes configurar auto-deploy en la configuración del servicio

## URLs útiles

- [Dashboard de Render](https://dashboard.render.com/)
- [Documentación de Render](https://render.com/docs)
- [Documentación de Static Sites](https://render.com/docs/static-sites)

## Estructura de archivos para Render

```
├── render.yaml          # Configuración de Render
├── public/_redirects    # Configuración SPA routing
├── .env.example        # Ejemplo de variables de entorno
├── package.json        # Scripts de build actualizados
└── dist/              # Directorio de build (generado)
```
