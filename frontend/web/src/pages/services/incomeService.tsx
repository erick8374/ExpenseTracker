import axios from 'axios'
const baseUrl = 'http://localhost:3001/webmob/api'

class IncomeService {

    async getIncomes() {
        return await axios.get(`${baseUrl}/incomes`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getIncomesbyId(id:number) {
        return await axios.get(`${baseUrl}/incomes`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    // async getIncomesbyUser(id:number) {
    //     return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
    //     .catch((error) => {
    //         console.error('Error fetching data:', error)
    //     })
    // async getIncomesbyCategory(idCategory:number) {
    //     return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
    //     .catch((error) => {
    //         console.error('Error fetching data:', error)
    //     })
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addIncome(data: any) {
        return axios.post(`${baseUrl}/income`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteIncome(id: number) {
        return axios.delete(`${baseUrl}/income/${id}`).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover income', error)
            })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateIncome(id: number, data: any) {
        return axios.put(`${baseUrl}/income/${id}`, data)
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new IncomeService