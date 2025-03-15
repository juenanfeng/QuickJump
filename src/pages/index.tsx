import React, { useRef } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import QuickJump from '../components/QuickJump';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  department: string;
  position: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 200,
  },
  {
    title: '工作信息',
    key: 'userGroup',
    children: [
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        width: 150,
      },
      {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
        width: 150,
      },
    ],
  },
];

const data: DataType[] = Array.from({ length: 100 }, (_, index) => ({
  key: index.toString(),
  name: `张三${index}`,
  age: 20 + (index % 20),
  address: `北京市朝阳区第${index}街道`,
  phone: `1380013${String(index).padStart(4, '0')}`,
  email: `zhangsan${index}@example.com`,
  department: `部门${index % 5 + 1}`,
  position: `职位${index % 3 + 1}`,
}));

const titleMap: Record<string, string> = {
  name: '姓名',
  age: '年龄',
  address: '地址',
  phone: '电话',
  email: '邮箱',
  department: '部门',
  position: '职位',
  userGroup: '工作信息',
};

const QuickJumpDemo: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(scrollRef.current)

  return (
    <div style={{ padding: 24 }}>
      <h1>QuickJump 组件示例</h1>
      <QuickJump
        columns={columns}
        titleMap={titleMap}
        scrollRef={scrollRef}
        hasSelection={false}
        stickyNum={1}
      />
      <Table
        ref={scrollRef}
        columns={columns}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
        sticky
      />

    </div>
  );
};

export default QuickJumpDemo; 