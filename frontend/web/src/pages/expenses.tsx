import React, { useEffect, useState } from 'react'
import ExpenseService from './services/expenseService'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import ExnpensePerCategory from './components/ExnpensePerCategory'
import NewExpensesTable from "./components/newExpensesTable"

import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from "chart.js"
import ExpensePerPeriod from './components/ExpensesPerPeriod'

ChartJS.register(
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);
const Expenses = () => {
  const [matches, setMatches] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedParticipants, setSelectedParticipants] = useState([])

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await ExpenseService.getExpenses()
      setMatches(data)
    }
    fetchMatches()
  }, [])

  const handleStartScore = (participants) => {
    setSelectedParticipants(participants)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedParticipants([])
  }

  return (
    <>
    <Container>
      <Row className="align-items-center mb-6">
        <Col>
        <NewExpensesTable></NewExpensesTable>
        </Col>
        <Col>
        <Row>
        <ExnpensePerCategory/>
        </Row>
        <Row>
        <ExpensePerPeriod></ExpensePerPeriod>
        </Row>
        </Col>
      </Row>
    </Container>

    </>
  )
}

export default Expenses