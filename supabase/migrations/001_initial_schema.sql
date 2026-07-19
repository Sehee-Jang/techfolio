-- Enable UUID generation
create extension if not exists "uuid-ossp";


-- Users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null,
  email varchar(255) unique not null,
  created_at timestamp with time zone default now()
);


-- Projects table
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  description text,
  readme text,
  github_url varchar(500),
  demo_url varchar(500),
  image_url varchar(500),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  user_id uuid not null,

  constraint fk_project_user
    foreign key (user_id)
    references users(id)
    on delete cascade
);


-- Tech Stack table
create table tech_stacks (
  id uuid primary key default uuid_generate_v4(),
  name varchar(100) unique not null,
  color varchar(20)
);


-- Project-Tech junction table
create table project_tech (
  project_id uuid not null,
  tech_id uuid not null,

  primary key (project_id, tech_id),

  constraint fk_project
    foreign key (project_id)
    references projects(id)
    on delete cascade,

  constraint fk_tech_stack
    foreign key (tech_id)
    references tech_stacks(id)
    on delete cascade
);