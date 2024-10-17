import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Select, Popconfirm, message, Typography } from 'antd';
import { FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import api from '../utils/api';
import '../styles/viewExpenses.css';

const { Option } = Select;
const { Title } = Typography;

// Separate EditableCell component
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'select' ? (
    <Select style={{ width: '100%' }}>
      <Option value="food">Food</Option>
      <Option value="transportation">Transportation</Option>
      <Option value="entertainment">Entertainment</Option>
      <Option value="utilities">Utilities</Option>
      <Option value="other">Other</Option>
    </Select>
  ) : (
    <Input />
  );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      if (response.status === 200 && response.data) {
        const categoryMap = {};
        response.data.forEach(category => {
          categoryMap[category._id] = category.name;
        });
        setCategories(categoryMap);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Failed to fetch categories: ' + (error.response?.data?.message || error.message));
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      if (response.status === 200 && response.data) {
        console.log('Raw expenses data:', response.data);
        setExpenses(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      message.error('Failed to fetch expenses: ' + (error.response?.data?.message || error.message));
    }
  };

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...expenses];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await api.put(`/expenses/${key}`, newData[index]);
        setExpenses(newData);
        setEditingKey('');
        message.success('Expense updated successfully');
      } else {
        newData.push(row);
        setExpenses(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
      message.success('Expense deleted successfully');
    } catch (error) {
      message.error('Failed to delete expense: ' + (error.response?.data?.message || error.message));
    }
  };

  const columns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: '15%',
      render: (text) => {
        if (!text) return 'Invalid Date';
        const date = new Date(text);
        // Check if the date is valid and not NaN
        if (isNaN(date.getTime())) {
          console.error('Invalid date:', text);
          return 'Invalid Date';
        }
        // Use toLocaleString for a more detailed date and time format
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      title: 'Amount (NIS)',
      dataIndex: 'amount',
      width: '15%',
      editable: true,
      render: (text) => `₪${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '30%',
      editable: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '15%',
      editable: true,
      render: (categoryId) => categories[categoryId] || 'Unknown Category',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              icon={<FiSave />}
              onClick={() => save(record.id)}
              className="action-button save-button"
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button icon={<FiX />} className="action-button cancel-button">
                Cancel
              </Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              icon={<FiEdit />}
              onClick={() => edit(record)}
              disabled={editingKey !== ''}
              className="action-button edit-button"
            >
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button
                icon={<FiTrash2 />}
                disabled={editingKey !== ''}
                className="action-button delete-button"
              >
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'amount' ? 'number' : col.dataIndex === 'category' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="view-expenses-container">
      <Title level={2} className="view-expenses-title">View Expenses</Title>
      <div className="expenses-table-wrapper">
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={expenses}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
              pageSize: 5,
            }}
            rowKey="id"
            className="expenses-table"
          />
        </Form>
      </div>
    </div>
  );
};

export default ViewExpenses;
