import { App, normalizePath, Notice, TFile } from 'obsidian'
import { Settings } from '../settings/types'
import { join } from 'path'

export class NoteOpener {
    constructor(private app: App, private settings: Settings) {}

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
    createParentNote = async (currentFile: TFile, parentNoteName: string) => {
        if (this.settings.createParent) {
            new Notice('Parent does not exists. Create new one')

            const parentFilePath = join(
                currentFile.parent.path,
                parentNoteName + '.md'
            )
            const newFile = this.app.vault.getAbstractFileByPath(
                normalizePath(this.settings.templatePath)
            )

            let content
            if (this.settings.templatePath) {
                if (newFile && newFile instanceof TFile) {
                    content = await this.app.vault.read(newFile)
                    content = content.replace(
                        new RegExp('{{NoteName}}', 'g'),
                        parentNoteName
                    )
                } else {
                    content = ''
                }
            }
            await this.openNote(
                await this.app.vault.create(parentFilePath, content)
            )
        } else {
            new Notice('Parent does not exists.')
        }
    }
}
