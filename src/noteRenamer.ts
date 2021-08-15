import {App, TFile} from "obsidian";

export class NoteRenamer {
    constructor(private app: App) {
    }

    async renameNote(file: TFile, newName: string) {
        const newBasePath = file.basename.replace(file.basename, newName)
        const children = this.findChildren(file)

        const newNotesNames = children.map(f => {
            return {file: f, newPath: f.path.replace(file.basename, newBasePath)}
        })

        console.log(newNotesNames)
        for (const f of newNotesNames) {
            await this.app.fileManager.renameFile(f.file, f.newPath)
        }
        await this.app.fileManager.renameFile(file, file.path.replace(file.basename, newBasePath))
    }

    findChildren(file: TFile): TFile[] {
        const allNotes = this.findNotes()
        return allNotes.filter((n) => {
            return n.path.includes(file.path.slice(0, file.path.length - 3)) &&
                n.parent == file.parent &&
                n != file
        })
    }

    findParents(file: TFile): TFile[] {
        const allNotes = this.findNotes()
        return allNotes.filter((n) => {
            return file.basename.includes(n.basename) &&
                n.parent == file.parent &&
                n != file
        })
    }

    findNotes(): TFile[] {
        return this.app.vault.getFiles().filter((f) => f.extension == 'md');
    }

    getParentName(file: TFile): string {
        const noteNamePath = file.basename.split('.')
        noteNamePath.pop()
        return noteNamePath.join('.')
    }
}
