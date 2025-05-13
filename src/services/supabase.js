import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hxvsxtenfdwuzhcbzqpt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4dnN4dGVuZmR3dXpoY2J6cXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTk1NjksImV4cCI6MjA2MjczNTU2OX0.--idfydmXCJR9Ft9u_z0kdcSfx2NM8eLINej3qFKh_s'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;