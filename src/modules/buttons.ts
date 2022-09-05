import { readdirSync } from "fs"
import { ExtendedClient } from "../structures/Client"
import { ButtonType } from "../typings/Buttons"

export default async (client: ExtendedClient) => {
    const pathFiles = `${__dirname}/../interaction/buttons`
    const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")

    async function loader(path: string) {
        readdirSync(path).forEach(async (file: string) => {
            if (!filter(`${path}/${file}`) && (await client.isDir(`${path}/${file}`))) return loader(`${path}/${file}`)
            const buttons: ButtonType = await client.importFile(`${path}/${file}`)
            client.buttons.set(buttons.id, buttons)
        })
    }

    loader(pathFiles)
}
