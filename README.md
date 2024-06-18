# Unindented (Notes Website)

This is the source code for my published notes, [notes.unindented.org](https://notes.unindented.org/).

The contents themselves are versioned separately as a submodule. You can find them at <https://github.com/unindented/unindented-notes>.

## Prerequisites

- [Hugo](https://gohugo.io/) - `brew install hugo`
- [GNU Make](https://www.gnu.org/software/make/) - `brew install make`
- [Node](https://nodejs.org/) - `brew install node`

## Develop

To develop the site, do:

```
pnpm dev
```

## Test

To test the site, do:

```
pnpm test
```

If you need to update snapshots, do:

```
pnpm test:e2e:update-snapshots
```

## Build

To build the site, do:

```
pnpm build
```

## Serve

To serve the built site, do:

```
pnpm start
```

## Meta

- Code: `git clone https://github.com/unindented/unindented-notes-hugo.git`
- Home: <https://notes.unindented.org/>

## Contributors

Daniel Perez Alvarez ([daniel@unindented.org](mailto:daniel@unindented.org))

## License

Copyright (c) 2024 Daniel Perez Alvarez ([unindented.org](https://www.unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
