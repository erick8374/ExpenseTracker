import axios from 'axios'
const baseUrl = 'http://localhost:3001/webmob/api'

class AccountService {

    async getAccounts() {
        return await axios.get(`${baseUrl}/accounts`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getAccountsbyId(id:number) {
        return await axios.get(`${baseUrl}/accounts`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }

    addAccount(data: any) {
        return axios.post(`${baseUrl}/account`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteAccount(id: number) {
        return axios.delete(`${baseUrl}/account/${id}`).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover account', error)
            })
    }

    updateAccount(id: number, data: any) {
        return axios.put(`${baseUrl}/account/${id}`, data)
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new AccountService