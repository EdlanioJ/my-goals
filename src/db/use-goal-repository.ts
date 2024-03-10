import { useSQLiteContext } from 'expo-sqlite/next'

export type GoalData = {
  id: number
  name: string
  current: number
  total: number
}

type AddParams = {
  name: string
  total: number
}

export function useGoalRepository() {
  const db = useSQLiteContext()

  function all() {
    const result = db.getAllSync<GoalData>(`
        SELECT g.id, g.name, g.total, COALESCE(SUM(t.amount), 0) AS current 
        FROM goals AS g 
        LEFT JOIN transactions t ON t.goal_id = g.id
        GROUP BY g.id;
      `)

    return result
  }

  async function add(params: AddParams) {
    const statement = db.prepareSync(
      'INSERT INTO goals (name, total) VALUES ($name, $total);',
    )

    statement.executeSync({ $name: params.name, $total: params.total })
  }

  function getById(id: number) {
    const statement = db.prepareSync(`
      SELECT g.id, g.name, g.total, COALESCE(SUM(t.amount), 0) AS current
      FROM goals AS g
      LEFT JOIN transactions AS t ON t.goal_id = g.id
      WHERE g.id = $id
      GROUP BY g.id;
    `)

    const result = statement.executeSync<GoalData>({ $id: id })
    return result.getFirstSync()
  }

  return { all, add, getById }
}
