import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

// Função para salvar dados
export async function saveData(table: string, data: any) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Error saving data:', error)
    throw error
  }
}

// Função para buscar dados
export async function getData(table: string, query?: any) {
  try {
    let supabaseQuery = supabase.from(table).select()
    
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        supabaseQuery = supabaseQuery.eq(key, value)
      })
    }
    
    const { data, error } = await supabaseQuery
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// Função para atualizar dados
export async function updateData(table: string, id: string, data: any) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Error updating data:', error)
    throw error
  }
}

// Função para deletar dados
export async function deleteData(table: string, id: string) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting data:', error)
    throw error
  }
} 