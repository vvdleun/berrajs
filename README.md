Berra.js

I developed my first, rather crude/primitive, text adventures in BASIC, when I was about 8 or 9 years old. I called the fictional "company" that "released" those gems: _Berra_ (I guess I would be sued by the current owners of a certain company, that was famous in the '80s/'90s, if I would explain its origins...).

Now, "some" years later, I'd like to try my hand at an adventure/interactive fiction game again.

I looked for an existing engine that would statify my needs,
but I could not find any web-based engine that met my requirements, so I decided to code my own. Yes, _another custom interactive fiction engine that nobody asked for!_

It is powered by Next.js (and therefore, React), although the engine itself is written in vanilla JS, without any external dependencies (except that it requires modern ECMAScript features to run). A React app is built on top of it, that basically handles input and output events.

Just for my own amusement, I'll call the engine `Berra.js`.

Note that I'm not writing a custom language at this time. A game that runs on this engine will have to be fully written in Javascript and extend some classes provided by the engine. It is heavily object orientated. A proper rewrite to Typescript would probably be a wise move on the longer term.

It is very early days for this project. There is nothing to see for end-users, as nothing is finished, finalized, or works as intended. For now I consider it an "experiment": nothing is set in stone and every design choice could change. 
(_Assuming I don't lose interest_).

Some design goals for the longer term:
* Provide a simple no-typing interface, to nagivate and interact with the gaming world
* Games should be playable with mouse/keyboard on desktop machines and touch on mobile phones/tablets.
* I even hope to introduce support for gamepads/joysticks later on, since I've based the design on classic visual novels, that were used on some Japanese gaming consoles (Both Snatcher for SEGA-CD, but also the more obscure "Phantasy Star Adventures" title for the SEGA Game Gear, come to mind, although I have never played those games myself, I saw footage of English versions and those inspired me a lot).
* Good, responsive design, for many device types (definitely not the case at the moment)
* The engine will be less suitable for "choice" games. It'll be more suited for classic text adventure style games, that feature puzzles and inventory management. I envision to write "pulp" sci-fi games myself, so interactive fiction fans that expect deep and emotional story-telling experiences, should probably look elsewhere.  

If the day will ever come that this engine will be able to play a "real" game, I'll provide proper documentation on how to get it running and some words on its design.

-- Vincent van der Leun (https://vincentvanderleun.nl)