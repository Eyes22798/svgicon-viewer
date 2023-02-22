export type IconMeta = Array<string>

declare global {
    interface Window {
      icons: IconMeta
    }
}

if (process.env.NODE_ENV === 'development') window.icons = []
const meta: IconMeta = window.icons || []

export default meta
