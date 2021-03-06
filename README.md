<h1 align="center">Stormtide UI</h1>
<div align="center">
	<a href="https://travis-ci.org/StormtideGame/stormtide-ui">
		<img src="https://img.shields.io/travis/StormtideGame/stormtide-ui.svg" />
	</a>
	<a href="https://coveralls.io/github/StormtideGame/stormtide-ui">
		<img src="https://img.shields.io/coveralls/StormtideGame/stormtide-ui.svg" />
	</a>
	<a href="https://www.npmjs.com/package/stormtide-ui">
		<img src="https://img.shields.io/npm/v/stormtide-ui.svg" />
	</a>
	<a href="https://gitter.im/StormtideGame/Lobby">
		<img src="https://img.shields.io/gitter/room/stormtidegame/stormtide-ui.svg" />
	</a>
</div>

<div align="center">
	<strong>Default UI for Stormtide</strong>
</div>

<div>&nbsp;</div>

This is the repository for the default user interface for Stormtide, implementing a React interface for playing the game. It contains no interface.

## Running locally
You need Node.js 6.x.

Clone the repository
```sh
git clone https://github.com/StormtideGame/stormtide-ui.git
cs stormtide-ui
```

Install dependencies
```sh
npm install -g gulp
npm install
```

Run tests
```sh
npm test
```

Host the client on a local server
```sh
gulp && gulp watch
```

**Visit [localhost:3000](http://localhost:3000)**

## Primary Goals
- Clean, tested codebase
- High rules accuracy
- Deterministic game replays

## License
Stormtide Core is licensed under the MIT license. See the [LICENSE file](LICENSE.md) for more details.