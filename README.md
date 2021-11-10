# Obsidian Structured Plugin

Plugin allows you to build hierarchy in notes using `.`
(like in [dendron](https://wiki.dendron.so/))

Example: `aws`, `aws.ec2`, `aws.ec2.security-groups`

**Notice** plugin is in early alpha.

## Features

-   Correct note renames
-   Navigate via notes
    -   Get list of parent notes
    -   Get list of child notes
    -   Open parent note
-   Create a note
    -   Create in root directory or in last active file's path

## Tips

Add keybinding for plugin actions.

To find all available commands `ctrl+p` / `cmd+p` and type `structured`

## TODOs

-   [x] Creating a new note command
-   [ ] Add default folder for new files
-   [ ] Alert user when trying to rename or create note where parent note is not created
    -   [ ] Configure this option in settings
