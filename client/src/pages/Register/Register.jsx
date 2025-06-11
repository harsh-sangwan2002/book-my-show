import { Button, Form, Input, Radio, message } from 'antd'
import { Link } from 'react-router-dom'
import { registerUser } from '../../api/user';

const Register = () => {

    const [messageApi, contentHolder] = message.useMessage();

    const register = async (values) => {
        try {
            const response = await registerUser(values);
            const data = response.data;
            console.log(data);
            if (data.success) {
                messageApi.open({
                    type: "success",
                    content: data.message
                })
                localStorage.setItem('token', token);
            } else {
                messageApi.open({
                    type: "error",
                    content: data.message
                })
            }
        } catch (err) {
            console.log(err);
            messageApi.open({
                type: "error",
                content: "Registration Failed"
            })
        }
    }

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1 style={{ fontSize: '2.3rem' }}>Register to BookMyShow</h1>
                    </section>
                    <section className="right-section">
                        {
                            contentHolder
                        }
                        <Form layout='vertical' onFinish={register}>
                            <Form.Item
                                name="name"
                                label="Name"
                                className='d-block'
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input type="name" placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                className='d-block'
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input type="email" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                className='d-block'
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                label="Register as a Partner"
                                htmlFor='role'
                                className='d-block text-center'
                                initialValue={false}
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <Radio.Group name='radiogroup' className='flex-start'>
                                        <Radio value="partner">Yes</Radio>
                                        <Radio value="user">No</Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                block
                                style={{ fontSize: '1rem', fontWeight: '500' }}
                            >
                                Register
                            </Button>
                        </Form>
                        <div>
                            <p>
                                Already a user? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </section>
                </main>
            </header>
        </>
    )
}

export default Register
