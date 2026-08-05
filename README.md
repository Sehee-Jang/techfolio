# Techfolio (Tech Stack Portfolio)

A web application for organizing, managing, and showcasing software projects with technology stacks, GitHub links, screenshots, and portfolio documentation.

## Team Members

- Sehee Jang

## Description

Techfolio is a portfolio management web application designed for developers, students, and job seekers who want to organize and present their software projects professionally.

Users can create and manage portfolio projects, add technology stack information, upload project images, include GitHub and live demo links, and share selected projects through a public portfolio page.

The application provides a personalized dashboard for authenticated users while allowing visitors to view publicly shared portfolio content without signing in.

## Reason for Selection

Many developers struggle with organizing and presenting their projects professionally across multiple platforms. Techfolio solves this problem by providing a centralized platform where users can manage their project information and create a public-facing portfolio.

This project also demonstrates key full-stack development concepts including authentication, CRUD operations, database relationships, file uploads, security policies, and reusable UI component design.

## MVP Features

### Authentication

- User registration and login
- Logout functionality
- Protected dashboard routes using Supabase Authentication

### Portfolio Management

Authenticated users can:

- Create, read, update, and delete projects
- Add project descriptions
- Add GitHub repository links
- Add live demo URLs
- Upload project images
- Associate projects with technology stacks
- Configure project visibility settings

### Public Portfolio

- Public portfolio page for each user
- Display username and bio
- Show only projects marked as public
- Allow visitors to view shared projects without authentication

### Profile Management

Users can update public portfolio information:

- Username
- Bio

### User Experience

- Responsive design
- Reusable UI components
- Consistent design system
- User-friendly empty and error states

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend / Database

- Supabase Authentication
- Supabase PostgreSQL Database
- Supabase Storage

## Database

The application uses Supabase PostgreSQL with Row Level Security (RLS) policies.

Main data models:

- Users
- Projects
- Tech Stacks
- Project-Tech Stack Relationships

RLS policies ensure that users can only manage their own portfolio data.

## Architecture

The application follows a Next.js App Router architecture.

Example data flow:

```text
Client Component
        ↓
Server Action / API Route Handler
        ↓
Supabase Database
```

This structure separates UI components, server-side logic, and database operations while maintaining type safety with TypeScript.

## API Notes

The application uses server-side operations and API routes to manage data.

Main operations include:

- User profile management
- Project CRUD operations
- Technology stack relationships
- Image upload handling

Database access is secured through Supabase authentication and Row Level Security policies.

## Project Structure

```text
app/
 ├── dashboard/
 ├── login/
 ├── portfolio/
 └── register/

components/
docs/
lib/
public/
types/
```
