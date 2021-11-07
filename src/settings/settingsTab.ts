import { App, PluginSettingTab, Setting } from 'obsidian'
import StructurePlugin from '../main'

export class SettingTab extends PluginSettingTab {
    plugin: StructurePlugin

    constructor(app: App, plugin: StructurePlugin) {
        super(app, plugin)
        this.plugin = plugin
    }

    display(): void {
        let { containerEl } = this

        containerEl.empty()

        containerEl.createEl('h2', { text: 'Structured plugin settings' })

        new Setting(containerEl)
            .setName('Open notes in split view')
            .setDesc('If disabled: open in current tab')
            .addToggle((v) =>
                v
                    .setValue(this.plugin.settings.openInSplit)
                    .onChange(async (value) => {
                        this.plugin.settings.openInSplit = value
                        await this.plugin.saveSettings()
                    })
            )

        new Setting(containerEl)
            .setName('Create parent')
            .setDesc('Create parent if not exists')
            .addToggle((v) =>
                v
                    .setValue(this.plugin.settings.createParent)
                    .onChange(async (value) => {
                        this.plugin.settings.createParent = value
                        await this.plugin.saveSettings()
                    })
            )

        new Setting(containerEl)
            .setName('Path to template')
            .setDesc(
                'Template for new note (navigating to parent). Available variables: {{NoteName}}'
            )
            .addText((v) =>
                v
                    .setValue(this.plugin.settings.templatePath)
                    .onChange(async (value) => {
                        this.plugin.settings.templatePath = value
                        await this.plugin.saveSettings()
                    })
            )
    }
}
