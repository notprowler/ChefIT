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

## Entity Diagram – Favorite a Recipe Feature

![Entity Diagram](./ER%20Diagram.png)

This entity diagram models the data relationships behind the "Favorite a Recipe" feature in ChefIt.  
A **User** is uniquely identified by a **UID** and has both an **email**  field and a **favorite** field, which stores an array of recipe objects in JSON format.  
These recipes are not stored in a separate **Recipe** table — instead, they are embedded directly within the **User.favorite** field using PostgreSQL’s JSONB support via Supabase.  
Each embedded recipe object contains fields such as **id**, **title**, **image**, **source_url**, and **spoonacular_id**.  
The relationship between **User** and the **Recipe JSON Object** is represented as one-to-many, indicating that a single user can have zero or more favorited recipes.  
While the diagram is structured in a relational format for clarity, it reflects a denormalized implementation in practice.

## Call Sequence Diagram – Favorite a Recipe Feature

![Call Sequence Diagram](./Call%20Sequence%20Diagram.png)

This call sequence diagram outlines the flow that occurs when a user favorites a recipe.  
The **User (Client)** initiates the process by clicking a "favorite" button in the **Frontend** (React).  
The frontend sends a **POST** request to the **Backend (FastAPI)**, which retrieves the current list of favorites from **Supabase** using the user's UID.  
It then appends the new recipe object to the list and updates the **favorite** field in the same user record.  
Finally, the backend returns a success response, allowing the frontend to update the UI and confirm the action to the user.
