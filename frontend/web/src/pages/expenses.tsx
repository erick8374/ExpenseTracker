import React, { useEffect, useState } from 'react'
import ExpenseService from './services/expenseService'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import ExpensePerCategory from './components/ExpensePerCategory'
import ExpensePerPeriod from './components/ExpensesPerPeriod'
import NewExpensesTable from "./components/newExpensesTable"
import NewCategoriesTable from './components/newCategory'
import { MdMargin } from 'react-icons/md'


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
        <Row className="align-items-center">
          <Col>
            <ExpensePerCategory/>
          </Col>
        </Row>
        <Row className="align-items-center mb-6">
          <Col>
             <NewCategoriesTable/>
          </Col>
        </Row>
        <Row className="align-items-center mb-6">
        <ExpensePerPeriod></ExpensePerPeriod>
        </Row>
        </Col>
      </Row>
    </Container>

    </>
  )
}

export default Expenses