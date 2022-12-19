import { App, TFile } from 'obsidian'

const getFullPathWithoutExtension = (path: string): string => {
    const extention = path.split('.').pop()
    if (!extention){
        return ""
    }

    const extLength = extention.length + 1
    return path.slice(0, path.length - extLength)
}

export class NoteFinder {
    constructor(private app: App) {}

    findChildren(file: TFile): TFile[] {
        const allNotes = this.findNotes()
        return allNotes.filter((n) => {
            return (
                n.path.includes(file.path.slice(0, file.path.length - 3)) &&
                n.parent == file.parent &&
                n != file
            )
        })
    }

    findParents(file: TFile): TFile[] {
        const allNotes = this.findNotes()
        return allNotes.filter((n) => {
            return (
                getFullPathWithoutExtension(file.path).startsWith(
                    getFullPathWithoutExtension(n.path)
                ) &&
                n.parent == file.parent &&
                n != file
            )
        })
    }

    findNotes(): TFile[] {
        return this.app.vault.getMarkdownFiles()
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
