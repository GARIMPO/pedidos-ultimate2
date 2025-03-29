import { supabase, saveData, getData, updateData, deleteData } from '@/lib/supabase'
import type { Pedido } from '@/types/pedido'
import type { Transacao } from '@/types/financas'
import type { Contato } from '@/types/contato'

class SupabaseService {
  // Cliente Supabase para autenticação
  supabase = supabase

  // Pedidos
  async loadPedidos(): Promise<Pedido[]> {
    try {
      const pedidos = await getData('pedidos')
      return pedidos || []
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
      return []
    }
  }

  async savePedido(pedido: Pedido): Promise<Pedido> {
    try {
      const result = await saveData('pedidos', pedido)
      return result[0]
    } catch (error) {
      console.error('Erro ao salvar pedido:', error)
      throw error
    }
  }

  async updatePedido(id: string, pedido: Partial<Pedido>): Promise<Pedido> {
    try {
      const result = await updateData('pedidos', id, pedido)
      return result[0]
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      throw error
    }
  }

  async deletePedido(id: string): Promise<void> {
    try {
      await deleteData('pedidos', id)
    } catch (error) {
      console.error('Erro ao deletar pedido:', error)
      throw error
    }
  }

  // Transações
  async loadTransacoes(): Promise<Transacao[]> {
    try {
      const transacoes = await getData('transacoes')
      return transacoes || []
    } catch (error) {
      console.error('Erro ao carregar transações:', error)
      return []
    }
  }

  async saveTransacao(transacao: Transacao): Promise<Transacao> {
    try {
      const result = await saveData('transacoes', transacao)
      return result[0]
    } catch (error) {
      console.error('Erro ao salvar transação:', error)
      throw error
    }
  }

  async updateTransacao(id: string, transacao: Partial<Transacao>): Promise<Transacao> {
    try {
      const result = await updateData('transacoes', id, transacao)
      return result[0]
    } catch (error) {
      console.error('Erro ao atualizar transação:', error)
      throw error
    }
  }

  async deleteTransacao(id: string): Promise<void> {
    try {
      await deleteData('transacoes', id)
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
      throw error
    }
  }

  // Contatos
  async loadContatos(): Promise<Contato[]> {
    try {
      const contatos = await getData('contatos')
      return contatos || []
    } catch (error) {
      console.error('Erro ao carregar contatos:', error)
      return []
    }
  }

  async saveContato(contato: Contato): Promise<Contato> {
    try {
      const result = await saveData('contatos', contato)
      return result[0]
    } catch (error) {
      console.error('Erro ao salvar contato:', error)
      throw error
    }
  }

  async updateContato(id: string, contato: Partial<Contato>): Promise<Contato> {
    try {
      const result = await updateData('contatos', id, contato)
      return result[0]
    } catch (error) {
      console.error('Erro ao atualizar contato:', error)
      throw error
    }
  }

  async deleteContato(id: string): Promise<void> {
    try {
      await deleteData('contatos', id)
    } catch (error) {
      console.error('Erro ao deletar contato:', error)
      throw error
    }
  }

  // Autenticação
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  }

  async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao criar conta:', error)
      throw error
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    }
  }
}

export default new SupabaseService() 