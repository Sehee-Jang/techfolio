export interface TechStack {
  id: string;
  name: string;
  color: string | null;
}

export interface ProjectTech {
  tech_stacks: TechStack;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  readme: string | null;
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;

  project_tech?: ProjectTech[];
}
