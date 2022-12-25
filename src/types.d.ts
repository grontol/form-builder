interface MenuOption {
    text: string,
    value?: string,
    shortcut?: string,
    children?: MenuOption[] | null
}