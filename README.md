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

## How to organize your workspace

You may store all your notes in one folder or create some filesystem hierarchy with folders.

But flow will be the same.

**Create a new note**

Run the` Structured Plugin: Create a note` command.

Note which will place in the same folder as the current note. (if there is no note open, create in root)

**Navigate notes**

1. Open open note
2. You may use
   - `Structured Plugin: Open parent note` - opens parent note.

     Example: `aws.ec2.security-groups` is opened, after running command `aws.ec2` will be opened

   - `Structured Plugin: Get parent notes`

     Example: `aws.ec2.security-groups` is opened, after running command list with `aws.ec2`, `aws` will be displayed

   - `Structured Plugin: Get children notes`

     Example: `aws` is opened, after running command list with `aws.ec2.security-groups`, `aws.ec2.security-groups` will be displayed

**Rename a note**

1. Open some note
2. Run `Structured Plugin: Rename current note`
  
   The note won't move to any new dir.

## Tips

Add keybinding for plugin actions.

To find all available commands `ctrl+p` / `cmd+p` and type `structured`

## TODOs

-   [x] Creating a new note command
-   [ ] Add default folder for new files
-   [ ] Alert user when trying to rename or create note where parent note is not created
    -   [ ] Configure this option in settings
-   [ ] Create a child note near parent note, not current open.
