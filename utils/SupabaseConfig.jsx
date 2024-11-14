import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://omxzgfqeyadttadfvpei.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHpnZnFleWFkdHRhZGZ2cGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1NDAyNDAsImV4cCI6MjA0NzExNjI0MH0.BPl5jX_vvVI1lTQ8S71ZMefytt2oGzFVvkmEHZEK23o"
);
//modify upr project URL AND Project APi keys under project settings

//check implementation in index.jsx
