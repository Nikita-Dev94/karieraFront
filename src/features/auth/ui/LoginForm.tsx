import React, {useState} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {loginUser} from "../model/auth.model";
import {Navigate} from "react-router-dom";

type FieldType = {
    email?: string; password?: string; remember?: string;
};
const Login: React.FC = () => {
    const [isUser, setIsUser] = useState(false);
    const onFinish = async (values: any) => {
        await loginUser(values)
            .then(() => {
                setIsUser(!isUser)
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (<Form
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

        <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{offset: 8, span: 16}}
        >
            <Checkbox>Запомнить на этом компьютере</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">
                Войти
            </Button>
        </Form.Item>
        {isUser && (
            <Navigate to="/main" replace={true} />
        )}
    </Form>)
};

export default Login;
