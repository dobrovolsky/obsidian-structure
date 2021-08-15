import {Modal, TextComponent, TFile} from "obsidian";
import MyPlugin from "./main";

export class NoteRenameModal extends Modal {
    private inputField: TextComponent

    constructor(private plugin: MyPlugin, private file: TFile) {
        super(plugin.app);
        this.open()
    }

    private rename() {
        const file = this.app.workspace.getActiveFile()
        this.plugin.noteRenamer.renameNote(file, this.inputField.getValue()).then(() => {
            this.close()
        })
    }

    onOpen() {
        let {contentEl} = this;
        this.titleEl.setText(`Rename note: "${this.file.basename}"`)
        this.inputField = new TextComponent(contentEl)
            .setValue(this.file.basename)

        this.inputField.inputEl.addEventListener('keypress', (keypressed) => {
            if (keypressed.key === 'Enter') {
                this.rename()
            }
        });

        this.inputField.inputEl.className = 'prompt-input'
        this.modalEl.className = 'prompt'

        this.inputField.inputEl.focus();
    }

    onClose() {
        let {contentEl} = this;
        contentEl.empty();
    }
}
