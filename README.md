# ⚽ OFFSIDE! - Sistema de Evaluación Futbolística

<div align="center">

![Football Trivia](https://img.shields.io/badge/Football-Trivia-yellow?style=for-the-badge&logo=⚽)
![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Una aplicación - trivia de fútbol con diseño futurista**

</div>

---

## 🔎 Vista Previa

<p align="center">
  <img src="https://github.com/user-attachments/assets/b241b8a2-e684-480b-8cdb-efb104956269" alt="ssss" width="800" height="560" />
</p>



## 🎯 Descripción

**OFFSIDE!** es una aplicación web interactiva que pone a prueba tus conocimientos sobre fútbol mundial. ofrece una experiencia de juego inmersiva y educativa.

## 🚀 Características

### 🎮 Modos de Juego
- **🏆 Modo Normal:** 10 preguntas aleatorias, juega las veces que quieras
- **📅 Quiz Diario:** 5 preguntas especiales, una vez por día
- **📊 Sistema de Estadísticas:** Seguimiento completo del rendimiento

### 📚 Base de Datos Completa
- **60 preguntas únicas** organizadas en 4 categorías:
  - 🟠 **Mundiales** - Copas del mundo y competiciones internacionales
  - 🔵 **Jugadores** - Leyendas y estrellas del fútbol
  - 🟣 **Clubes** - Equipos famosos y sus historias
  - ⚪ **Historia** - Datos históricos y curiosidades

### 🎯 Sistema de Dificultad
- **🟢 Fácil** - 10 puntos
- **🟡 Medio** - 15 puntos  
- **🔴 Difícil** - 20 puntos

## 🛠️ Tecnologías

- **Next.js 15.5.5** - Framework React con App Router
- **React 19.1.0** - Biblioteca de UI con hooks modernos
- **TypeScript 5** - Tipado estático para mayor robustez
- **Tailwind CSS 4** - Framework CSS utility-first

## 🎮 Uso

### 🏠 Menú Principal
1. **Estadísticas en tiempo real** - Ve tu progreso al instante
2. **Quiz Diario** - Desafío especial una vez al día
3. **Modo Entrenamiento** - Práctica ilimitada
4. **Análisis de Datos** - Estadísticas detalladas

### 🎯 Durante el Juego
- **Timer de 30 segundos** por pregunta
- **Badges informativos** muestran categoría, dificultad y puntos
- **Feedback inmediato** con colores suaves temáticos
- **Navegación intuitiva** con botones de regreso

### 📊 Sistema de Puntuación
- Las preguntas otorgan puntos según dificultad
- Se registra precisión y estadísticas históricas
- El quiz diario contribuye al progreso general

---

## 🏗️ Arquitectura

### 📁 Estructura del Proyecto
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal con fuentes
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
│   ├── MainMenu.tsx       # Menú principal y navegación
│   └── TriviaGame.tsx     # Lógica del juego y UI
├── data/
│   └── questions.ts       # Base de datos de preguntas
├── hooks/
│   └── useLocalStorage.ts # Hooks para persistencia
└── types/
    └── index.ts           # Definiciones TypeScript
```

## 🎨 Diseño

### Paleta de Colores
- **Fondo:** Negro profundo 
- **Primario:** Amarillo brillante 
- **Categorías:** Naranja, Azul, Púrpura, Blanco (suavizados)
- **Estados:** Verde/Rojo con baja opacidad para suavidad

### Tipografía
- **Geist Sans** - Fuente principal para UI
- **Geist Mono** - Elementos técnicos y códigos
- **Texto terminal** - Estilo monospace para comandos

### Elementos Futuristas
- Grid de líneas de fondo
- Bordes iluminados y esquinas acentuadas
- Nomenclatura técnica (`.db`, `[COMANDO]`, etc.)

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. 

---

## 👨‍💻 Autor

SHS 😎😎

---

<div align="center">
  
[⬆️ Volver arriba](#-football-trivia---sistema-de-evaluación-futbolística)

</div>
