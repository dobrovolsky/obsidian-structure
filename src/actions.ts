import { App, normalizePath, Notice, TFile } from 'obsidian'
import { NoteFinder } from './helpers/noteFinder'
import { NoteRenameModal } from './modals/noteRenameModal'
import { NoteFinderModal } from './modals/noteFinderModal'
import { NoteRenamer } from './helpers/noteRenamer'
import { NoteOpener } from './helpers/noteOpener'
import { Settings } from './settings/types'
import * as path from 'path'
import { NoteCreator } from './helpers/noteCreator'
import { NoteCreateModal } from './modals/noteCreateModal'

export class Actions {
    constructor(
        private app: App,
        private settings: Settings,
        private finder: NoteFinder,
        private noteRenamer: NoteRenamer,
        private noteOpener: NoteOpener,
        private noteCreator: NoteCreator
    ) {}

    onCreate = () => {
        const file = this.app.workspace.getActiveFile()
        new NoteCreateModal(
            this.app,
            this.noteCreator,
            this.noteOpener,
            this.finder,
            file
        )
    }

    onRename = () => {
        const file = this.app.workspace.getActiveFile()
        if (file !== null) {
            new NoteRenameModal(this.app, file, this.noteRenamer)
        }
    }

    onGetChild = () => {
        const file = this.app.workspace.getActiveFile()
        if (file !== null) {
            const children = this.finder.findChildren(file)
            new NoteFinderModal(this.app, this.noteOpener, children).open()
        }
    }

    onGetParent = () => {
        const file = this.app.workspace.getActiveFile()
        if (file !== null) {
            const parents = this.finder.findParents(file)
            new NoteFinderModal(this.app, this.noteOpener, parents).open()
        }
    }

    onOpenParent = async () => {
        const file = this.app.workspace.getActiveFile()
        if (file !== null) {
            const parentNoteName = this.finder.getParentName(file)

            if (parentNoteName !== null) {
                const parents = this.finder.findParents(file)
                const parentFile = parents.find(
                    (f) => f.basename == parentNoteName
                )
                if (parentFile) {
                    await this.noteOpener.openNote(parentFile)
                } else {
                    const newNote = await this.noteCreator.createParentNote(
                        file,
                        parentNoteName
                    )
                    if (newNote){
                        await this.noteOpener.openNote(newNote)
                    }

                }
            } else {
                new Notice('Root node')
            }
        }
    }
}
