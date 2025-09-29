const { z } = require('zod');
const strapiClient = require('./strapiClient');

// Tool schemas using Zod
const createDocumentationPageSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  excerpt: z.string().optional(),
});

const listDocumentationPagesSchema = z.object({
  category: z.string().optional(),
  limit: z.number().min(1).max(100).default(25),
  published_only: z.boolean().default(true),
});

const updateDocumentationPageSchema = z.object({
  article_id: z.number(),
  title: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const getDocumentationPageSchema = z.object({
  identifier: z.string(), // ID or slug
});

const deleteDocumentationPageSchema = z.object({
  article_id: z.number(),
});

const searchDocumentationSchema = z.object({
  query: z.string(),
  category: z.string().optional(),
});

// Tool handlers
async function handleCreateDocumentationPage(args) {
  try {
    const validatedArgs = createDocumentationPageSchema.parse(args);
      const slug = validatedArgs.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); // Clean slug
      const data = {
        title: validatedArgs.title,
        slug: slug,
        content: validatedArgs.content,
        author: 'AI Generated',
        articlestatus: 'published',
      };
      if (validatedArgs.category) data.category = validatedArgs.category;
      if (validatedArgs.tags && validatedArgs.tags.length) data.tags = validatedArgs.tags; // Note: this may not work if tags need IDs
      if (validatedArgs.excerpt) data.excerpt = validatedArgs.excerpt;
    const result = await strapiClient.createArticle(data);
    return {
      success: true,
      article_id: result.data.id,
      slug: result.data.slug,
      message: 'Article created successfully',
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function handleListDocumentationPages(args) {
  try {
    const validatedArgs = listDocumentationPagesSchema.parse(args);
    const filters = {};
    if (validatedArgs.category) filters.category = validatedArgs.category;
    const articles = await strapiClient.getArticles(filters);
    const limited = articles.slice(0, validatedArgs.limit);
    return {
      articles: limited.map(a => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        category: a.category,
        createdAt: a.createdAt,
      })),
      total_count: articles.length,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function handleUpdateDocumentationPage(args) {
  try {
    const validatedArgs = updateDocumentationPageSchema.parse(args);
    const updateData = {};
    if (validatedArgs.title) updateData.title = validatedArgs.title;
    if (validatedArgs.content) updateData.content = validatedArgs.content;
    if (validatedArgs.category) updateData.category = validatedArgs.category;
    if (validatedArgs.tags) updateData.tags = validatedArgs.tags;
    const result = await strapiClient.updateArticle(validatedArgs.article_id, updateData);
    return {
      success: true,
      updated_article: {
        id: result.data.id,
        title: result.data.title,
      },
      message: 'Article updated successfully',
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function handleGetDocumentationPage(args) {
  try {
    const validatedArgs = getDocumentationPageSchema.parse(args);
    let article;
    if (isNaN(validatedArgs.identifier)) {
      article = await strapiClient.getArticleBySlug(validatedArgs.identifier);
    } else {
      article = (await strapiClient.getArticleById(parseInt(validatedArgs.identifier))).data;
    }
    if (!article) {
      return { success: false, message: 'Article not found' };
    }
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      category: article.category,
      author: article.author,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function handleDeleteDocumentationPage(args) {
  try {
    const validatedArgs = deleteDocumentationPageSchema.parse(args);
    await strapiClient.deleteArticle(validatedArgs.article_id);
    return {
      success: true,
      message: 'Article deleted successfully',
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function handleSearchDocumentation(args) {
  try {
    const validatedArgs = searchDocumentationSchema.parse(args);
    const articles = await strapiClient.searchArticles(validatedArgs.query, validatedArgs.category);
    return {
      results: articles.map(a => ({
        id: a.id,
        title: a.title,
        excerpt: a.content.substring(0, 100) + '...',
      })),
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Tools array
const tools = [
  {
    name: 'create_documentation_page',
    description: 'Create a new documentation article in Strapi',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Article title' },
        content: { type: 'string', description: 'Article markdown content' },
        category: { type: 'string', description: 'Category for the article' },
        tags: { type: 'array', items: { type: 'string' } },
        excerpt: { type: 'string', description: 'Short summary' },
      },
      required: ['title', 'content'],
    },
    handler: handleCreateDocumentationPage,
  },
  {
    name: 'list_documentation_pages',
    description: 'List documentation articles',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string' },
        limit: { type: 'number', minimum: 1, maximum: 100, default: 25 },
        published_only: { type: 'boolean', default: true },
      },
    },
    handler: handleListDocumentationPages,
  },
  {
    name: 'update_documentation_page',
    description: 'Update an existing documentation article',
    inputSchema: {
      type: 'object',
      properties: {
        article_id: { type: 'number', description: 'Article ID' },
        title: { type: 'string' },
        content: { type: 'string' },
        category: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['article_id'],
    },
    handler: handleUpdateDocumentationPage,
  },
  {
    name: 'get_documentation_page',
    description: 'Get details of a documentation article by ID or slug',
    inputSchema: {
      type: 'object',
      properties: {
        identifier: { type: 'string', description: 'Article ID number or slug' },
      },
      required: ['identifier'],
    },
    handler: handleGetDocumentationPage,
  },
  {
    name: 'delete_documentation_page',
    description: 'Delete a documentation article',
    inputSchema: {
      type: 'object',
      properties: {
        article_id: { type: 'number' },
      },
      required: ['article_id'],
    },
    handler: handleDeleteDocumentationPage,
  },
  {
    name: 'search_documentation',
    description: 'Search documentation articles by keyword',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        category: { type: 'string' },
      },
      required: ['query'],
    },
    handler: handleSearchDocumentation,
  },
];

module.exports = tools;
