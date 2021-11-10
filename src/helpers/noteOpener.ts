import {App, TFile} from 'obsidian'
import {Settings} from '../settings/types'

export class NoteOpener {
    constructor(private app: App, private settings: Settings) {
    }

    private openNoteInSplit = async (file: TFile) => {
        const leaf = this.app.workspace.createLeafBySplit(
            this.app.workspace.activeLeaf
        )
        await leaf.openFile(file)
        this.app.workspace.setActiveLeaf(leaf)
    }

    openNote = async (file: TFile) => {
        if (this.settings.openInSplit) {
            await this.openNoteInSplit(file)
        } else {
            await this.app.workspace.activeLeaf.openFile(file)
        }
    }
}
