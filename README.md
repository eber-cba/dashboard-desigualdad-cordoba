# 🏙️ Urban Data Science | Interactive Dashboard V19 🇦🇷

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

---
### 🔗 Acceso Directo: [https://dashboard-desigualdad-cordoba.vercel.app](https://dashboard-desigualdad-cordoba.vercel.app)
---

**Plataforma interactiva geoespacial desarrollada para la visualización de métricas de desigualdad social e infraestructura en los 495 barrios de la ciudad de Córdoba Capital.**

---

## 🎯 ¿Qué es este Dashboard?

Este repositorio contiene la capa de presentación (Front-End) de un extenso proyecto de **Ciencia de Datos y Análisis Espacial**. 

El objetivo de este visualizador interactivo es permitir a cualquier usuario (académico, político o ciudadano) explorar de forma simple y visual *dónde* se concentran las vulnerabilidades de la ciudad (Ej: Pobreza) y contrastar directamente en el mapa si la infraestructura pública (Escuelas, Centros de Salud, Transporte) está llegando realmente a esos sectores.

### ✨ Funcionalidades Principales
* **Mapa Geográfico Interactivo:** Renderizado por Leaflet con tiles oscuros para fácil contraste térmico.
* **Control de Variables (Sidebar):** Cambia dinámicamente el mapa para visualizar la huella de 8 métricas distintas (Densidad poblacional, Escuelas, Paradas de Colectivos, NBI, etc).
* **Tour Guiado (Onboarding):** Incluye una explicación guiada paso a paso (`react-joyride`) para enseñar al usuario cómo interpretar la correlación de datos espaciales.

---

## 🧠 Origen de los Datos (El verdadero "Core") 

> [!IMPORTANT]
> **Este repositorio NO contiene los algoritmos de Machine Learning ni la ingeniería de datos base.**

Este dashboard es **únicamente un visualizador React**. Toda la limpieza masiva de datos censales, el análisis espacial con KD-Trees, la algoritmia de imputación logística y el Clustering (`K-Means` y `DBSCAN`) que produce el archivo *dataset_dashboard_v19.csv* utilizado aquí, **reside en un repositorio de Python separado.**

👉 **[Ver el Repositorio de Ciencias de Datos (Python/MLOps) aquí](https://github.com/eber-cba/dataset-desigualdad-cordoba)**.

Allí encontrarás la arquitectura matemática que justifica las métricas mostradas en este mapa.

---

## 🚀 Instalación Local

Si deseas correr este proyecto en tu propia máquina:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/eber-cba/dashboard-desigualdad-cordoba.git
   ```
2. Instala las dependencias de Node:
   ```bash
   npm install
   ```
3. Levanta el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:5173` en tu navegador.

---
**© Creado por [Eber Coronel](https://github.com/eber-cba) | Principal Urban Data Scientist & Fullstack Dev**
