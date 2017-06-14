## AcuCafe 
### This is just the client app, the full app now exists at https://github.com/hurdissej/AcuCafe

A *very* small cafe with an online ordering interface

Just clone the repository and open Index.html

## Design Choices

I kept this simple and used Angular JS 1.6 as the javascript framework 

When making the application I included a route-provider (ng-route) as I originally planned to tab between pages, but then simplified the UI a bit and decided to keep it in incase I wanted to add "pages" in the future.

I kept it quite light on CSS and decided to use bootstraps responsive design and modals rather than make my own

## What didn't I get round to doing

The main thing I didn't get to was *automated tests* - I will get to these soon but as I haven't used protractor before I may need a few days to get these going

**Functionality**:
The ability to Cancel an order from the "My orders" box would be nice

**Technical**:
I also ran into some cross origin probelms so I used an out the box service to add the cors headers in - If I had some time I would have done this myself
I am using stored minified files for dev purposes but shouldn't in production

**UI**:
The alerts are standard browser ones and I would like to make some nice shiny ones



