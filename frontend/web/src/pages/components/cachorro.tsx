import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import axios from "axios";

function CachorroDoDia() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const fetchDogImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://picsum.photos/id/237/400/600", {
        responseType: "blob", 
      });
      const imageBlobUrl = URL.createObjectURL(response.data);
      setImageUrl(imageBlobUrl);
    } catch (error) {
      console.error("Erro ao buscar a imagem:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, [update]);

  return (
    <Container className="mt-5 p-5">
      <Row className="align-items-center mb-4 sticky-top">
        <Col>
          <h1>Cachorro do Dia</h1>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={() => setUpdate(!update)}>
            Atualizar
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {loading ? (
          <Spinner animation="border" role="status" className="my-4">
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          <Image
            src={imageUrl}
            alt="Random Dog"
            fluid
            rounded
            className="my-4 shadow-lg"
            style={{
              objectFit: "contain",
              maxHeight: "calc(100vh - 300px)",
              maxWidth: "100%",
            }}
          />
        )}
      </Row>
    </Container>
  );
}

export default CachorroDoDia;
