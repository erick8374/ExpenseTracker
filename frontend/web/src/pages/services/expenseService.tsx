import axios from 'axios'
const baseUrl = 'http://localhost:3001/webmob/api'

class ExpenseService {

    async getExpenses() {
        return await axios.get(`${baseUrl}/expenses`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getExpensesbyId(id:number) {
        return await axios.get(`${baseUrl}/expense`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    // async getExpensesbyUser(id:number) {
    //     return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
    //     .catch((error) => {
    //         console.error('Error fetching data:', error)
    //     })
    // async getExpensesbyCategory(idCategory:number) {
    //     return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
    //     .catch((error) => {
    //         console.error('Error fetching data:', error)
    //     })
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addExpense(data: any) {
        return axios.post(`${baseUrl}/expense`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteExpense(id: number) {
        return axios.delete(`${baseUrl}/expense/${id}`).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover expense', error)
            })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateExpense(id: number, data: any) {
        return axios.put(`${baseUrl}/expense/${id}`, data)
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new ExpenseService