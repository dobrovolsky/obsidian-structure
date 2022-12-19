import { App, MarkdownView, SplitDirection, TFile, WorkspaceLeaf } from 'obsidian'
import { Settings } from '../settings/types'

export class NoteOpener {
    constructor(private app: App, private settings: Settings) {}

    openNote = async (file: TFile) => {
        const leaf = this.app.workspace.getLeaf(this.settings.openInSplit)
        await leaf.openFile(file)
    }
}
