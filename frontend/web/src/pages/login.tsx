import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin" && password === "123") {
      localStorage.setItem("isLoggedIn", "true"); 
      await router.push("/");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <Row>
        <Col md={12}>
          <h3 className="text-center">Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
