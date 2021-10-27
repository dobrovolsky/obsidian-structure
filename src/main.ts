import {App, Plugin, PluginManifest} from 'obsidian';
import {NoteRenamer} from "./helpers/noteRenamer";
import {NoteFinder} from "./helpers/noteFinder";
import {Actions} from "./actions";
import {Settings} from "./settings/types";
import {SettingTab} from "./settings/settingsTab";
import {DEFAULT_SETTINGS} from "./settings/defaults";
import {NoteOpener} from "./helpers/noteOpener";


export default class StructurePlugin extends Plugin {
    settings: Settings;
    noteRenamer: NoteRenamer
    finder: NoteFinder;

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);

        this.finder = new NoteFinder(app)
        this.noteRenamer = new NoteRenamer(app, this.finder);
    }

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new SettingTab(this.app, this));
        this.addCommands();
    }

    onunload() {
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.addCommands();
    }

    addCommands = () => {
        const noteOpener = new NoteOpener(this.app, this.settings)
        const actions = new Actions(this.app, this.settings, this.finder, this.noteRenamer, noteOpener);

        this.addCommand({
            id: 'renameNote',
            name: 'Rename current note',
            callback: actions.onRename,
        });
        this.addCommand({
            id: 'getChildrenNotes',
            name: 'Get children notes',
            callback: actions.onGetChild
        });
        this.addCommand({
            id: 'getParentNotes',
            name: 'Get parents notes',
            callback: actions.onGetParent
        });
        this.addCommand({
            id: 'openParentNotes',
            name: 'open parent note',
            callback: actions.onOpenParent
        });

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