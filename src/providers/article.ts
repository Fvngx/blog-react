import { httpProvider } from './http'
import Showdown from 'showdown'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedASutoLink: true,
  strikethrough: true,
  tasklists: true,
  emoji: true,
})

export class ArticleProvider {
  /**
   * 获取所有文章
   * @param params 
   */
  static async getArticles(params): Promise<[any[], number]> {
    return httpProvider.get('/article', {params})
  }

  /**
   * 获取分类所有文章
   * @param category 
   * @param params 
   */
  static async getArticlesByCategory(category, params):Promise<[any[], number]> {
    return httpProvider.get('/article/category/' + category, {params})
  }

  /**
   * 获取推荐文章
   * @param articleId 
   */
  static async getRecommend(articleId = null): Promise<any[]> {
    return httpProvider.get('/article/recommend', {params: {articleId}})
  }

  /**
   * 获取所有文章归档
   */
  static async getArchives(): Promise<{
    [key: string]: { [key: string]: any[] }
  }> {
    return httpProvider.get('/article/archives')
  }

  /**
   * 获取指定文章
   * @param id 
   */
  static async getArticle(id): Promise<any> {
    return httpProvider.get(`/article/${id}`)
  }

  /**
   * 新建文章
   * @param data 
   */
  static async addArticle(data): Promise<any> {
    return httpProvider.post('/article', data)
  }

  /**
   * 更新文章
   * @param id 
   * @param data 
   */
  static async updateArticle(id, data): Promise<any> {
    return httpProvider.patch(`/article/${id}`, data)
  }

  /**
   * 更新文章阅读量
   * @param id 
   */
  static async updateArticleView(id): Promise<any> {
    return httpProvider.post(`/article/${id}/views`)
  }

  /**
   * 删除文章
   * @param id 
   */
  static async deleteArticle(id): Promise<any> {
    return httpProvider.delete(`/article/${id}`)
  }
}