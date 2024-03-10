import { useSQLiteContext } from 'expo-sqlite/next'

export type TransactionData = {
  id: string
  amount: number
  created_at: number
}

type AddTransactionParams = {
  amount: number
  goalId: number
}
export function useTransactionRepository() {
  const db = useSQLiteContext()

  function getLatest() {
    const response = db.getAllSync<TransactionData>(
      'SELECT * FROM transactions  ORDER BY created_at DESC LIMIT 10;',
    )

    return response
  }

  function getByGoalId(goalId: number) {
    const statement = db.prepareSync(
      'SELECT * FROM transactions WHERE goal_id = $goal_id;',
    )

    const result = statement.executeSync<TransactionData>({
      $goal_id: goalId,
    })

    return result.getAllSync()
  }

  async function add(params: AddTransactionParams) {
    const statement = db.prepareSync(
      'INSERT INTO transactions (amount, goal_id) VALUES ($amount, $goal_id)',
    )

    statement.executeSync({
      $amount: params.amount,
      $goal_id: params.goalId,
    })
  }
  return { getLatest, getByGoalId, add }
}
