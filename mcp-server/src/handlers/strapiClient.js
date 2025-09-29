const axios = require('axios');

const BASE_URL = process.env.STRAPI_BASE_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

class StrapiClient {
  constructor() {
    this.baseURL = BASE_URL;
    this.apiToken = API_TOKEN;
  }

  async createArticle(data) {
    const response = await axios.post(`${this.baseURL}/api/articles`, {data}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiToken}`,
      },
    });
    return response.data;
  }

  async getArticles(filters = {}) {
    let url = `${this.baseURL}/api/articles?populate=*&publicationState=live&sort=publishedAt:desc`;
    if (filters.category) {
      url += `&filters[category][$eq]=${filters.category}`;
    }
    const response = await axios.get(url);
    return response.data.data;
  }

  async getArticleById(id) {
    const response = await axios.get(`${this.baseURL}/api/articles/${id}?populate=*`);
    return response.data;
  }

  async getArticleBySlug(slug) {
    const response = await axios.get(`${this.baseURL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data[0];
  }

  async updateArticle(id, data) {
    const response = await axios.put(`${this.baseURL}/api/articles/${id}`, {data}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiToken}`,
      },
    });
    return response.data;
  }

  async deleteArticle(id) {
    const response = await axios.delete(`${this.baseURL}/api/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
      },
    });
    return response.data;
  }

  async searchArticles(query, category = null) {
    let url = `${this.baseURL}/api/articles?filters[content][$contains]=${encodeURIComponent(query)}&populate=*`;
    if (category) {
      url += `&filters[category][$eq]=${category}`;
    }
    const response = await axios.get(url);
    return response.data.data;
  }
}

const client = new StrapiClient();
module.exports = client;
