import { App, normalizePath, Notice, TFile } from 'obsidian'
import { Settings } from '../settings/types'

export class NoteCreator {
    constructor(private app: App, private settings: Settings) {}

    createWithTemplate = async (
        filePath: string,
        noteName: string
    ): Promise<TFile> => {
        const newFile = this.app.vault.getAbstractFileByPath(
            normalizePath(this.settings.templatePath)
        )

        let content = ''
        if (this.settings.templatePath) {
            if (newFile && newFile instanceof TFile) {
                content = await this.app.vault.cachedRead(newFile)
                content = content.replace(
                    new RegExp('{{NoteName}}', 'g'),
                    noteName
                )
            } else {
                content = ''
            }
        }

        let filePathNormalized = normalizePath(filePath)
        return this.app.vault.create(filePathNormalized, content)
    }

    createParentNote = async (
        currentFile: TFile,
        parentNoteName: string
    ): Promise<TFile | null> => {
        if (this.settings.createParent) {
            new Notice('Parent does not exists. Create new one')
            const parentFilePath = normalizePath(
                currentFile.parent.path + '/' + parentNoteName + '.md'
            )
            return this.createWithTemplate(parentFilePath, parentNoteName)
        } else {
            new Notice('Parent does not exists.')
            return null
        }
    }
}
