import axios from 'axios'
const baseUrl = 'http://localhost:3001/webmob/api'

class CategoryService {

    async getCategories() {
        return await axios.get(`${baseUrl}/categories`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    async getCategoriesbyId(id:number) {
        return await axios.get(`${baseUrl}/category`).then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
    }
    // async getCategorysbyUser(id:number) {
    //     return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
    //     .catch((error) => {
    //         console.error('Error fetching data:', error)
    //     })
    // async getCategorysbyCategory(idCategory:number) {
    //     return await axios.get(`${baseUrl}/matches`).then((response) => response.data)
    //     .catch((error) => {
    //         console.error('Error fetching data:', error)
    //     })
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addCategory(data: any) {
        return axios.post(`${baseUrl}/category`, data).then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteCategory(id: number) {
        return axios.delete(`${baseUrl}/category/${id}`).then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover category', error)
            })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateCategory(id: number, data: any) {
        return axios.put(`${baseUrl}/category/${id}`, data)
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new CategoryService