# Etude
--------

Flash card generator with superpowers

I made this app while studying for the GMAT to help me generate physical flash cards of my own with complex math latex as well.

## Features
- Create flash cards with markdown and LaTeX
- Edit cards in place
- Organize cards into decks and tags across decks
- 
- Run sessions on the site
- Print flash cards onto actual index cards

## Roadmap

### Release 0.1
- [x] Adds layout with sidebar and list of cards seondary sidebar
- [x] Ability to add flash cards
- [x] Ability to select flash cards from a list and edit them
- [x] Save cards to a local storage

### Release 0.2 Math-Mark
- [x] Initialize app with blank data
- [x] Handle changing tags in the middle of text and maintaining cursor position
- [x] Handles extra whitespace from being added
- [x] Can write katex into markdown to convert to html
- [x] Blank cards should be clickable anywhere to start typing
- [ ] Text resizes as more lines are added
- [ ] Refactor layout for grid and handle smaller screens (hiding sidebars)
- [ ] Cards belong to decks and can be selected from the sidebar
- [ ] Tagging flash cards
- [ ] Selecting tags from the sidebar shows cards for that tag
- [ ] Handle tags with more than one character
- [ ] Handle new lines and block-level tags (lists, math block)

### Release 0.3 Runner-Five
- [ ] 'Runner' to test over a deck or tag of cards
- [ ] Runner can run through cards shuffled or in order
- [ ] Runner keeps track of time per card and over all
- [ ] Flipping cards over allows users to mark if they knew the answer or not
- [ ] Can view analytics on each run and runs of the same deck/tag over time
- [ ] Ability to use keyboard keys to traverse mathml annotations and edit expressions while rendered
