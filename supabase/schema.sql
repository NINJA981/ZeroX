-- Sahur AI Database Schema
-- Enables pgvector and creates tables for the legal knowledge base,
-- user document vaults, and chat history.

-- 1. Enable Vector Extension (Supabase default-available)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Legal Knowledge Base (Statutes, Constitution, BNS, Labor laws)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding VECTOR(768), -- Gemini text-embedding-004 defaults to 768 dimensions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for HNSW similarity search on documents (using cosine distance)
CREATE INDEX IF NOT EXISTS documents_embedding_hnsw_idx 
ON public.documents 
USING hnsw (embedding vector_cosine_ops);

-- 3. User Vault Documents (Uploaded contracts, tenancy agreements, notices)
CREATE TABLE IF NOT EXISTS public.vault_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL, -- Supabase Storage path/URL
    file_size INT,
    verdict TEXT CHECK (verdict IN ('compliant', 'needs_review', 'violation', 'processing')),
    summary TEXT,
    extracted_clauses JSONB DEFAULT '[]'::jsonb, -- Store key extracted clauses & compared laws
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Conversations & Chats
CREATE TABLE IF NOT EXISTS public.chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New Legal Analysis',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
    content TEXT NOT NULL,
    citations JSONB DEFAULT '[]'::jsonb, -- Citations from documents/vault_documents
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Documents: Public read-only
CREATE POLICY "Allow public read access to legal documents" 
ON public.documents FOR SELECT USING (true);

-- Vault Documents: Users can only select/insert/update/delete their own files
CREATE POLICY "Allow users to manage their own vault documents" 
ON public.vault_documents FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Chats: Users can only manage their own chats
CREATE POLICY "Allow users to manage their own chats" 
ON public.chats FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Messages: Users can only manage messages within their own chats
CREATE POLICY "Allow users to manage messages in their chats" 
ON public.messages FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.chats 
        WHERE chats.id = messages.chat_id AND chats.user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.chats 
        WHERE chats.id = messages.chat_id AND chats.user_id = auth.uid()
    )
);

-- 5. Private Storage Bucket for User Vault Documents
-- Creates the private 'legal-vault' bucket and configures folder-level isolation RLS.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('legal-vault', 'legal-vault', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow users to upload files to their folder"
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'legal-vault' AND 
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow users to read their own files"
ON storage.objects FOR SELECT 
USING (
    bucket_id = 'legal-vault' AND 
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow users to delete their own files"
ON storage.objects FOR DELETE 
USING (
    bucket_id = 'legal-vault' AND 
    (storage.foldername(name))[1] = auth.uid()::text
);

