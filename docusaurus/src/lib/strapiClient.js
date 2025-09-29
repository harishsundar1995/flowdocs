const axios = require('axios');

class StrapiClient {
  constructor(baseURL = 'http://localhost:1337') {
    this.baseURL = baseURL;
  }

  async fetchAllArticles(limit = 50) {
    const response = await axios.get(`${this.baseURL}/api/articles?populate=*&publicationState=live&sort=publishedAt:desc&pagination[limit]=${limit}`);
    return this.transformArticles(response.data.data);
  }

  async fetchArticleBySlug(slug) {
    const response = await axios.get(`${this.baseURL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
    const articles = this.transformArticles(response.data.data);
    return articles.length > 0 ? articles[0] : null;
  }

  async fetchArticlesByCategory(category) {
    const response = await axios.get(`${this.baseURL}/api/articles?filters[category][$eq]=${category}&populate=*`);
    return this.transformArticles(response.data.data);
  }

  transformArticles(data) {
    return data.map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      category: item.category,
      author: item.author,
      publishedDate: item.publishedDate,
      excerpt: item.excerpt,
      tags: item.tags ? item.tags.map(tag => tag.name) : [],
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
    }));
  }
}

const client = new StrapiClient();
module.exports = { StrapiClient, default: client };
