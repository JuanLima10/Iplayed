# Iplayed
<p align="center">
  <a href="https://nextjs.org" target="blank">
    <img src="./web/public/wallpaper.jpeg" width="600" alt="project" style="border-radius: 10px 10px 0px 0px" />
  </a>
</p>

### This is a games library to you rate and organize the games you have been playing developed by me to rate my favorite games, web link: <a href="#">IPlayed</a>

> Status: Developing!

## 🧪 Technologies:

+ Next JS
+ Node JS
+ TypeScript
+ Tailwind CSS
+ PostgreSQL

## 💻 Running the app
```bash
# Install web & api dependencies
$ npm install
```
You need to configurate the .ENV document following the example in the project and create an account on the <a href="https://www.twitch.tv/">Twitch</a> website to use the <a href="https://api-docs.igdb.com/#account-creation">IGDB</a> API and on <a href="https://discord.com/developers/docs/topics/oauth2">Discord</a> website to use the OAUTH.

```bash
# Run the app
$ npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗺️ Backend Endpoints

Method        | URL                   | Description
------------- | --------------------- |-------------
<b>User</b>
GET           | /user                 | Show all users.
GET & PUT     | /user/:id             | Shows an user and updates it according to param.
GET           | /user/profile/:id     | Shows a user and their favorite games.
GET           | /user/ratings/:id     | Shows user's rating games.
GET           | /user/info/:id        | Shows user's like, wish, ratings and reviews count.
<b>Game</b>
GET           | /game/:slug           | Shows a game according to the slug name.
GET           | /game/user/:slug      | Shows the user's game status.
GET           | /game/ratings/:slug   | Shows the game's rating numbers.
GET           | /game/info/:id        | Shows the game's like, wish and plays count.
PUT & DELETE  | /game/:id             | Update and Delete a game according to id.
<b>Review</b>
GET           | /game/reviews         | Shows all game reviews.
GET           | /game/reviews/:slug   | Shows all game's reviews according to slug name.
GET           | /user/reviews/:id     | Shows all user's reviews according to id.
GET           | /game/most-reviewed   | Shows the top 12 games most reviewed.
<b>Favorites</b>
GET           | /fav/:slug            | Shows favorites games according to game slug name.
GET           | /user/fav/:id         | Shows all user's favorites games.
GET           | /user/banner/:id      | Returns a random banner according to the user's favorites.
POST & DELETE | /game/fav/:slug       | Search, Add and Delete a favorite game.
<b>Like</b>
GET           | /like/:slug           | Shows like games according to game slug name.
GET           | /user/like/:id        | Shows all user's like games.
POST & DELETE | /game/like/:slug      | Like and Dislike a game.
<b>Wish</b>
GET           | /wish/:slug           | Shows wish games according to game slug name.
GET           | /user/wish/:id        | Shows all user's wish games.
POST & DELETE | /game/wish/:slug      | Add and Remove a game to wishlist.

## ✨ Links

+ Figma: <a href="https://www.figma.com/file/Fi0IvIYrzQ726IXT8870SY/IPlayed?type=design&node-id=0%3A1&mode=design&t=WjpaSyl484C23ayd-1" target="_blank">Designer do projeto</a>

+ IGDB: <a href="https://api-docs.igdb.com/#getting-started" target="_blank">IGDB games database docs</a>

+ Discord: <a href="https://discord.com/developers/applications" target="_blank">Discord developer docs</a>