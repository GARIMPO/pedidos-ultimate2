import type { Pedido } from "@/types/pedido"
import type { Transacao } from "@/types/financas"
import type { Contato } from "@/types/contato"

// Chaves para armazenamento no localStorage
const STORAGE_KEYS = {
  PEDIDOS: "pedidos",
  TRANSACOES: "transacoes",
  CONTATOS: "contatos",
  APP_VERSION: "app_version",
}

// Versão atual do app para controle de migrações futuras
const CURRENT_APP_VERSION = "1.0.0"

// Verifica se o localStorage está disponível
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    console.error("localStorage não está disponível:", e)
    return false
  }
}

// Função para salvar dados no localStorage
const saveData = (key: string, data: any): void => {
  if (!isLocalStorageAvailable()) return

  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Erro ao salvar dados (${key}):`, error)
  }
}

// Função para carregar dados do localStorage
const loadData = (key: string, defaultValue: any): any => {
  if (!isLocalStorageAvailable()) return defaultValue

  try {
    const storedData = localStorage.getItem(key)
    return storedData ? JSON.parse(storedData) : defaultValue
  } catch (error) {
    console.error(`Erro ao carregar dados (${key}):`, error)
    return defaultValue
  }
}

// Funções específicas para cada tipo de dado
export const savePedidos = (pedidos: Pedido[]): void => {
  saveData(STORAGE_KEYS.PEDIDOS, pedidos)
}

export const loadPedidos = (): Pedido[] => {
  return loadData(STORAGE_KEYS.PEDIDOS, [])
}

export const saveTransacoes = (transacoes: Transacao[]): void => {
  saveData(STORAGE_KEYS.TRANSACOES, transacoes)
}

export const loadTransacoes = (): Transacao[] => {
  return loadData(STORAGE_KEYS.TRANSACOES, [])
}

export const saveContatos = (contatos: Contato[]): void => {
  saveData(STORAGE_KEYS.CONTATOS, contatos)
}

export const loadContatos = (): Contato[] => {
  return loadData(STORAGE_KEYS.CONTATOS, [])
}

// Inicializa a versão do app se não existir
export const initializeAppVersion = (): void => {
  if (!isLocalStorageAvailable()) return

  try {
    const storedVersion = localStorage.getItem(STORAGE_KEYS.APP_VERSION)
    if (!storedVersion) {
      localStorage.setItem(STORAGE_KEYS.APP_VERSION, CURRENT_APP_VERSION)
    }
  } catch (error) {
    console.error("Erro ao inicializar versão do app:", error)
  }
}

// Exporta um objeto com todas as funções para facilitar importação
const StorageService = {
  savePedidos,
  loadPedidos,
  saveTransacoes,
  loadTransacoes,
  saveContatos,
  loadContatos,
  initializeAppVersion,
}

export default StorageService

