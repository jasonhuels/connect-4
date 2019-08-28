# _CONNECT 4  _

#### _Connect 4 Game, 28-Aug-2019_

#### By _**Jason Huels and Christine Frank**_

## Description

_Connect 4 Game based off of Milton Bradley board game_

## Specifications

| Behavior | Input | Output|
|:------|:---------:|:------:|
|The program initializes the AI when the  player selects 1 player mode | 1 Player | AI enabled |
|The program initializes pass-and-play when the  player selects 2 player mode | 2 Player | Pass-and-play enabled |
|The program displays a 6x7 board when the player initializes a game|Init game click| Empty board appears|
|The program performs a coin flip to determine first player |Init game click| Display Player "X" goes first and sets that player to active player|
|The program will set player piece to lowest row within active player's chosen column when no pieces are already in the column | Col 1 | Piece placed in Col1, Row1 |
|The program will set player piece to next available row within active player's chosen column if pieces are already in the column | Col 1 (piece exists in row1)| Piece placed in Col1, Row2 |
|The program will display a message to the user to select another column when all rows are filled in that column (column is disabled)| Col 1 (col1 filled)| "Please choose another column" |
|The program will toggle active players after a player has successfully placed their piece| Player 2 chooses Col2 | "P2 piece is placed, P1 is activated and P2 is deactivated"|
|The program identifies game winner when a player places a 4th piece that connects 4 of their pieces vertically, horizontally or diagonally| Player 2 chooses Col2 (3 P2 pieces exist in column)| "Player 2 is Winner!"|
|The program identifies a draw condition when a player places a piece and all columns are filled with no 4 pieces connecting for either player| Player 2 chooses Col2 (all other columns filled)| "Stalemate!"|
|The program reinitializes the game when a player presses the Reset button| *Reset clicked*| Displays 1 player or 2 player modes|
|The program adds a point to player score after a win condition for that player and maintains other player score | Player 1 wins first game | Displays score = 1 for Player 1 and score = 0 for Player 2|
|The program adds no points to either player score after a draw condition | Stalemate reached | Displayed scores do not change|
|The program allows rematch game after win or draw condition and maintains player scores | *Rematch clicked* | Displays score = 1 for Player 1 and score = 0 for Player 2, *empty board appears*|
|The program resets player scores when a player mode is selected | 2 Player mode selected | Displays score = 0 for Player 1 and score = 0 for Player 2, *empty board appears*|

** AI Specs Below

## Setup/Installation Requirements

* _This is a great place_
* _to list setup instructions_
* _in a simple_
* _easy-to-understand_
* _format_

_{Leave nothing to chance! You want it to be easy for potential users, employers and collaborators to run your app. Do I need to run a server? How should I set up my databases? Is there other code this app depends on?}_

## Known Bugs

_{Are there issues that have not yet been resolved that you want to let users know you know?  Outline any issues that would impact use of your application.  Share any workarounds that are in place. }_

## Support and contact details

_{Let people know what to do if they run into any issues or have questions, ideas or concerns.  Encourage them to contact you or make a contribution to the code.}_

## Technologies Used

_{Tell me about the languages and tools you used to create this app. Assume that I know you probably used HTML and CSS. If you did something really cool using only HTML, point that out.}_

### License

*{Determine the license under which this application can be used.  See below for more details on licensing.}*

Copyright (c) 2016 **_{List of contributors or company name}_**
