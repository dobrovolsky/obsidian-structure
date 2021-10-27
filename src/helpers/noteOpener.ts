import {App, TFile} from "obsidian";
import {Settings} from "../settings/types";

export class NoteOpener{
    constructor(private app: App, private settings: Settings) {}
    private openNoteInSplit = (file: TFile) => {
        const leaf = this.app.workspace.createLeafBySplit(this.app.workspace.activeLeaf)
        leaf.openFile(file).then(
            () => this.app.workspace.setActiveLeaf(leaf)
        )
    }

    openNote = (file: TFile) => {
        if (this.settings.openInSplit) {
            this.openNoteInSplit(file)
        } else {
            this.app.workspace.activeLeaf.openFile(file).then()
        }
    }
}