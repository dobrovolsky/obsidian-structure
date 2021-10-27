import {App, FuzzySuggestModal, TFile} from "obsidian";
import {NoteOpener} from "../helpers/noteOpener";

export class NoteFinderModal extends FuzzySuggestModal<string> {
    public constructor(app: App, private noteOpener: NoteOpener, private items: TFile[]) {
        super(app);
        this.open();
    }

    getItemText(item: string): string {
        return item
    }

    getItems(): string[] {
        return this.items.map((f) => f.basename);
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
        this.noteOpener.openNote(this.items.find((f) => f.basename == item))
    }

    onClose() {
        super.onClose();
    }
}

