# ChefIt Architecture

## High-Level Component Diagram

![High-Level Architecture](./High%20Level%20Component%20Diagram.png)

This high-level component diagram illustrates how the core parts of the ChefIt application interact with each other.  
The **Frontend (React + Vite)** is the user-facing client that sends API requests to the **Backend (FastAPI Server)**.  
The backend acts as the central coordinator, handling business logic and delegating responsibilities to three services:  
**Supabase** for user authentication and data persistence.  
**Gemini API** for generating AI-powered recipe suggestions.  
**Spoonacular API** for retrieving third-party recipe and nutrition data.  
All external communication is routed through the backend, ensuring a secure, modular, and maintainable architecture.
