# Portal Tools for HubSpot
This app copies website pages and landing pages from one HubSpot portal to another. In order to use it you will need to create a private app in each portal with "content" scopes and have the private app keys available.
## What this does
This section covers what this tool moves and what it does not. The stuff that it moves list is going to start out pretty small and hopefully grow over time. The list of stuff that needs to be handled manually will probably grow at first as I use this tool and discover more issues but will hopefully also shrink eventually. I will add notes and update as the project evolves.
### Stuff that gets moved
- Moves over basic non linked site content that is directly added to the page all modules, sections, and associated styles on sections/columns/modules.
- All associated page data and settings (anything you would add in the settings payne when editing a page).
### Stuff that needs to be updated and moved manually
- All theme files/modules that are used on the pages that will be moved. If you are a super admin in both portals this can be done by right clicking on the themes/files you want to move and choosing the move to another account option.
- Any theme settings will need to be manually added into the the new portal. (All of the fonts, colors, etc that get changed when you edit the theme in the CMS )
- All images used. If your images are organized you can download what you need and use the bulk upload in the file manager.
- All links to images will need to be replaced in the CMS. All of the images selected in the CMS will still be pointed at the CDN for the origin portal.
- All links that point to any moved pages. This will have to be done via the CMS at the moment as they will still point to pages in the old portal.
- The menus will need to be recreated in the new portal
- The forms will need to be recreated in the new portal
## Getting Started

First, install all dependencies then start the dev server:

```bash

npm install
npm run dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


