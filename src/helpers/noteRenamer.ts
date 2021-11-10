import { App, TFile } from 'obsidian'
import { NoteFinder } from './noteFinder'

export class NoteRenamer {
    constructor(private app: App, private finder: NoteFinder) {}

    async renameNote(file: TFile, newName: string) {
        const newBasePath = file.basename.replace(file.basename, newName)
        const children = this.finder.findChildren(file)

        const newNotesNames = children.map((f) => {
            return {
                file: f,
                newPath: f.path.replace(file.basename, newBasePath),
            }
        })

        for (const f of newNotesNames) {
            await this.app.fileManager.renameFile(f.file, f.newPath)
        }
        await this.app.fileManager.renameFile(
            file,
            file.path.replace(file.basename, newBasePath)
        )
    }
}
