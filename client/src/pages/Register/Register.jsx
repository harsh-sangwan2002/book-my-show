import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { registerUser } from '../../api/user';

const Register = () => {

    const register = async (values) => {
        try {
            const response = await registerUser(values);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Register to BookMyShow</h1>
                    </section>
                    <section className="right-section">
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
