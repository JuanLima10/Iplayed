export function sliceGameRating(ratings: String[]){
  let fiveStars = 0,
  halfFourStars = 0,
  fourStars = 0,
  halfThreeStars = 0,
  threeStars = 0,
  halfTwoStars = 0,
  twoStars = 0,
  halfOneStars = 0,
  oneStars = 0,
  halfStars = 0,
  zeroStars = 0
  
  
  fiveStars = ratings.filter((n) => n === "5").length
  halfFourStars = ratings.filter((n) => n === "4.5").length
  fourStars = ratings.filter((n) => n === "4").length
  halfThreeStars = ratings.filter((n) => n === "3.5").length
  threeStars = ratings.filter((n) => n === "3").length
  halfTwoStars = ratings.filter((n) => n === "2.5").length
  twoStars = ratings.filter((n) => n === "2").length
  halfOneStars = ratings.filter((n) => n === "1.5").length
  oneStars = ratings.filter((n) => n === "1").length
  halfStars = ratings.filter((n) => n === "0.5").length

  return[
    halfStars,
    oneStars,
    halfOneStars,
    twoStars,
    halfTwoStars,
    threeStars,
    halfThreeStars,
    fourStars,
    halfFourStars,
    fiveStars,
  ];
}