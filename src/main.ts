import {App, Plugin, PluginManifest } from 'obsidian';
import {SettingTab} from "./settingsTab";
import {NoteFinderModal} from "./noteFinderModal";
import {NoteRenameModal} from "./noteRenameModal";
import {NoteRenamer} from "./noteRenamer";

interface MyPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'default'
}

export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;
    noteRenamer: NoteRenamer

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        this.noteRenamer = new NoteRenamer(app);

    }

    async onload() {
        console.log('loading plugin');
        await this.loadSettings();
        this.initDevTools();

        this.addSettingTab(new SettingTab(this.app, this));

        this.addCommand({
            id: 'renameNote',
            name: 'Rename current note',
            callback: () => { // @ts-ignore - for this.app.plugins
                const file = this.app.workspace.getActiveFile()
                if (file != null) {
                    new NoteRenameModal(this, file)
                }
            },
        });
        this.addCommand({
            id: 'getChildrenNotes',
            name: 'Get children notes',
            callback: () => {
                const file = this.app.workspace.getActiveFile()
                if (file != null) {
                    const children = this.noteRenamer.findChildren(file)
                    console.log(children)
                    new NoteFinderModal(this.app, children).open();
                }
            }
        });
        this.addCommand({
            id: 'getParentNotes',
            name: 'Get parents notes',
            callback: () => {
                const file = this.app.workspace.getActiveFile()
                if (file != null) {
                    const parents = this.noteRenamer.findParents(file)
                    new NoteFinderModal(this.app, parents).open();
                }
            }
        });
        this.addCommand({
            id: 'openParentNotes',
            name: 'open parent note',
            callback: () => {
                const file = this.app.workspace.getActiveFile()
                if (file != null) {
                    const parentNoteName = this.noteRenamer.getParentName(file)

                    console.log(parentNoteName)
                    if (parentNoteName != '') {
                        const parents = this.noteRenamer.findParents(file)
                        this.app.workspace.activeLeaf.openFile(parents.find((f) => f.basename == parentNoteName)).then()
                    }
                }
            }
        });


    }

    onunload() {
        console.log('unloading plugin');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    initDevTools() {
        this.addCommand({
            id: 'reloadPlugin',
            name: 'Reload Plugin (dev)',
            callback: async () => { // @ts-ignore - for this.app.plugins
                const id: string = this.manifest.id, plugins = this.app.plugins;
                plugins.disablePlugin(id).then(() => plugins.enablePlugin(id));
            },
        });
    }
}