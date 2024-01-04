import { useCallback, useState } from 'react'

function useRowSelect<T>() {
  const [selectRow, setRow] = useState<T>({} as T)
  const handleRowClick = useCallback(
    (params: { row: T }) => {
      if (JSON.stringify(selectRow) === JSON.stringify(params.row)) {
        setRow({} as T)
        return
      }
      setRow(params.row)
    },
    [selectRow]
  )
  return [selectRow, handleRowClick] as const
}

export { useRowSelect }
