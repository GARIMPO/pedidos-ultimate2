import { useState, useEffect } from 'react'
import { supabase, saveData, getData, updateData, deleteData } from '@/lib/supabase'

interface BaseModel {
  id: string
}

export function useSupabase<T extends BaseModel>(table: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Carregar dados iniciais
  useEffect(() => {
    fetchData()
  }, [table])

  // Função para buscar dados
  const fetchData = async (query?: any) => {
    try {
      setLoading(true)
      const result = await getData(table, query)
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  // Função para adicionar dados
  const addData = async (newData: Partial<T>) => {
    try {
      const result = await saveData(table, newData)
      setData(prev => [...prev, ...result])
      return result
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  // Função para atualizar dados
  const updateItem = async (id: string, updatedData: Partial<T>) => {
    try {
      const result = await updateData(table, id, updatedData)
      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...result[0] } : item
      ))
      return result
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  // Função para deletar dados
  const deleteItem = async (id: string) => {
    try {
      await deleteData(table, id)
      setData(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  return {
    data,
    loading,
    error,
    fetchData,
    addData,
    updateItem,
    deleteItem
  }
} 