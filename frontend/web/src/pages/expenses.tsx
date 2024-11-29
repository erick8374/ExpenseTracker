import React, { useEffect, useState } from 'react'
import TransactionService from './services/transactionService'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import ExpensePerCategory from './components/expensesView/charts/ExpensePerCategory'
import ExpensePerPeriod from './components/expensesView/charts//ExpensesPerPeriod'
import NewExpensesTable from "./components/expensesView/newExpensesTable"
import NewCategoriesTable from './components/newCategory'

const Expenses = () => {
  const [expenses, setExpenses] = useState([])


  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await TransactionService.getTransactionsbyType("expense")
      setExpenses(data)
    }
    fetchExpenses()
  }, [])


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