import React, { useEffect, useState } from "react"
import axios from "axios"
import { Col, Row } from "react-bootstrap"

const HealthStatus = () => {
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkHealth = async () => {
    setLoading(true)
    await axios.get("http://localhost:3001/webmob/api/healthcheck")
      .then((res) => {
        setStatus(res.status === 200)
      }).catch((err) => {
        setStatus(false)
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    checkHealth()
    const intervalId = setInterval(() => {
        checkHealth()
    }, 10000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Row className="align-items-center justify-content-center">
      <Col>
        <div>Status:</div>
      </Col>
      <Col>
        {loading ? (
          <div className="statusDown"/>
        ) : (
          <div className={status ? "statusUp" : "statusDown"}/>
        )}
      </Col>
    </Row>
  )
}

export default HealthStatus
