const fs = require('fs');
const path = require('path');
const { default: CLIENT, StrapiClient } = require('../src/lib/strapiClient.js');

async function syncContent() {
  try {
    const articles = await CLIENT.fetchAllArticles();

    const outputDir = path.join(__dirname, '../docs/ai-generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const article of articles) {
      const frontMatter = {
        id: article.slug,
        title: article.title,
        author: article.author,
        description: article.excerpt || '',
        tags: article.tags,
        slug: article.slug,
        sidebar_position: articles.indexOf(article) + 1,
      };

      let markdown = '---\n';
      markdown += Object.entries(frontMatter).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
      markdown += '\n---\n\n';
      markdown += article.content;

      const filePath = path.join(outputDir, `${article.slug}.md`);
      fs.writeFileSync(filePath, markdown);
      console.log(`Synced: ${article.slug}`);
    }

    // Update sidebar for ai-generated docs
    updateSidebar(articles);
    console.log('Content sync complete');
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

function updateSidebar(articles) {
  // For simplicity, we'll add to sidebars.ts directly or generate a sidebars.generated.ts
  // For now, log it.
  console.log('Sidebar update not implemented yet');
}

module.exports = syncContent;

if (require.main === module) {
  syncContent();
}
