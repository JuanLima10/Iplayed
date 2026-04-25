import { IResponse as Response } from '@/common/interfaces/response.interface'
import { IReview as Review } from '@/common/interfaces/review.interface'
import api from '@/common/lib/api.lib'
import { http } from '@/common/lib/http.lib'
import {
  ReviewCreate,
  ReviewQuery,
  ReviewUpdate,
} from '@/common/schemas/review.schema'

class ReviewService {
  async get(params?: ReviewQuery): Promise<Response<Review[]>> {
    return http<Response<Review[]>>('/review', { params })
  }

  async most(params?: ReviewQuery): Promise<Response<Review[]>> {
    return http<Response<Review[]>>('/review/most', { params })
  }

  async getBySlug(slug: string): Promise<Response<Review[]>> {
    return http<Response<Review[]>>(`/review/${slug}`)
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
    return await api.delete('/review')
  }
}

export const review_api = new ReviewService()
