import axios from 'axios'
const baseUrl = 'http://localhost:3001/webmob/api'

class ExpenseService {

    async getExpenses() {
        return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getExpensesbyId(id:number) {
        return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
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
}

export default new ExpenseService