import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IReview as Review } from '@/common/interfaces/review.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import {
  ReviewQuery as Params,
  ReviewCreate,
  ReviewUpdate,
} from '@/common/schemas/review.schema'

class ReviewService {
  async get(params?: Params): Promise<Response<Review[]>> {
    return http<Response<Review[]>>('/review', { params })
  }

  async most(params?: Params): Promise<Response<Review[]>> {
    return http<Response<Review[]>>('/review/most', { params })
  }

  async getBySlug(slug: string, params?: Params): Promise<Response<Review[]>> {
    return http<Response<Review[]>>(`/review/slug/${slug}`, { params })
  }

  async getByUser(userId: string): Promise<Response<Review[]>> {
    return http<Response<Review[]>>(`/review/user/${userId}`)
  }

  async post(body: ReviewCreate): Promise<Review> {
    const { data } = await api.post<Review>('/review', body)
    return data
  }

  async patch(body: ReviewUpdate): Promise<Review> {
    const { data } = await api.patch<Review>('/review', body)
    return data
  }

  async delete(): Promise<void> {
    await api.delete('/review')
  }
}

export const review_api = new ReviewService()
