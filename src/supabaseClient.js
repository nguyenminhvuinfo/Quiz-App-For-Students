import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xluhyezzeknpcmdfumge.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdWh5ZXp6ZWtucGNtZGZ1bWdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQ2ODEyNCwiZXhwIjoyMDUxMDQ0MTI0fQ.1Qc3QRClj2yC6z1rH40O_EOPnFbbLP8GVOMalMKfBqU';

export const supabase = createClient(supabaseUrl, supabaseKey);
