import React, {useState} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {registrationUser} from "../model/auth.model";

type FieldType = {
    email: string;
    password: string;
    confirm: string;
    firstName: string;
    lastName: string;
    remember?: string;
    middleName?: string;
    isAdmin?:string
};

const Register: React.FC = () => {

    const onFinish = async (values: any) => {
        await registrationUser(values)

    }

    const onFinishFailed = async (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
        name="auth"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 700}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Имя"
            name="firstName"
            rules={[{required: true, message: 'Введите имя!'}]}
        >
            <Input/>
        </Form.Item>
        <Form.Item<FieldType>
            label="Фамилия"
            name="lastName"
            rules={[{required: true, message: 'Введите фамилию!'}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Отчество"
            name="middleName"
            rules={[{required: false}]}
        >
            <Input/>
        </Form.Item>
        <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{required: true, message: 'Введите Email!'}]}
            valuePropName="email"

        >
            <Input/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{required: true, message: 'Введите пароль!'}]}
        >
            <Input.Password/>
        </Form.Item>
        <Form.Item
            name="confirm"
            label="Повторите пароль"
            dependencies={['password']} // Указываем, что это поле зависит от поля password
            hasFeedback
            rules={[{
                required: true, message: 'Повторите ваш пароль!',
            }, // Правило для сравнения двух паролей
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают!'));
                    },
                }),]}
        >
            <Input.Password/>
        </Form.Item>
        <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{offset: 8, span: 16}}
        >
            <Checkbox>Запомнить на этом компьютере</Checkbox>
        </Form.Item>
            <Form.Item<FieldType>
                label="Администратор?"
                name="isAdmin"
                rules={[{required: false}]}
                valuePropName="email"
            >
                <Input/>
            </Form.Item>
        <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">
                Войти
            </Button>
        </Form.Item>

    </Form>
    )
};

export default Register;
