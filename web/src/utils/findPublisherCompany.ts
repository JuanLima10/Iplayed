import { GameInvolvedCompanyProps } from "@/Types/Game"

export function findPublisherCompany(companies: GameInvolvedCompanyProps[]){
  if(companies){
    const publisher = companies && companies.map((company: GameInvolvedCompanyProps) => company.publisher).indexOf(true)
    return publisher !== undefined && companies[publisher]?.company.name
  }
  return ""
}