'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('test').select('*').limit(1)
        if (error) throw error
        setStatus('success')
        setMessage('Conexão com Supabase estabelecida com sucesso!')
      } catch (error) {
        setStatus('error')
        setMessage('Erro ao conectar com Supabase: ' + (error as Error).message)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão com Supabase</h1>
      <div className={`p-4 rounded-lg ${
        status === 'loading' ? 'bg-yellow-100' :
        status === 'success' ? 'bg-green-100' :
        'bg-red-100'
      }`}>
        {status === 'loading' && 'Testando conexão...'}
        {status === 'success' && message}
        {status === 'error' && message}
      </div>
    </div>
  )
} 