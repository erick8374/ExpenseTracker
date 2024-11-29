import axios from 'axios'
const baseUrl = 'http://localhost:3001/webmob/api'

class UserService {

    async getUsers() {
        return await axios.get(`${baseUrl}/users`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlIiwiaWF0IjoxNzI5NTQwMzQ2LCJleHAiOjE3Mjk1NDM5NDZ9.DxKFCctdtfvuc3KgNnyOi1elTeeh391B4zO_RBeG-Sc'
            }
        })        
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }

    getUser(id: number) {
        return axios.get(`${baseUrl}/user/${id}`, ).then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addUser(data: any) {
        return axios.post(`${baseUrl}/user`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteUser(id: number) {
        return axios.delete(`${baseUrl}/user/${id}`).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover usuario', error)
            })
    }

    updateUser(id: number, data: any) {
        return axios.put(`${baseUrl}/user/${id}`, data)
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new UserService