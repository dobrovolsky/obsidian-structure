import {App, Modal, TextComponent, TFile} from 'obsidian'
import {NoteRenamer} from '../helpers/noteRenamer'
import {NoteCreator} from "../helpers/noteCreator";
import {join} from "path";
import {NoteOpener} from "../helpers/noteOpener";

export class NoteCreateModal extends Modal {
    private inputField: TextComponent

    constructor(
        app: App,
        private noteCreator: NoteCreator,
        private noteOpener: NoteOpener,
        private file?: TFile,
    ) {
        super(app)
        this.open()
    }

    onOpen() {
        let {contentEl} = this
        this.titleEl.setText(`Create note:`)
        this.inputField = new TextComponent(contentEl)

        if (this.file) {
            this.inputField.setValue(
                this.file.basename
            )
        }

        this.inputField.inputEl.addEventListener('keypress', async (keypressed) => {
            const noteName = this.inputField.getValue()

            if (keypressed.key === 'Enter') {
                let parentFilePath = noteName + '.md'
                if (this.file) {
                    parentFilePath = join(
                        this.file.parent.path,
                        parentFilePath
                    )
                }
                await this.noteOpener.openNote(await this.noteCreator.createWithTemplate(parentFilePath, noteName))
                this.close()
            }
        })

        this.inputField.inputEl.className = 'prompt-input'
        this.modalEl.className = 'prompt'

        this.inputField.inputEl.focus()
    }

    onClose() {
        let {contentEl} = this
        contentEl.empty()
    }
}
