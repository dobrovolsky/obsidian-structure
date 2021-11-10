import { App, SuggestModal, TFile } from 'obsidian'
import { NoteCreator } from '../helpers/noteCreator'
import { NoteOpener } from '../helpers/noteOpener'
import { NoteFinder } from '../helpers/noteFinder'

export class NoteCreateModal extends SuggestModal<string> {
    emptyText = 'Empty text (replace with nothing)'
    private notes: string[]

    constructor(
        app: App,
        private noteCreator: NoteCreator,
        private noteOpener: NoteOpener,
        private noteFinder: NoteFinder,
        private file?: TFile
    ) {
        super(app)
        this.notes = this.noteFinder.findNotes().map((f) => f.basename)
        if (file) {
            this.inputEl.value = file.basename
        }

        this.open()
    }

    getSuggestions(query: string): string[] {
        let items = [query]
        items.push(
            ...this.notes.filter((i) =>
                i.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            )
        )
        return items
    }

    selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent) {
        if (!this.notes.find((n) => n == value)) {
            super.selectSuggestion(value, evt)
            return
        }

        this.inputEl.value = value
    }

    renderSuggestion(value: string, el: HTMLElement): void {
        el.innerText = value
    }

    async onChooseSuggestion(
        item: string,
        _: MouseEvent | KeyboardEvent
    ): Promise<void> {
        let file
        if (this.file) {
            file = await this.noteCreator.createParentNote(this.file, item)
        } else {
            file = await this.noteCreator.createWithTemplate(item + '.md', item)
        }
        await this.noteOpener.openNote(file)
    }
}
