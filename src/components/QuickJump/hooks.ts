import { useState, useCallback, useEffect } from 'react'

const useHorizontalScroll = (scrollRef: React.RefObject<HTMLDivElement>, stickyNum: number) => {
  const [columnWidths, setColumnWidths] = useState<number[]>([])

  // 计算前缀和
  const cumulativeWidths = columnWidths.reduce(
    (acc, curr, i) => [...acc, (acc[i - 1] || 0) + curr],
    [] as number[]
  )

  const getContainer = useCallback(() => {
    if (!scrollRef.current) return null
    return scrollRef.current.querySelector('.ant-table-body')
  }, [scrollRef])

  // 用于初始化及重新计算每列的宽度
  const calculateColumnWidths = useCallback(() => {
    const container = getContainer()
    if (!container) return false

    try {
      // HACK FOR ANTD ant-table-measure-row
      const thElements = container.querySelectorAll('.ant-table-measure-row td')
      if (thElements.length === 0) return false

      const widths = Array.from(thElements).map((th: any) => th.offsetWidth)
      setColumnWidths(widths.slice(stickyNum))
      return true
    } catch (e) {
      console.error('Failed to calculate column widths:', e)
      return false
    }
  }, [stickyNum, getContainer])

  useEffect(() => {
    let resizeObserver: ResizeObserver

    const initializeObserver = () => {
      const container = getContainer()
      if (!container) {
        return
      }

      try {
        calculateColumnWidths()
        resizeObserver = new ResizeObserver(() => {
          calculateColumnWidths()
        })
        resizeObserver.observe(container)
      } catch (e) {
        console.error('Failed to initialize observer:', e)
      }
    }

    initializeObserver()

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [calculateColumnWidths, getContainer])

  // 滚动到指定方向的列
  const scrollToColumn = useCallback((direction: 'left' | 'right', step = 1) => {
    const container = getContainer()
    if (!container) return
    const currentScroll = container.scrollLeft

      // 找到当前可视区域内最接近左侧（或右侧）的列索引
      let targetColIndex = cumulativeWidths.findIndex(
        (cumulativeWidth) => cumulativeWidth > currentScroll
      )

      if (direction === 'left') {
        // 向左滚动，索引减去 1
        targetColIndex = Math.max(targetColIndex - step, 0)
      } else if (direction === 'right') {
        // 向右滚动，索引加上 1
        // 需要注意不要超过最后一个列的索引
        targetColIndex = Math.min(targetColIndex + step, columnWidths.length - 1)
      }

      // 确定滚动位置：对于向左，直接使用前缀和；向右，使用当前列的前缀和
      const targetScrollPosition = cumulativeWidths[targetColIndex - 1] || 0

      container.scrollTo({
        left:
          targetColIndex >= cumulativeWidths.length - 1
            ? container.scrollWidth
            : targetScrollPosition,
        behavior: step === 1 ? 'smooth' : 'auto'
      })
  }, [cumulativeWidths, getContainer])

  const scrollToIndexColumn = useCallback((targetColIndex: number) => {
    const container = getContainer()
    if (!container) return
    const targetScrollPosition = cumulativeWidths[targetColIndex - 1] || 0
    container.scrollTo({
      left:
        targetColIndex >= cumulativeWidths.length - 1
          ? container.scrollWidth
          : targetScrollPosition,
      behavior: 'smooth'
    })

  }, [cumulativeWidths, getContainer])

  return { scrollRef, scrollToColumn, scrollToIndexColumn }
}

export default useHorizontalScroll