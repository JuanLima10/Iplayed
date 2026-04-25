import { ProblemDetails } from '../interfaces/problem-details.interface'

export class ProblemError extends Error {
  status: number
  type: string
  detail?: string
  instance?: string

  constructor(problem: ProblemDetails) {
    super(problem.title)
    this.name = 'ProblemError'
    this.status = problem.status
    this.type = problem.type
    this.detail = problem.detail
    this.instance = problem.instance
  }
}
