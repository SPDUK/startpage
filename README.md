# startpage.fira.app

> This is a startpage with all settings saved to a database, so you can keep your bookmarks and other options saved and synced wherever you use it.

![](https://i.imgur.com/1x8K8mu.jpg)

## Current Version https://startpage-spduk.herokuapp.com/

### Will take a few seconds to load as it's hosted for free on heroku

## Example of a pre-login screen: http://startpage-0dd33d.webflow.io/

The current version is usable if you understand some of the limitations, but not very user friendly.

- Icons for bookmarks currently use [fontawesome icons](https://fontawesome.com/icons?d=gallery).
- The timezones for the clock are using [moment timezone](https://momentjs.com/timezone/).
- The weather information is using [openweathermap](https://www.openweathermap.org/) free version.
- It is only intended for larger screens as smaller devices have these things built-in anyway.

## Development setup

create a file "variables.env" in the root folder
inside variables.env add a JWT secret and a link to your mongoDB

```sh
JWT_SECRET='A JWT Secret string goes here',
MONGODB="MongoDB Url goes here"
```

run these commands:
`yarn dev` to start the express server and react server at the same time
`yarn start` to start the express server
`yarn client` to start the react server

## To self-host

Enter the client folder and run build, when that has finished set up express to render the index.html inside /client/build.
[ A link to help](https://daveceddia.com/deploy-react-express-app-heroku/)

## Release History

- v0.1
  - Hosted online! 🎉

## Roadmap

### core

- Clean up the code, especially inline styles and fighting against material UI.
- Add location pickers and user-friendly inputs
- Add bookmark pickers
- Add a privacy & about us text

### potential extras

- Alarm / notifications
- Wallpaper picker / Randomizer
