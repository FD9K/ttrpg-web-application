# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Custom Routing Structure
The `/src/routes` directory generates the web application's structure based upon its own. As such, right now, the structure of the web application is as follows:

/   --- landing page for the app
/app/:instanceId   --- actual display for the combat/campaign; basically, this serves as the party's collective main screen.
/compendium   --- references; I don't know that we need this user-facing per se since the Wiki will be the SoT on that front. 
  /abilities
  /items
  /skills
  /spells
/party
  /:partyId   --- party management, invite/remove player characters, link to campaign materials, link to campaign application.
  /   --- create new
/user
  /login   --- autentication tools
  /logout
  /register
  /:userId   --- user-specific profile page.
    /characters   --- list of user's character creations.
      /:characterID   --- character sheet. 
