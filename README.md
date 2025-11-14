# TicTacToe --- React + Vite

Repositorio: https://github.com/Kerin258/TicTacToe-Kerin-Del-Jesus

Un juego de **Tres en Raya (Tic Tac Toe)** desarrollado con **React** y
**Vite**, que permite jugar en **tres tamaños de tablero: 3×3, 4×4 y
5×5**. Ideal para práctica de estados, renderizado condicional y
componentes en React.

## 🚀 Tecnologías utilizadas

-   **React 18**
-   **Vite**
-   **JavaScript / JSX**
-   **CSS**
-   **ESLint**

## 📁 Estructura del proyecto

    TicTacToe/
    ├── .git/
    ├── .gitignore
    ├── dist/
    ├── eslint.config.js
    ├── index.html
    ├── node_modules/
    ├── package.json
    ├── package-lock.json
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── styles.css
    │   └── assets/
    │       ├── gato.png
    │       ├── perro.png
    │       └── react.svg
    └── vite.config.js

## 📥 Instalación y ejecución

### 1️⃣ Clonar el repositorio

``` bash
git clone https://github.com/Kerin258/TicTacToe-Kerin-Del-Jesus.git
```

### 2️⃣ Instalar dependencias

``` bash
npm install
```

### 3️⃣ Ejecutar en modo desarrollo

``` bash
npm run dev
```

Abrir en el navegador:\
👉 http://localhost:5173/

### 4️⃣ Compilar para producción

``` bash
npm run build
```

El build se genera en la carpeta **/dist**.

## 🕹️ Características del juego

-   **Soporte para tableros 3×3, 4×4 y 5×5**
-   Turnos dinámicos entre X y O (o imágenes personalizadas)
-   Detección automática de ganador
-   Detección de empate
-   Botón para reiniciar la partida
-   Layout responsive
-   Uso de imágenes desde `src/assets`
-   Código organizado y fácil de extender

## ❓ Funcionamiento de los tableros múltiples

El jugador puede seleccionar uno de los tres tamaños de tablero:

-   **3×3**
-   **4×4**
-   **5×5**

La lógica del juego ajusta automáticamente:

-   El número de casillas\
-   La organización del tablero\
-   Las combinaciones ganadoras según el tamaño elegido

## 🔧 Scripts disponibles

-   `npm run dev` → Inicia el servidor de desarrollo\
-   `npm run build` → Genera el build de producción\
-   `npm run preview` → Previsualiza el build
