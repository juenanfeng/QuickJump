import { Button } from 'antd'
import React from 'react'
import useHorizontalScroll from './hooks'

import './index.less'

type Props = {
  titleMap: Record<string, string>
  columns: any[]
  scrollRef: React.RefObject<HTMLDivElement>
  hasSelection?: boolean
  renderMap?: Record<string, () => React.ReactNode>
  stickyNum?: number
}

const flatChildren = (children: any[]): any[] => {
  if (!Array.isArray(children)) {
    return []
  }

  const res = []

  for (const item of children) {
    if (Array.isArray(item.children)) {
      res.push(...flatChildren(item.children))
    } else {
      res.push(item)
    }
  }

  return res
}

function getQuickJumpItems(columns: any[], titleMap: Record<string, string>) {
  const _columns = columns.filter((p) => p.fixed !== true && p.fixed !== 'left')
  const columnsInfo = []

  let index = 0
  for (let i = 0; i < _columns.length; i++) {
    const col = _columns[i]
    const children = col?.children

    columnsInfo.push({
      name: titleMap[col.key],
      key: col.key,
      index: i === _columns.length - 1 ? 999 : index
    })

    if (Array.isArray(children) && children.length > 0) {
      index = index + flatChildren(children).length
    } else {
      index = index + 1
    }
  }

  return columnsInfo
}

export default function QuickJump({
  columns,
  titleMap,
  scrollRef,
  hasSelection = true,
  renderMap,
  stickyNum = 0
}: Props) {
  const quickJumpCols = getQuickJumpItems(columns, titleMap)
  console.log(quickJumpCols)
  const { scrollToIndexColumn } = useHorizontalScroll(scrollRef, stickyNum + (hasSelection ? 1 : 0))

  return (
  
      <div className="quick-jump">
        <span>快速定位列：</span>
        <span>
          {quickJumpCols.map((col) => {
            return (
              <Button
                size="small"
                type="text"
                key={col.key}
                onClick={() => {
                  scrollToIndexColumn(col.index)
                }}
              >
                {renderMap?.[col.key]?.() ?? col.name}
              </Button>
            )
          })}
        </span>
      </div>
  )
}