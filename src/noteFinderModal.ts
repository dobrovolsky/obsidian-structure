import {App, FuzzySuggestModal, TFile} from "obsidian";

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
        this.app.workspace.activeLeaf.openFile(this.items.find((f) => f.basename == item)).then()
    }

    onClose() {
        super.onClose();

    }
}

