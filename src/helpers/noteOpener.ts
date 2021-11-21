import { App, MarkdownView, TFile } from 'obsidian'
import { Settings } from '../settings/types'

export class NoteOpener {
    constructor(private app: App, private settings: Settings) {}

    private openNoteInSplit = async (file: TFile) => {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView)

        const leaf = this.app.workspace.createLeafBySplit(view.leaf)
        await leaf.openFile(file)
        this.app.workspace.setActiveLeaf(leaf)
    }

    openNote = async (file: TFile) => {
        if (this.settings.openInSplit) {
            await this.openNoteInSplit(file)
        } else {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView)
            await view.leaf.openFile(file)
        }
    }
}
