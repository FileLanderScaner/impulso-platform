-- init_extended.sql
-- Multitenancy core (tenant -> brand -> site)
create extension if not exists "pgcrypto";

create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table brands (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete cascade,
  name text not null,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table sites (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  name text not null,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table user_profiles (
  id uuid primary key references auth.users(id),
  email text not null,
  full_name text,
  tenant_id uuid references tenants(id),
  brand_id uuid references brands(id),
  site_id uuid references sites(id),
  role text default 'user',
  onboarding_completed boolean default false,
  created_at timestamptz default now()
);

create table courses (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id),
  site_id uuid references sites(id),
  title text not null,
  slug text unique,
  description text,
  category text,
  level text,
  metadata jsonb default '{}'::jsonb,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  content text,
  external_video_id text,
  video_provider text,
  position int default 0,
  created_at timestamptz default now()
);

create table quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade,
  title text,
  data jsonb,
  passing_score int default 70,
  created_at timestamptz default now()
);

create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references user_profiles(id),
  lesson_id uuid references lessons(id),
  progress numeric default 0,
  completed boolean default false,
  attempts int default 0,
  last_activity timestamptz default now()
);

create table badges (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id),
  title text,
  description text,
  image_url text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references user_profiles(id),
  course_id uuid references courses(id),
  badge_id uuid references badges(id),
  issued_at timestamptz default now(),
  pdf_url text,
  verification_code text unique,
  metadata jsonb default '{}'::jsonb
);

create table forum_threads (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id),
  title text,
  created_by uuid references user_profiles(id),
  created_at timestamptz default now()
);

create table forum_posts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references forum_threads(id) on delete cascade,
  content text,
  created_by uuid references user_profiles(id),
  created_at timestamptz default now()
);

-- Enable RLS
alter table user_profiles enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;
alter table user_progress enable row level security;
alter table certificates enable row level security;

-- Policies
create policy "profiles_select_own" on user_profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on user_profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "courses_select_by_brand_site" on courses
  for select using (
    (
      published = true
      and (
        brand_id is null 
        or brand_id = (select brand_id from user_profiles where id = auth.uid())
        or site_id = (select site_id from user_profiles where id = auth.uid())
      )
    )
  );

create policy "progress_user_mutation" on user_progress
  for insert, update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "cert_select_owner_or_brand_admin" on certificates
 for select using (
   user_id = auth.uid()
   or exists (
     select 1 from user_profiles u where u.id = auth.uid() and u.role in ('admin_global','admin_brand') 
     and u.brand_id = (select brand_id from user_profiles where id = user_id)
   )
 );
