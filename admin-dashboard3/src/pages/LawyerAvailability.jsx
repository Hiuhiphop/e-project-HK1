import React, { useState, useEffect } from 'react';
import { Calendar, Button, Modal, Form, TimePicker, message } from 'antd';
import { mockLawyers } from '../utils/mockData';
import { getLoggedInUser } from '../utils/auth';

const LawyerAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form] = Form.useForm();
  const loggedInUser = getLoggedInUser();

  const fetchAvailability = () => {
    const currentLawyer = mockLawyers.find(l => l.name === loggedInUser?.username);
    if (currentLawyer) {
      const mockAvailability = [
        { date: '2025-09-21', available: true, time: '09:00 - 12:00' },
        { date: '2025-09-22', available: false, time: '' },
      ];
      setAvailability(mockAvailability);
    }
  };

  useEffect(() => {
    fetchAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser?.username]);

  const handleAddAvailability = (values) => {
    const time = values.time.map(t => t.format('HH:mm')).join(' - ');
    const newEntry = { date: selectedDate.format('YYYY-MM-DD'), available: true, time };
    setAvailability([...availability, newEntry]);
    message.success(`Added availability for ${selectedDate.format('YYYY-MM-DD')}`);
    setIsModalVisible(false);
  };

  const dateCellRender = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const slot = availability.find(a => a.date === dateStr);
    return slot ? (
      <div style={{ background: slot.available ? '#e6ffe6' : '#ffe6e6' }}>
        {slot.time || 'Not available'}
      </div>
    ) : null;
  };

  const onSelect = (value) => {
    setSelectedDate(value);
    setIsModalVisible(true);
  };

  return (
    <div>
      <h2>Availability Management</h2>
      <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />
      <Modal
        title={`Add Availability for ${selectedDate?.format('YYYY-MM-DD')}`}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleAddAvailability}>
          <Form.Item name="time" label="Available Time" rules={[{ required: true, message: 'Please select time!' }]}>
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LawyerAvailability;