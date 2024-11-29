import axios from 'axios'
const baseUrl = 'http://localhost:3001/webmob/api'

class TransactionService {

    async getTransactions() {
        return await axios.get(`${baseUrl}/transactions`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getTransactionsbyId(id:number) {
        return await axios.get(`${baseUrl}/transactions`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getTransactionsbyCategory(id:number) {
        return await axios.get(`${baseUrl}/transactions/category/${id}`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getTransactionsbyType(type:string) {
        return await axios.get(`${baseUrl}/transactions?type=${type}`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    addTransaction(data: any) {
        return axios.post(`${baseUrl}/transaction`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteTransaction(id: number) {
        return axios.delete(`${baseUrl}/transaction/${id}`).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover transaction', error)
            })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateTransaction(id: number, data: any) {
        return axios.put(`${baseUrl}/transaction/${id}`, data)
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new TransactionService