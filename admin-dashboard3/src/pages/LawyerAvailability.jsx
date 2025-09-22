import React, { useState, useEffect } from 'react';
import { Calendar, Button, Modal, Form, TimePicker, message } from 'antd';

import { getLoggedInUser } from '../utils/auth';
import dayjs from 'dayjs'; 

const LawyerAvailability = () => {
    const [availability, setAvailability] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [form] = Form.useForm();
    const loggedInUser = getLoggedInUser();

    const fetchAvailability = () => {
        
        const mockAvailability = [
            { date: dayjs().format('YYYY-MM-DD'), available: false, time: '' },
        ];
        setAvailability(mockAvailability);
    };

    useEffect(() => {
        fetchAvailability();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser?.username]);

    const handleAddAvailability = (values) => {
        const time = values.time.map(t => t.format('HH:mm')).join(' - ');
        const newEntry = { date: selectedDate.format('YYYY-MM-DD'), available: true, time };
        setAvailability(prev => {
            const filtered = prev.filter(item => item.date !== newEntry.date);
            return [...filtered, newEntry];
        });
        message.success(`Added availability for ${selectedDate.format('YYYY-MM-DD')}`);
        setIsModalVisible(false);
        form.resetFields(); 
    };

    const cellRender = (value) => {
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

    const onModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div>
            <h2>Availability Management</h2>
            <Calendar cellRender={cellRender} onSelect={onSelect} />
            <Modal
                title={`Add Availability for ${selectedDate?.format('YYYY-MM-DD') || 'Selected Date'}`}
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={onModalCancel}
                destroyOnClose // Đảm bảo form được reset mỗi khi modal đóng
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