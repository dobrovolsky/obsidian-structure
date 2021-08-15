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

    private static getFullPathWithoutExtension(path: string): string {
        const ext = path.split(".")[-1] + 1
        return path.slice(0, path.length - ext.length)
    }

    findParents(file: TFile): TFile[] {
        const allNotes = this.findNotes()
        return allNotes.filter((n) => {
            return NoteRenamer.getFullPathWithoutExtension(file.path).includes(NoteRenamer.getFullPathWithoutExtension(n.path)) &&
                n.parent == file.parent &&
                n != file
        })
    }

    findNotes(): TFile[] {
        return this.app.vault.getFiles().filter((f) => f.extension == 'md');
    }

    getParentName(file: TFile): string | null {
        const noteNamePath = file.basename.split('.')
        if (noteNamePath.length > 1) {
            noteNamePath.pop()
            return noteNamePath.join('.')
        }

        return null
    }
}
