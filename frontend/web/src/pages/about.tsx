import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';

const About: React.FC  = () => {


  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Sobre Mim</Card.Title>
              <Card.Text>
                <strong>Nome completo:</strong> Érick Landim de Paula
              </Card.Text>
              <Card.Text>
                <strong>E-mail:</strong> 185329@upf.br
              </Card.Text>
              <Card.Text>
                <strong>Descrição:</strong>
                <p>
                  Sou um desenvolvedor apaixonado por tecnologia e aprendizado contínuo. 
                  Trabalho com desenvolvimento web, utilizando React, Node.js e outras tecnologias modernas. 
                  Estou sempre em busca de novos desafios e oportunidades de crescimento pessoal e profissional.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About