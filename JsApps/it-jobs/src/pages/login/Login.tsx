import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { history } from "../..";
import { UseStore } from "../../stores/Store";
import Path from "../../utils/route/Path";
const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const { userStore } = UseStore();
    const [cookie, setCookie] = useCookies(["token"]);

    if (cookie.token !== undefined) {
        history.push(Path.home);
    }

    const login = async () => {
        await userStore.login({ username: username, password: password });
        console.log(userStore.getUser.id);
        console.log(userStore.getisLoggedIn);
        if (userStore.getisLoggedIn) {
            setIsInvalid(false);
            setCookie("token", userStore.getUser.accessToken);
        } else {
            setIsInvalid(true);
        }
    };

    if (userStore.isLoading) {
        return <h1>loading</h1>;
    }

    return (
        <Container className="container-auth">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Form className="auth-form">
                        <Form.Group className="auth-form-group auth-form-group-title">
                            <Form.Label className="form-auth-title">
                                <h1>Login</h1>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Form.Label className="auth-form-label">Username</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="text"
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                                required={true}
                                isInvalid={isInvalid}
                            />
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Form.Label className="auth-form-label">Password</Form.Label>
                            <Form.Control
                                className="auth-form-input"
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                                isInvalid={isInvalid}
                            />
                            <Form.Control.Feedback type="invalid">invalid password or username</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="auth-form-group">
                            <Button variant="primary" type="button" onClick={login} className="login-submit">
                                Login
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default observer(Login);
