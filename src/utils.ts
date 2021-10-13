import {App, TFile} from "obsidian";

export const openNoteInSplit = (app: App, file: TFile) => {
    const leaf = app.workspace.createLeafBySplit(app.workspace.activeLeaf)
    leaf.openFile(file).then(
        () => app.workspace.setActiveLeaf(leaf)
    )
}