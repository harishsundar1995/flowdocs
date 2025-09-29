import axios, { AxiosResponse } from 'axios';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  category?: string;
  author: string;
  publishedDate?: string;
  excerpt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

class StrapiClient {
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:1337') {
    this.baseURL = baseURL;
  }

  async fetchAllArticles(limit: number = 50): Promise<Article[]> {
    const response: AxiosResponse = await axios.get(`${this.baseURL}/api/articles?populate=*&publicationState=live&sort=publishedAt:desc&pagination[limit]=${limit}`);
    return this.transformArticles(response.data.data);
  }

  async fetchArticleBySlug(slug: string): Promise<Article | null> {
    const response: AxiosResponse = await axios.get(`${this.baseURL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
    const articles = this.transformArticles(response.data.data);
    return articles.length > 0 ? articles[0] : null;
  }

  async fetchArticlesByCategory(category: string): Promise<Article[]> {
    const response: AxiosResponse = await axios.get(`${this.baseURL}/api/articles?filters[category][$eq]=${category}&populate=*`);
    return this.transformArticles(response.data.data);
  }

  private transformArticles(data: any[]): Article[] {
    return data.map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      category: item.category,
      author: item.author,
      publishedDate: item.publishedDate,
      excerpt: item.excerpt,
      tags: item.tags ? item.tags.map((tag: any) => tag.name) : [],
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
    }));
  }
}

export default new StrapiClient();
export { StrapiClient };
