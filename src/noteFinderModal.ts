import {App, FuzzySuggestModal, TFile} from "obsidian";
import {openNoteInSplit} from "./utils";

export class NoteFinderModal extends FuzzySuggestModal<string> {
    public constructor(app: App, private items: TFile[]) {
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
        console.log(item)
        openNoteInSplit(this.app, this.items.find((f) => f.basename == item))
    }

    onClose() {
        super.onClose();

    }
}

