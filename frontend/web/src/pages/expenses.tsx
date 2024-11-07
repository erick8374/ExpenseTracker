import React, { useEffect, useState } from 'react'
import ExpenseService from './services/expenseService'
import { Button, Container, Modal, Table } from 'react-bootstrap'

const MatchList = () => {
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
    </>
  )
}

export default MatchList