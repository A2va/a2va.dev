# a2va.dev

My personal website, which contains my blog and some projects I've worked on. It is built using bun as the package manager, but should work with other package managers as well.

You can run it with the following commands
```
bun install
bun dev
```

For deployment, you can use the following command
```
docker build -t a2va/a2va.dev .
docker run -t -p 3000:3000 a2va/a2va.dev
```

My color palette is built using [palettte.app](https://palettte.app/) (great tool that I have found in the tailwindcss documentation), you can get the palette using `palette.json` located in the public directory.

# Acknowledgements

* Thanks to [@bardenHa](https://github.com/bardenHa) for his [portfolio website](https://www.barden.dev/), from which I borrow many components and design ideas.
* Thanks to [@andi23rosca](https://github.com/andi23rosca/) for the starting point of my vite plugin, and its tree component.
